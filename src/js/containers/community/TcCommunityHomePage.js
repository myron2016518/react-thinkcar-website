import React from 'react'
import ReactDOM from 'react-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Card, Empty, message, List, Avatar, Spin, BackTop, Divider, Icon, Drawer, Carousel } from 'antd';
import config from '../../../public/config'
import request, { getIsLogin, transformParas, getProductByLang, get_session_cache, deepObjectMerge, getSign, remove_session_cache, browserRedirect } from '../../../public/common'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroller';
import TcCommunityDetailPage from './TcCommunityDetailPage';

const { Meta } = Card;
let _pageSize = 20;

class TcCommunityHomePage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      currTab: 'new',
      commentList: [],
      hotAdList: [],
      refereeList: [],
      refereeInfoList: [],
      loading: false,
      hasMore: false,
      visibleFeedsDrawer: false,
      tcDailyTopic: {},
      _height: document.documentElement.clientHeight * 4 / 5,
    }

    this.initFun = this.initFun.bind(this)
    this.onClickCommunityTab = this.onClickCommunityTab.bind(this)
    this.tcCommunityGetFeeds = this.tcCommunityGetFeeds.bind(this)
    this.tcCommunityGetFeedsRef = this.tcCommunityGetFeedsRef.bind(this)
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
    this.showFeedsDrawer = this.showFeedsDrawer.bind(this)
    this.onCloseFeedsDrawer = this.onCloseFeedsDrawer.bind(this)
    this.tcGetDailyTopic = this.tcGetDailyTopic.bind(this)
    this.clickTopics = this.clickTopics.bind(this)
    this.clickUserAvatar = this.clickUserAvatar.bind(this)
    this.clickAddFeeds = this.clickAddFeeds.bind(this)
    this.deleteFeedProp = this.deleteFeedProp.bind(this)
    this.tcGetAdList = this.tcGetAdList.bind(this) // HotSpot下面的广告列表接口
    this.tcGetRefereeList = this.tcGetRefereeList.bind(this) // 系统推荐人接口
    this.tcGetUserList = this.tcGetUserList.bind(this)  // 根据系统推荐人接口返回的ID 查询用户详情
    this.getFollowingUserInfo = this.getFollowingUserInfo.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    this.tcCommunityGetFeeds(this.state.currTab)
    this.tcGetDailyTopic();
    this.tcGetAdList();
  }

  tcGetAdList () {
    this.setState({
      isFetching: true
    })
    let _pa = { lang: this.props.intl.locale }
    let url = config.tcGetAdList,
      param = deepObjectMerge(_pa, { sign: getSign(_pa).toUpperCase() });

    return request(url, {
      method: 'POST',
      body: param,
    })
      .then(data => {
        if (data.code == 0) {

          this.setState({
            isFetching: false,
            hotAdList: data.data || []
          })

          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.message))
          return false

        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  }
  tcGetRefereeList () {
    this.setState({
      isFetching: true
    })
    let _pa = {
      "lang": this.props.intl.locale,
      "limit": 200,
    }
    let url = config.tcGetRefereeList,
      param = deepObjectMerge(_pa, { sign: getSign(_pa).toUpperCase() });

    return request(url, {
      method: 'POST',
      body: param,
    })
      .then(data => {
        if (data.code == 0) {
          let _lt = [];
          data.data.list.map((_item) => {
            _lt.push(_item.userid);
          })
          this.setState({
            isFetching: false,
            refereeList: data.data.list
          }, () => {
            _lt.length && this.tcGetUserList(_lt);
          })

          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.message))
          return false

        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  }

  tcCommunityGetFeedsRef (_type) {
    let { commentList, currTab, isFetching } = this.state;
    if (isFetching) return;
    this.setState({
      loading: true
    })
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
      "r": new Date().getTime()
    };

    let _por = {
      method: 'get',
      credentials: 'include',
      headers: _headers,
    }

    if (_type == 'video') {
      url = config.tcGetVideoList + '?r=' + new Date().getTime();
      _por.method = 'post';
      _pr.type = 0;
      _pr.offset = commentList.length || 0;
      _por.body = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    } else {
      _pr.after = commentList.length > 0 ? commentList[commentList.length - 1].id : '';
      url += `?${transformParas(_pr)}`;
    }

    fetch(url, _por).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        if (_type == 'video') {
          if (data.code == 0) {
            let _d = [...commentList, ...data.data.list];
            this.setState({
              isFetching: false,
              hasMore: data.data.list.length >= _pageSize ? true : false,
              commentList: _d
            })

          } else {
            this.setState({
              isFetching: false
            }, () => message.error(data.message))
          }
        } else {
          let _d = [...commentList, ...data.feeds];
          this.setState({
            hasMore: data.feeds.length >= _pageSize ? true : false,
            loading: false,
            commentList: _d
          })
        }


      }).catch(error => {
        this.setState({
          loading: false
        }, () => message.error(error.toString()))
      });


    // return request(url, {
    //   method: 'GET',
    //   body: _pr,
    // })
    //   .then(data => {
    //     let _d = [...commentList, ...data.feeds];
    //     this.setState({
    //       hasMore: data.feeds.length >= 5 ? true : false,
    //       loading: false,
    //       commentList: _d
    //     })
    //     return true

    //   })
    //   .catch(err => {
    //     this.setState({
    //       loading: false
    //     }, () => message.error(err.toString()))
    //     return false
    //   })
  }
  tcCommunityGetFeeds (_type) {
    let { commentList, currTab } = this.state;
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

    let _por = {
      method: 'get',
      credentials: 'include',
      headers: _headers,
    }

    if (_type == 'video') {
      url = config.tcGetVideoList + '?r=' + new Date().getTime();
      _por.method = 'post';
      _pr.type = 0;
      _pr.offset = commentList.length || 0;
      _por.body = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    } else {
      url += `?${transformParas(_pr)}`;
    }
    fetch(url, _por).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {

        if (_type == 'video') {
          if (data.code == 0) {
            this.setState({
              isFetching: false,
              hasMore: data.data.list.length >= _pageSize ? true : false,
              commentList: data.data.list
            })

          } else {
            this.setState({
              isFetching: false
            }, () => message.error(data.message))
          }
        } else {
          data.pinned.map((_item) => {
            _item.pinned = true;
          })

          let _d = [...data.pinned, ...data.feeds];
          this.setState({
            isFetching: false,
            hasMore: data.feeds.length >= _pageSize ? true : false,
            commentList: _d
          })
        }


      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });



    // return request(url, {
    //   method: 'GET',
    //   body: _pr,
    // })
    //   .then(data => {
    //     data.pinned.map((_item) => {
    //       _item.pinned = true;
    //     })

    //     let _d = [...data.pinned, ...data.feeds];
    //     this.setState({
    //       isFetching: false,
    //       hasMore: data.feeds.length >= 5 ? true : false,
    //       commentList: _d
    //     }, () => {


    //     })
    //     return true

    //   })
    //   .catch(err => {
    //     this.setState({
    //       isFetching: false
    //     }, () => message.error(err.toString()))
    //     return false
    //   })
  }
  tcGetDailyTopic (_type) {
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcDailyTopic + '?r=' + new Date().getTime();
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        this.setState({
          isFetching: false,
          tcDailyTopic: data
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });

  }

  onClickCommunityTab (_type) {
    this.setState({
      currTab: _type,
      commentList: []
    }, () => {
      if (_type === 'follow') {
        // 判断是否登录
        sessionStorage.tc_access_token_token && this.tcCommunityGetFeeds(_type)
        this.tcGetRefereeList()
      } else {
        this.tcCommunityGetFeeds(_type)
      }

    })


  }

  handleInfiniteOnLoad () {
    this.state.hasMore && this.tcCommunityGetFeedsRef(this.state.currTab)
  };

  showFeedsDrawer () {
    this.setState({
      visibleFeedsDrawer: true,
    });
  };

  onCloseFeedsDrawer () {
    this.setState({
      visibleFeedsDrawer: false,
    });
  };

  clickUserAvatar (_item) {
    console.log('===clickUserAvatar===', _item);
    this.props.history.push('/userinfo/' + _item.id)
  }

  clickTopics () {
    console.log('===clickTopics===', this.state.tcDailyTopic);
    this.props.history.push('/communitytopic/' + this.state.tcDailyTopic.id)
  }
  clickAddFeeds (_type) {
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (!sessionStorage.tc_access_token_token || !_getSeuserInfo) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
    } else {
      this.props.history.push('/addfeed/' + _type + '/0')
    }

  }
  deleteFeedProp (_id) {
    let _list = this.state.commentList;
    _list = _list.filter(_item => _item.id != _id)
    this.setState({ commentList: _list })
  }

  tcGetUserList (_type) {
    let { refereeInfoList } = this.state;
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcRegister + '?id=' + _type.toString() + '&order=asc&r=' + new Date().getTime();
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        let _html = [];
        for (let i = 0; i < data.length; i += 4) {
          let _d = { 'lev2': [data[i], data[i + 1], data[i + 2], data[i + 3]] }
          _html.push(_d);
        }
        this.setState({
          isFetching: false,
          // hasMore: data.length >= _pageSize ? true : false,
          refereeInfoList: _html
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });

  }

  getFollowingUserInfo () {
    let { refereeInfoList } = this.state;
    let { InitData, intl } = this.props;
    let _html = [];
    refereeInfoList.map((_item, _idx) => {
      let _lev2 = [];
      _item.lev2.map((_item2, _idx2) => {
        _item2 && _lev2.push(<Col key={"tc-home-following-key" + _item2.id + _idx2} span={6}>
          <Row><Avatar onClick={() => this.clickUserAvatar(_item2)} src={_item2.avatar ? _item2.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg'} /></Row>
          <Row onClick={() => this.clickUserAvatar(_item2)} className="tc-home-following-username">{_item2.name}</Row></Col>)

      })
      _html.push(<Row key={"tc-home-following-keylev1" + _idx} >{_lev2}</Row>)
    })
    // for (let i = 0; i < refereeInfoList.length; i++) {
    //   refereeInfoList[i] && _html.push(<Card hoverable style={{ width: '100%' }} key={"tc-home-following-key" + refereeInfoList[i].id + i}
    //     cover={<Avatar src={refereeInfoList[i].avatar ? refereeInfoList[i].avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg'}
    //       alt={refereeInfoList[i].name} />} >
    //     <Meta title={refereeInfoList[i].name} />
    //   </Card>)
    // }
    return _html;
  }
  render () {
    let { isFetching, currTab, commentList, _height, visibleFeedsDrawer, tcDailyTopic, hotAdList, refereeInfoList } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isLogo = false, _isOneself = {};
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (_getSeuserInfo) {
      _isOneself = JSON.parse(_getSeuserInfo);
      _isLogo = true;
    }

    let _isMob = browserRedirect();

    return (
      <div className="tc-community-home-page">
        <Row className="tc-community-home-tabs-main tc-ch-header-info-row" style={_isMob ? { padding: '5px 4%' } : {}} >
          <Col
            style={{ textAlign: 'center', fontSize: '22px' }}
            span={4}
            onClick={() => this.showFeedsDrawer()}>
            <Icon type="form" />
          </Col>
          <Col
            style={{ fontSize: '12px' }}
            span={16}
            onClick={this.clickTopics}>
            <Row>Hi {_isOneself.name}</Row>
            <Row className="tc-community-topic-name">{tcDailyTopic.name || ''}</Row>
          </Col>
          {
            _isLogo && <Col
              span={4}
              onClick={() => this.clickUserAvatar(_isOneself)}>
              <Avatar
                // onClick={() => { this.clickUserAvatar(item.user) }}
                src={_isOneself.avatar ? _isOneself.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg'}
                alt={_isOneself.name}
              />

            </Col>
          }
        </Row>
        <Row className="tc-community-home-tabs-main">
          <Col
            span={6}
            className={`tc-community-tabs text-center ${currTab == 'new' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('new')}><FormattedMessage id="tcCommunityExplore" /></Col>
          <Col
            span={6}
            className={`tc-community-tabs text-center ${currTab == 'hot' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('hot')}><FormattedMessage id="tcCommunityHotspot" /></Col>
          <Col
            span={6}
            className={`tc-community-tabs text-center ${currTab == 'follow' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('follow')}><FormattedMessage id="tcCommunityFollowing" /></Col>
          <Col
            span={6}
            className={`tc-community-tabs text-center ${currTab == 'video' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('video')}><FormattedMessage id="tcVideos" /></Col>
        </Row>
        <Row className="tc-community-home-content" id="tc_community_handelDocID" style={{ height: _height }}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            {
              currTab == 'hot' && <Carousel className="binnerList" autoplay >
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
              </Carousel>
            }
            {
              currTab == 'follow' && <Carousel autoplay className="binnerList tc-home-following-carousel" dots={false} >
                {
                  this.getFollowingUserInfo()
                }
              </Carousel>
            }
            <List
              style={_isMob ? { padding: '0 10%' } : {}}
              dataSource={commentList}
              renderItem={item => (
                <List.Item key={item.id} className="tc-comm-list-item">
                  {
                    currTab != 'video' ?
                      <TcCommunityDetailPage itemdata={item} InitData={InitData} history={this.props.history} deletefeed={this.deleteFeedProp} />
                      :
                      <Card
                        hoverable
                        style={{ width: '100%' }}
                        cover={
                          <iframe
                            src={InitData._tcYoutubePath + item.video_v}
                            width="100%"
                            style={{ minHeight: '200px' }}
                            frameBorder="0"
                            allowFullScreen
                          >
                          </iframe>
                        }
                      >
                        <Meta title={item.title} />
                      </Card>
                  }

                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="tc-community-loading-container">
                  <Spin />
                </div>
              )}
            </List>
            <BackTop target={() => document.getElementById('tc_community_handelDocID')} />
          </InfiniteScroll>

          {/* {
            commentList.map((_item, _idx) => {
              return <Row key={'feedsListKey' + _item.id} className="tc-ch-list">
                {_item.feed_content}
              </Row>
            })
          } */}
        </Row>

        {/* 发布动态框 */}
        <Drawer
          // title="回复框"
          key="tc-community-add-feeds-drawer"
          placement="bottom"
          height={'50%'}
          closable={false}
          onClose={this.onCloseFeedsDrawer}
          visible={visibleFeedsDrawer}
        >
          <Row>
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('txt') }}><Icon type="edit" theme="twoTone" /> </Row>
            <Divider style={{ margin: '1% 0' }} />
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('picture') }}><Icon type="picture" theme="twoTone" /></Row>
            <Divider style={{ margin: '1% 0' }} />
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('video') }}><Icon type="video-camera" theme="twoTone" /></Row>
            <Divider style={{ margin: '1% 0' }} />
          </Row>

        </Drawer>

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcCommunityHomePage)
