import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Empty, message, Avatar, Spin, BackTop, Icon, Divider, Tag } from 'antd';
import { Tabs, PullToRefresh, ListView, ActivityIndicator } from 'antd-mobile';
import config from '../../../public/config'
import Loadable from '../../components/loadable'
import { transformParas, browserRedirect, get_local_cache, get_session_cache, getSign, remove_session_cache } from '../../../public/common'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroller';
// import TcCommunityDetailPage from '../community/TcCommunityDetailPage';
// import TcModalImageRIG from '../../components/TcModalImageRIG'

const TcCommunityDetailPage = Loadable(() => import('../community/TcCommunityDetailPage'));
const TcModalImageRIG = Loadable(() => import('../../components/TcModalImageRIG'));

// import Zmage from 'react-zmage';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

let _pageSize = 5;
let _pageSizeImg = 20;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class TcUserInfo extends React.Component {
  constructor(props, context) {
    super(props);

    const dataSourcecommentList = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const dataSourcehotList = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const dataSourcefollowList = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const dataSourcevideoList = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      isFetching: false,
      isCurrentUser: false,
      currTab: 'users',
      commentList: [],
      userTagsList: [],
      loading: false,
      hasMore: false,
      _height: document.documentElement.clientHeight * 5 / 6,
      userInfo: {
        'avatar': {},
        'extra': {
          'followers_count': 0,
          'followings_count': 0,
        }
      },
      imgListIndx: 0,
      imgList: [],
      imgloading: false,
      imghasMore: false,
      videoList: [],
      videoloading: false,
      videohasMore: false,

      commentList: [],
      dataSourcecommentList: dataSourcecommentList,
      loading: false,
      hasMore: true,
      refreshing: false,
      isLoading: false,
      useBodyScroll: false,

      hotList: [],
      dataSourcehotList: dataSourcehotList,
      hotloading: false,
      hothasMore: true,
      hotrefreshing: false,
      hotisLoading: false,
      hotuseBodyScroll: false,

      followList: [],
      dataSourcefollowList: dataSourcefollowList,
      followloading: false,
      followhasMore: true,
      followrefreshing: false,
      followisLoading: false,
      followuseBodyScroll: false,

      videoList: [],
      dataSourcevideoList: dataSourcevideoList,
      videoloading: false,
      videohasMore: true,
      videorefreshing: false,
      videoisLoading: false,
      videouseBodyScroll: false,

      _isSwipeable: true, // 阻止 tabs 与 Carousel 滑动冲突

    }

    this.initFun = this.initFun.bind(this)
    this.onClickCommunityTab = this.onClickCommunityTab.bind(this)
    this.tcCommunityGetFeeds = this.tcCommunityGetFeeds.bind(this)
    this.tcCommunityGetFeedsRef = this.tcCommunityGetFeedsRef.bind(this)
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
    this.onGetUserInfo = this.onGetUserInfo.bind(this)  // 获取用户
    this.onGetUserInfoTags = this.onGetUserInfoTags.bind(this)  // 获取一个用户的标签
    this.tcUserVideoAndImg = this.tcUserVideoAndImg.bind(this)
    this.goToUserFollowPath = this.goToUserFollowPath.bind(this)  //一个用户的关注者
    this.onClickFollow = this.onClickFollow.bind(this)  //关注用户
    this.goToUserTagPath = this.goToUserTagPath.bind(this)
    this.goToUserInfoEditPath = this.goToUserInfoEditPath.bind(this)
    this.deleteFeedProp = this.deleteFeedProp.bind(this)
    this.getUserSex = this.getUserSex.bind(this)
    this.showModalImg = this.showModalImg.bind(this)
    this.swipeableChange = this.swipeableChange.bind(this)
    this.renderContent = this.renderContent.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    // 判断是否当前登录用户
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');


    let _isCurr = false;
    if (!sessionStorage.tc_access_token_token && !_getSeuserInfo) {
      _isCurr = false;
    } else {
      let _userInfo = JSON.parse(_getSeuserInfo);
      _userInfo.id == props.match.params.userid && (_isCurr = true)
      let _tc_c_type = get_local_cache('tc_community_type');
      if (_tc_c_type) {
        (_tc_c_type == 'iosapp' || _tc_c_type == 'androidapp') && (_isCurr = false)
      }
    }
    this.setState({
      isCurrentUser: _isCurr
    }, () => {
      this.onGetUserInfo(props);
      this.onGetUserInfoTags(props);
      this.tcCommunityGetFeeds(this.state.currTab, props)
    })
  }

  tcCommunityGetFeedsRef (_type) {
    let { commentList, currTab, isFetching, imgList, videoList } = this.state;
    if (isFetching) return;
    let _headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (sessionStorage.tc_access_token_token) {
      _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + sessionStorage.tc_access_token_token
      };
    }
    let url = config.tcCommunityGetFeeds;
    let _pr = { // 接口参数
      "limit": _pageSize,
      "type": _type,
    };
    let _loadingType = {};
    switch (_type) {
      case 'users':
        _loadingType = { loading: true };
        _pr.user = this.props.match.params.userid;
        _pr.after = commentList.length > 0 ? commentList[commentList.length - 1].id : '';
        break;
      case 'imgList':
        _loadingType = { imgloading: true };
        url = config.tcCommunityGetFeeds + '/' + _type;
        _pr.limit = _pageSizeImg;
        _pr.user = this.props.match.params.userid;
        _pr.after = imgList.length > 0 ? imgList[imgList.length - 1].id : '';
        break;
      case 'videoList':
        _loadingType = { videoloading: true };
        url = config.tcCommunityGetFeeds + '/' + _type;
        _pr.limit = _pageSizeImg;
        _pr.user = this.props.match.params.userid;
        _pr.after = videoList.length > 0 ? videoList[videoList.length - 1].id : '';
        break;
    }

    url += `?${transformParas(_pr)}`;

    this.setState(_loadingType)

    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        let _updateInfo = {};
        currTab == 'users' && (_updateInfo = { loading: false, hasMore: data.feeds.length >= _pageSize ? true : false, commentList: [...commentList, ...data.feeds] });
        currTab == 'imgList' && (_updateInfo = { imgloading: false, imghasMore: data.length >= _pageSizeImg ? true : false, imgList: [...imgList, ...data] });
        currTab == 'videoList' && (_updateInfo = { videoloading: false, videohasMore: data.length >= _pageSizeImg ? true : false, videoList: [...videoList, ...data] });
        this.setState(_updateInfo)

      }).catch(error => {
        this.setState({
          loading: false,
          imgloading: false,
          videoloading: false,
        }, () => message.error(error.toString()))
      });
  }
  tcCommunityGetFeeds (_type, _props) {
    // let { commentList, currTab } = this.state;
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcCommunityGetFeeds;
    let _pr = { // 接口参数
      "limit": _pageSize,
      "type": _type,
      "r": new Date().getTime()
    };

    _type == 'users' && (_pr.user = _props.match.params.userid)

    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        let _d = [...data.feeds];
        this.setState({
          isFetching: false,
          hasMore: data.feeds.length >= _pageSize ? true : false,
          commentList: _d
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
  }
  tcUserVideoAndImg (_type, _props) {
    let { currTab } = this.state;
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcCommunityGetFeeds + '/' + _type;
    let _pr = { // 接口参数
      "limit": _pageSizeImg,
      "user": _props.match.params.userid,
      "r": new Date().getTime()
    };
    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        let _updateInfo = {}, _ismo = data.length >= _pageSize ? true : false;
        currTab == 'imgList' && (_updateInfo = { isFetching: false, imghasMore: _ismo, imgList: data });
        currTab == 'videoList' && (_updateInfo = { isFetching: false, videohasMore: _ismo, videoList: data });
        this.setState(_updateInfo)

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
  }

  onClickCommunityTab (_type) {
    let { commentList, imgList, videoList } = this.state;
    this.setState({
      currTab: _type,
      // commentList: []
    }, () => {
      (_type == 'users' && commentList.length == 0) && this.tcCommunityGetFeeds(_type, this.props);
      (_type == 'imgList' && imgList.length == 0) && this.tcUserVideoAndImg(_type, this.props);
      (_type == 'videoList' && videoList.length == 0) && this.tcUserVideoAndImg(_type, this.props);

    })
  }

  handleInfiniteOnLoad () {
    let { currTab } = this.state;
    switch (currTab) {
      case 'users':
        this.state.hasMore && this.tcCommunityGetFeedsRef(currTab)
        break;
      case 'imgList':
        this.state.imghasMore && this.tcCommunityGetFeedsRef(currTab)
        break;
      case 'videoList':
        this.state.videohasMore && this.tcCommunityGetFeedsRef(currTab)
        break;
      default:
        message.error('error')
    }
  };

  onGetUserInfo (_props) {
    let { userInfo } = this.state;
    this.setState({
      isFetching: true
    })
    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcRegister}/${_props.match.params.userid}`;
    let _options = {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }
    fetch(url, _options).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        console.log('===onGetUserInfo===', data);
        this.setState({
          isFetching: false,
          userInfo: data
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });
  };

  onGetUserInfoTags (_props) {
    this.setState({
      isFetching: true
    })
    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcRegister}/${_props.match.params.userid}/tags`;
    let _options = {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }
    fetch(url, _options).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        this.setState({
          isFetching: false,
          userTagsList: data
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });
  };

  goToUserFollowPath (_type) {
    this.props.history.push('/userfollow/' + this.props.match.params.userid + '/' + _type)
  }
  goToUserTagPath () {
    this.state.isCurrentUser && this.props.history.push('/usertags')
    // this.props.history.push('/usertags/' + this.props.match.params.userid + '/' + _type)
  }
  goToUserInfoEditPath () {
    this.state.isCurrentUser && this.props.history.push('/useredit')
    // this.props.history.push('/userfollow/' + this.props.match.params.userid + '/' + _type)
  }

  onClickFollow () {
    let { userInfo } = this.state;
    if (!sessionStorage.tc_access_token_token) {
      message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    this.setState({
      isFetching: true
    })
    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcGetUserInfo}/followings/${userInfo.id}`;
    let _options = {
      method: userInfo.follower ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: _headers
    }

    fetch(url, _options).then(response => {
      if ((response.redirected && response.url.indexOf('login') != -1)
        || response.status == 401
      ) {
        if (response.status == 401) {
          remove_session_cache('tc_temporary_user_info');
          remove_session_cache('tc_temporary_buy_car_data');
          remove_session_cache('tc_access_token_token');
        }
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
        setTimeout(() => {
          this.props.history.push('/login')
        }, 2000)

      } else {
        return response.text();  // 先将结果转换为 JSON 对象
      }
    })
      .then(data => {
        let _da = userInfo;
        _da.follower = !userInfo.follower;
        this.setState({
          isFetching: false,
          userInfo: _da,
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });
  };

  deleteFeedProp (_id) {
    let _list = this.state.commentList;
    _list = _list.filter(_item => _item.id != _id)
    this.setState({ commentList: _list })
  }
  getUserSex (_id) {
    let _txt = '';
    switch (_id) {
      case 0:
        _txt = this.props.intl.formatMessage({ id: 'tcSecret' });
        break;
      case 1:
        _txt = this.props.intl.formatMessage({ id: 'tcMale' });
        break;
      case 2:
        _txt = this.props.intl.formatMessage({ id: 'tcFeMale' });
        break;
      default:
        _txt = this.props.intl.formatMessage({ id: 'tcSecret' });
    }
    return _txt;
  }

  showModalImg () {
    console.log('===showModalImg==');
    this.refs.tcModalImageRIGUser.showModal();
    this.refs.tcModalImageRIGUser.carouselGoto(this.state.imgListIndx);
    this.swipeableChange(false)
  }


  //渲染列表数据
  renderContent (tab) {
    let { isFetching, currTab, commentList, dataSourcecommentList, dataSourcehotList, dataSourcefollowList, dataSourcevideoList, indexTab, videoList, hotList, followList, visibleFeedsDrawer, tcDailyTopic, hotAdList, refereeInfoList } = this.state;
    let { InitData, intl } = this.props;
    var _getloginType = get_local_cache('tc_community_type');
    let _isMob = browserRedirect();
    let _da = '';
    let _dateTime = new Date().getTime();
    const _ttrow = (rowData, sectionID, rowID) => {
      if (!rowData) return;
      return (
        <div key={rowID + "r" + _dateTime} className="tc-comm-list-item" >
          <TcCommunityDetailPage
            key={"tc" + rowData.id + "r" + _dateTime}
            itemdata={rowData}
            InitData={InitData}
            history={this.props.history}
            deletefeed={this.deleteFeedProp}
            swipeablechange={this.swipeableChange} />
        </div>
      );
    };

    const _ttrowVideo = (rowData, sectionID, rowID) => {
      if (!rowData) return;
      return (
        <div key={rowID} className="tc-comm-list-item" >
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={
              <iframe
                src={InitData._tcYoutubePath + rowData.video_v}
                width="100%"
                style={{ minHeight: '200px' }}
                frameBorder="0"
                allowFullScreen
              >
              </iframe>
            }
          >
            <Meta title={rowData.title} />
          </Card>
        </div>
      );
    };
    switch (tab.key) {
      case 'new':
        commentList.length ? (_da = (<Row className="tc_uhc_tabs_main" id="tc_user_info_handelDocIDPosts"
          style={{
            height: this.state._height,
          }}  ><ListView
            key={this.state.useBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={dataSourcecommentList}
            renderFooter={() => (<div style={{ textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
            renderRow={_ttrow}
            useBodyScroll={this.state.useBodyScroll}
            style={this.state.useBodyScroll ? {} : {
              height: this.state._height,
            }}
            pullToRefresh={<PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              indicator={this.state.refreshing ? {} : {
                activate: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                deactivate: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                release: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                finish: this.props.intl.formatMessage({ id: 'tcRefresh' }),
              }}
            />}
            onEndReached={this.onEndReached}
            pageSize={_pageSize}
          />
          {/* {_getloginType != 'iosapp' && _getloginType != 'androidapp' && <BackTop target={() => document.getElementById('tc_user_info_handelDocIDPosts')} />} */}
        </Row>)) : _da = (<Row style={{ height: this.state._height, textAlign: "center", backgroundColor: "#fff", padding: "35% 0 0 35%" }}>
          <ActivityIndicator text="Loading..." /></Row>);
        break;
      case 'hot':
        hotList.length ? (_da = (<Row className="tc-community-home-content" id="tc_community_handelDocID_hot"
          style={{ height: this.state._height, }}  >

          <ListView
            key={this.state.hotuseBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={dataSourcehotList}
            renderHeader={() => <Carousel className="binnerList" autoplay swipe={false}>
              {
                hotAdList.map((_item, _idx) => {
                  let _img = _isMob ? _item.img_url : _item.mobileimg_url, _html = '';
                  if (_item.web_url) {
                    _html = <a key={"tc-Carousel-hotspot" + _idx} href={_item.web_url} target="_blank">
                      <img alt={_item.title} className='think-car-home-price-img' src={_img} />
                    </a>;
                  } else {
                    _html = <img key={"tc-Carousel-hotspot" + _idx} alt={_item.title} className='think-car-home-price-img' src={_img} />
                  }
                  return _html;
                })
              }
            </Carousel>}
            renderFooter={() => (<div style={{ textAlign: 'center' }}>
              {this.state.hotisLoading ? 'Loading...' : 'Loaded'}
            </div>)}
            renderRow={_ttrow}
            useBodyScroll={this.state.hotuseBodyScroll}
            style={this.state.hotuseBodyScroll ? {} : {
              height: this.state._height,
            }}
            pullToRefresh={<PullToRefresh
              refreshing={this.state.hotrefreshing}
              onRefresh={this.onRefresh}
              indicator={this.state.refreshing ? {} : {
                activate: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                deactivate: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                release: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                finish: this.props.intl.formatMessage({ id: 'tcRefresh' }),
              }}
            />}
            onEndReached={this.onEndReached}
            pageSize={_pageSize}
          />
          {/*  {_getloginType != 'iosapp' && _getloginType != 'androidapp' && <BackTop target={() => document.getElementById('tc_community_handelDocID_hot')} />} */}
        </Row>)) : _da = (<Row style={{ height: this.state._height, textAlign: "center", backgroundColor: "#fff", padding: "35% 0 0 35%" }}>
          <ActivityIndicator text="Loading..." /></Row>);
        break;

      case 'video':
        videoList.length ? (_da = (<Row className="tc-community-home-content" id="tc_community_handelDocID_video"
          style={{ height: this.state._height, }}  >
          <ListView
            key={this.state.videouseBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={dataSourcevideoList}
            renderFooter={() => (<div style={{ textAlign: 'center' }}>
              {this.state.videoisLoading ? 'Loading...' : 'Loaded'}
            </div>)}
            renderRow={_ttrowVideo}
            useBodyScroll={this.state.videouseBodyScroll}
            style={this.state.videouseBodyScroll ? {} : {
              height: this.state._height,
            }}
            pullToRefresh={<PullToRefresh
              refreshing={this.state.videorefreshing}
              onRefresh={this.onRefresh}
              indicator={this.state.refreshing ? {} : {
                activate: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                deactivate: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                release: this.props.intl.formatMessage({ id: 'tcRefresh' }),
                finish: this.props.intl.formatMessage({ id: 'tcRefresh' }),
              }}
            />}
            onEndReached={this.onEndReached}
            pageSize={_pageSize}
          />
          {/*   {_getloginType != 'iosapp' && _getloginType != 'androidapp' && <BackTop target={() => document.getElementById('tc_community_handelDocID_video')} />} */}
        </Row>)) : _da = (<Row style={{ height: this.state._height, textAlign: "center", backgroundColor: "#fff", padding: "35% 0 0 35%" }}>
          <ActivityIndicator text="Loading..." /></Row>);
        break;
      default:
    }
    return _da;
  }

  // 下拉刷新
  onRefresh () {

    let { currTab } = this.state;
    let _updateInfo = {};
    switch (currTab) {
      case 'new':
        _updateInfo = { refreshing: true, isLoading: true };
        break;
      case 'hot':
        _updateInfo = { hotrefreshing: true, hotisLoading: true };
        break;
      case 'follow':
        _updateInfo = { followrefreshing: true, followisLoading: true };
        break;
      case 'video':
        _updateInfo = { videorefreshing: true, videoisLoading: true };
        break;
      default:
        message.error('error')
    }
    this.setState(_updateInfo, () => {
      this.tcCommunityGetFeeds(currTab);
    });

  };

  // 上拉加载
  onEndReached (event) {
    let { currTab } = this.state;
    switch (currTab) {
      case 'users':
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        this.tcCommunityGetFeedsRef(currTab);
        break;
      case 'imgList':
        console.log(this.state.hothasMore);
        if (this.state.hotisLoading && !this.state.hothasMore) {
          return;
        }
        this.tcCommunityGetFeedsRef(currTab);
        break;
      case 'videoList':
        if (this.state.followisLoading && !this.state.followhasMore) {
          return;
        }
        this.tcCommunityGetFeedsRef(currTab);
        break;
      default:
        message.error('error')
    }

  };
  swipeableChange (_bool) {
    this.setState({ _isSwipeable: _bool })
  }
  render () {
    let { isFetching, currTab, _isSwipeable, commentList, _height, userInfo, userTagsList, isCurrentUser, imgListIndx, imgList, videoList } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    let _avatarUrl = userInfo.avatar ? userInfo.avatar.url : InitData._homeImgPath + '/Home/img/default_avatar.jpg';
    const _userinfoBg = {
      background: `url(${InitData._homeImgPath}/Home/img/user_info_bg.png) no-repeat center`,
      backgroundSize: 'cover'
    }

    // let _imgList = [];
    // if (currTab == 'imgList') {
    //   commentList.map((_item, _idx) => {
    //     _imgList.push({
    //       url: _item.filename,
    //       id: _item.id
    //     });
    //   })
    // }

    let _followers_count = 0, _followings_count = 0;
    _followers_count = userInfo.extra ? userInfo.extra.followers_count : 0;
    _followings_count = userInfo.extra ? userInfo.extra.followings_count : 0;

    let _pageheight = {}
    if (_isMob) {
      _pageheight = { padding: '0 10%', height: document.documentElement.clientHeight - 50 };
    } else {
      _pageheight = { height: document.documentElement.clientHeight - 50 };
      let _tc_c_type = get_local_cache('tc_community_type');
      if (_tc_c_type) {
        (_tc_c_type == 'iosapp' || _tc_c_type == 'androidapp') && (_pageheight.height = document.documentElement.clientHeight)
      }
    }
    return (
      <div className="tc-user-home-page" style={_pageheight}  >
        <Row className="tc-user-home-header">
          {/* 用户信息 */}
          <Row className="tc-user-info-bg" style={_userinfoBg}>
            {
              isCurrentUser && <Row className="tc-user-info-edit" onClick={this.goToUserInfoEditPath} style={{ cursor: 'pointer' }}><Icon type="edit" /></Row>
            }
            <Row>
              <Row className="tc-user-info-row" >
                <Avatar
                  style={{ cursor: 'pointer' }}
                  size="large"
                  onClick={this.goToUserInfoEditPath}
                  src={_avatarUrl}
                  alt={userInfo.name}
                />
              </Row>
              <Row className="tc-user-info-row" style={{ cursor: 'pointer' }} > {userInfo.name} </Row>
              <Row >
                <span onClick={() => { this.goToUserFollowPath('followers') }} style={{ cursor: 'pointer' }}><FormattedMessage id="tcCommunityFollowers" /> {_followers_count}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span onClick={() => { this.goToUserFollowPath('followings') }} style={{ cursor: 'pointer' }}><FormattedMessage id="tcCommunityFollowing" /> {_followings_count}</span>
              </Row>
            </Row>
          </Row>

          <Row className="tc-user-info-row2">
            <Row><span style={{ fontWeight: 'bold' }}><FormattedMessage id="tc5_12" />: </span> {userInfo.location}</Row>
            <Row><span style={{ fontWeight: 'bold' }}><FormattedMessage id="tcGender" />: </span> {this.getUserSex(userInfo.sex)}</Row>
            <Row><span style={{ fontWeight: 'bold' }}><FormattedMessage id="tcInfo" />: </span> {userInfo.bio ? userInfo.bio : this.props.intl.formatMessage({ id: 'tcNoSomething' })}</Row>
            <Row onClick={this.goToUserTagPath}>
              {
                userTagsList.length > 0 && userTagsList.map((_tag, _idx) => {
                  return <Tag key={'tc-usertags-key-' + _tag.id} style={{ lineHeight: '12px' }} color="#108ee9">{_tag.name}</Tag>
                })
              }
              {
                isCurrentUser && <Tag style={{ lineHeight: '12px', cursor: 'pointer' }} color="#108ee9"><Icon type="plus" /></Tag>
              }
            </Row>
          </Row>

          <Divider style={{ margin: '1% 0' }} />
          <Row>
            <Col
              span={8}
              className={`tc-community-tabs text-center ${currTab == 'users' ? 'tc-community-tab-select' : ''}`}
              onClick={() => this.onClickCommunityTab('users')}><FormattedMessage id="tcPosts" /></Col>
            <Col
              span={8}
              className={`tc-community-tabs text-center ${currTab == 'imgList' ? 'tc-community-tab-select' : ''}`}
              onClick={() => this.onClickCommunityTab('imgList')}><FormattedMessage id="tcPhotos" /></Col>
            <Col
              span={8}
              className={`tc-community-tabs text-center ${currTab == 'videoList' ? 'tc-community-tab-select' : ''}`}
              onClick={() => this.onClickCommunityTab('videoList')}><FormattedMessage id="tcVideos" /></Col>
          </Row>

        </Row>

        {/* <Tabs tabs={[
          { title: <FormattedMessage id="tcPosts" />, key: 'users' },
          { title: <FormattedMessage id="tcPhotos" />, key: 'imgList' },
          { title: <FormattedMessage id="tcVideos" />, key: 'videoList' },
        ]}
          initialPage={currTab}
          distanceToChangeTab={0.8}
          useOnPan={false}
          swipeable={_isSwipeable}
          onChange={(tab, index) => { this.onClickCommunityTab(tab.key) }}
          onTabClick={(tab, index) => { this.onClickCommunityTab(tab.key) }}
        >
          {this.renderContent}
        </Tabs> */}

        <Row className="tc-user-home-content" >
          <Row style={{ display: currTab == 'users' ? 'block' : 'none' }} id="tc_user_info_handelDocIDPosts" className="tc_uhc_tabs_main">
            {
              commentList.length > 0 ?
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  {commentList.map((_item, _idx) => {
                    return <Row key={"tc-user-info-" + _item.id} className="tc-comm-list-item">
                      <TcCommunityDetailPage
                        itemdata={_item}
                        InitData={InitData}
                        history={this.props.history}
                        deletefeed={this.deleteFeedProp}
                        swipeablechange={this.swipeableChange}
                      />
                    </Row>;
                  })}

                  {this.state.loading && this.state.hasMore && (
                    <div className="tc-community-loading-container" style={{ position: 'fixed', bottom: '100px' }}>
                      <Spin indicator={antIcon} />
                    </div>
                  )}
                  <BackTop target={() => document.getElementById('tc_user_info_handelDocIDPosts')} />
                </InfiniteScroll>
                :
                <Empty />
            }
          </Row>
          <Row style={{ display: currTab == 'imgList' ? 'block' : 'none' }} id="tc_user_info_handelDocIDimgList" className="tc_uhc_tabs_main">
            {
              imgList.length > 0 ?
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.imgloading && this.state.imghasMore}
                  useWindow={false}
                >
                  {imgList.map((_item, _idx) => {
                    return <Col span={8} className="tc-user-info-img-row" key={"tc-user-info-img-" + _item.id}>
                      <img
                        alt="THINKCAR"
                        className='think-car-home-price-img'
                        src={_item.filename}
                        onClick={() => {
                          this.setState({ imgListIndx: _idx }, () => {
                            this.showModalImg();
                          })
                        }}
                      />
                    </Col>;
                  })}

                  {this.state.imgloading && this.state.imghasMore && (
                    <div className="tc-community-loading-container" style={{ position: 'fixed', bottom: '100px' }}>
                      <Spin indicator={antIcon} />
                    </div>
                  )}
                  <BackTop target={() => document.getElementById('tc_user_info_handelDocIDimgList')} />
                </InfiniteScroll>
                :
                <Empty />
            }
          </Row>
          <Row style={{ display: currTab == 'videoList' ? 'block' : 'none' }} id="tc_user_info_handelDocIDvideoList" className="tc_uhc_tabs_main">
            {
              videoList.length > 0 ?
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.videoloading && this.state.videohasMore}
                  useWindow={false}
                >
                  {videoList.map((_item, _idx) => {
                    return <Row style={{ padding: '1%' }} key={"tc-user-info-videos" + _item.id}>
                      <Player
                        playsInline
                        poster={_item.cover_id_url}
                        src={_item.video_id_url}
                      />
                    </Row>;
                  })}

                  {this.state.videoloading && this.state.videohasMore && (
                    <div className="tc-community-loading-container" style={{ position: 'fixed', bottom: '100px' }}>
                      <Spin indicator={antIcon} />
                    </div>
                  )}
                  <BackTop target={() => document.getElementById('tc_user_info_handelDocIDvideoList')} />
                </InfiniteScroll>
                :
                <Empty />
            }
          </Row>

        </Row>
        {
          !isCurrentUser && <Row className="tc-user-home-footer">
            <Col
              span={24}
              style={userInfo.follower ? { color: '#286dad', cursor: 'pointer' } : { cursor: 'pointer' }}
              onClick={this.onClickFollow}>
              <Icon
                type="heart" theme={userInfo.follower ? 'filled' : ''}
                style={{ color: '#286dad', marginRight: '5%' }}
              />
              <FormattedMessage id="tcCommunityFollow" />
            </Col>
            {/* <Col
            span={12}
            style={{ cursor: 'pointer' }}
            onClick={() => this.onClickCommunityTab('hot')}>
            <Icon style={{ paddingRight: '5%' }} type="message" />聊天</Col> */}
          </Row>
        }
        <TcModalImageRIG
          ref="tcModalImageRIGUser"
          tcimglist={imgList}
          tctitle={''}
          tcstyle={{ height: '500px', width: "100%" }}
          swipeablechange={this.swipeableChange}
        />
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcUserInfo)
