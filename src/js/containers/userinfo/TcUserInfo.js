import React from 'react'
import ReactDOM from 'react-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Card, Empty, message, List, Avatar, Spin, BackTop, Icon, Divider, Tag } from 'antd';
import config from '../../../public/config'
import request, { transformParas, getProductByLang, browserRedirect, get_session_cache, deepObjectMerge, getSign, remove_session_cache } from '../../../public/common'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroller';
import TcCommunityDetailPage from '../community/TcCommunityDetailPage';
import Zmage from 'react-zmage'
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

const { Meta } = Card;
let _pageSize = 20;

class TcUserInfo extends React.Component {
  constructor(props, context) {
    super(props);

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
      "after": commentList.length > 0 ? commentList[commentList.length - 1].id : '',
      "type": _type,
    };
    _type == 'users' && (_pr.user = this.props.match.params.userid)
    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        let _d = [...commentList, ...data.feeds];
        this.setState({
          hasMore: data.feeds.length >= _pageSize ? true : false,
          loading: false,
          commentList: _d
        })
      }).catch(error => {
        this.setState({
          loading: false
        }, () => message.error(error.toString()))
      });
  }
  tcCommunityGetFeeds (_type, _props) {
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
    let { commentList, currTab } = this.state;
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
      "limit": _pageSize,
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
        this.setState({
          isFetching: false,
          hasMore: data.length >= _pageSize ? true : false,
          commentList: [...data]
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
      if (_type === 'users') {
        this.tcCommunityGetFeeds(_type, this.props)
      } else {
        this.tcUserVideoAndImg(_type, this.props)
      }
    })
  }

  handleInfiniteOnLoad () {
    this.state.hasMore && this.tcCommunityGetFeedsRef(this.state.currTab)
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
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
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
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
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
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
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
        message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
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
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
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
  render () {
    let { isFetching, currTab, commentList, _height, userInfo, userTagsList, isCurrentUser } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    let _avatarUrl = userInfo.avatar ? userInfo.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg';
    const _userinfoBg = {
      background: `url(${InitData._homeImgPath}/Home/img/user_info_bg.png) no-repeat center`,
      backgroundSize: 'cover'
    }

    let _imgList = [];
    if (currTab == 'imgList') {
      commentList.map((_item, _idx) => {
        _imgList.push({
          src: _item.filename,
          alt: _item.channel
        });
      })
    }

    let _followers_count = 0, _followings_count = 0;
    _followers_count = userInfo.extra ? userInfo.extra.followers_count : 0;
    _followings_count = userInfo.extra ? userInfo.extra.followings_count : 0;

    return (
      <div className="tc-user-home-page" style={_isMob ? { padding: '0 10%', height: document.documentElement.clientHeight - 50 } : { height: document.documentElement.clientHeight - 50 }}  >
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
            <Row><span style={{ fontWeight: 'bold' }}><FormattedMessage id="tcOrderCity" />: </span> {userInfo.location}</Row>
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
        <Row
          className="tc-user-home-content"
          id="tc_user_info_handelDocID"
        // style={{ height: _height }}
        >
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
                  let _html = '';
                  currTab == 'users' && (_html = <Row key={"tc-user-info-" + _item.id} className="tc-comm-list-item">
                    <TcCommunityDetailPage itemdata={_item} InitData={InitData} history={this.props.history} deletefeed={this.deleteFeedProp} />
                  </Row>);
                  currTab == 'imgList' && (_html = <Col span={8} className="tc-user-info-img-row" key={"tc-user-info-img-" + _item.id}>
                    <Zmage
                      key={'tc-com-detail-img' + _item.id + _idx}
                      src={_item.filename}
                      alt={_item.channel}
                      set={_imgList}
                      preset={'mobile'}
                      defaultPage={this.state.imgListIndx}
                      onClick={(thi) => {
                        this.setState({ imgListIndx: _idx })
                      }}
                    />
                  </Col>);
                  currTab == 'videoList' &&
                    (_html = <Row style={{ padding: '1%' }} key={"tc-user-info-videos" + _item.id}>
                      <Player
                        playsInline
                        poster={_item.cover_id_url}
                        src={_item.video_id_url}
                      />
                    </Row>)
                  return _html;
                })}

                {/* <List
              dataSource={commentList}
              renderItem={(item) => {
                let _html = '';
                currTab == 'users' && (_html = <List.Item key={item.id} className="tc-comm-list-item">
                  <TcCommunityDetailPage itemdata={item} InitData={InitData} history={this.props.history} />
                </List.Item>);
                currTab == 'imgList' && (_html = <Row></Row>);
                currTab == 'videoList' &&
                  (_html = <Col span={12}>
                    <Player
                      playsInline
                      poster={item.cover_id_url}
                      src={item.video_id_url}
                    />
                  </Col>)
                return _html;
              }}
            > */}
                {this.state.loading && this.state.hasMore && (
                  <div className="tc-community-loading-container">
                    <Spin />
                  </div>
                )}
                {/* </List> */}
                <BackTop target={() => document.getElementById('tc_user_info_handelDocID')} />
              </InfiniteScroll>
              :
              <Empty />
          }
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

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcUserInfo)
