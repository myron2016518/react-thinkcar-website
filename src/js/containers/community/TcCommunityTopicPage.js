import React from 'react'
import ReactDOM from 'react-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Card, Empty, message, List, Avatar, Spin, BackTop, Divider, Icon, Drawer } from 'antd';
import config from '../../../public/config'
import request, { getIsLogin, transformParas, browserRedirect, getProductByLang, get_session_cache, deepObjectMerge, getSign, remove_session_cache } from '../../../public/common'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroller';
import TcCommunityDetailPage from './TcCommunityDetailPage';

const { Meta } = Card;
let _pageSize = 20;

class TcCommunityTopicPage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      currTab: 'new',
      commentList: [],
      loading: false,
      hasMore: false,
      has_follow: false,
      visibleFeedsDrawer: false,
      tcDailyTopic: {},
      tcDailyTopicParticipants: [], // 获取话题下的参与者列表
      _height: document.documentElement.clientHeight * 5 / 6,
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
    this.onClickFollow = this.onClickFollow.bind(this)
    this.tcGetDailyTopicParticipants = this.tcGetDailyTopicParticipants.bind(this)
    this.tcGetUserList = this.tcGetUserList.bind(this)
    this.onGoToLikesPage = this.onGoToLikesPage.bind(this)  // 跳转路由喜欢页面

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
    this.tcGetDailyTopicParticipants();
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
    let url = config.tcFeedTopic + '/' + this.props.match.params.topicid + '/feeds';
    let _pr = { // 接口参数
      "limit": _pageSize,
      "direction": "desc",
      "index": commentList.length > 0 ? commentList[commentList.length - 1].index : '',
      // "type": _type,
    };
    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        data.map((_item) => {
          _item.topics = [];
        })
        let _d = [...commentList, ...data];
        this.setState({
          hasMore: data.length >= _pageSize ? true : false,
          loading: false,
          commentList: _d
        })
      }).catch(error => {
        this.setState({
          loading: false
        }, () => message.error(error.toString()))
      });

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
    let url = config.tcFeedTopic + '/' + this.props.match.params.topicid + '/feeds';
    let _pr = { // 接口参数
      "limit": _pageSize,
      // "type": _type,
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
        data.map((_item) => {
          _item.topics = [];
        })

        this.setState({
          isFetching: false,
          hasMore: data.length >= _pageSize ? true : false,
          commentList: data
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
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
    let url = config.tcFeedTopic + '/' + this.props.match.params.topicid + '?r=' + new Date().getTime();
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
          tcDailyTopic: data,
          has_follow: data.has_followed || false,
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });

  }
  tcGetUserList (_type) {
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcRegister + '?id=' + _type.toString() + '&r=' + new Date().getTime();
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
          tcDailyTopicParticipants: data,
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });

  }
  tcGetDailyTopicParticipants (_type) {
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcFeedTopic + '/' + this.props.match.params.topicid + '/participants?limit=4&r=' + new Date().getTime();
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        this.tcGetUserList(data);
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
  }
  clickAddFeeds (_type) {
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (!sessionStorage.tc_access_token_token || !_getSeuserInfo) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
    } else {
      this.props.history.push('/addfeed/' + _type + '/' + this.props.match.params.topicid)
    }

  }
  deleteFeedProp (_id) {
    let _list = this.state.commentList;
    _list = _list.filter(_item => _item.id != _id)
    this.setState({ commentList: _list })
  }

  onClickFollow () {
    let { has_follow } = this.state;
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
    let url = `${config.tcGetUserInfo}/feed-topics/${this.props.match.params.topicid}`;
    let _options = {
      method: has_follow ? 'DELETE' : 'PUT',
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

        this.setState({
          isFetching: false,
          has_follow: !this.state.has_follow,
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });
  };


  onGoToLikesPage () {
    console.log('===onGoToLikesPage===', this.props.match.params.feedid);
    this.props.history.push('/communitylikes/topic/' + this.props.match.params.topicid)
  }
  render () {
    let { isFetching, currTab, commentList, _height, visibleFeedsDrawer, tcDailyTopic, has_follow, tcDailyTopicParticipants } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    let _isLogo = false, _isOneself = {};
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (_getSeuserInfo) {
      _isOneself = JSON.parse(_getSeuserInfo);
      _isLogo = true;
    }

    console.log('===tcDailyTopicParticipants===', tcDailyTopicParticipants)
    return (
      <div className="tc-communitytopic-home-page" >
        <Row className="tc-community-home-tabs-main" style={_isMob ? { padding: '5px 10%' } : {}}>
          <Col
            style={{ textAlign: 'center', fontSize: '22px', cursor: 'pointer' }}
            span={4}
            onClick={() => this.showFeedsDrawer()}>
            <Icon type="form" />
          </Col>
          <Col
            className="tc-community-topic-name"
            span={16}
            onClick={this.clickTopics}>
            {tcDailyTopic.name || ''}
          </Col>
          <Col
            span={4}
            style={{ textAlign: 'center', fontSize: '22px' }}
          >
            <Icon
              type="heart" theme={has_follow ? 'filled' : ''}
              onClick={this.onClickFollow}
              style={{ cursor: 'pointer' }}
            />
          </Col>

        </Row>
        {/* <Row className="tc-community-home-tabs-main">
          <Col
            span={8}
            className={`tc-community-tabs text-center ${currTab == 'new' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('new')}><FormattedMessage id="tcCommunityExplore" /></Col>
          <Col
            span={8}
            className={`tc-community-tabs text-center ${currTab == 'hot' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('hot')}><FormattedMessage id="tcCommunityHotspot" /></Col>
          <Col
            span={8}
            className={`tc-community-tabs text-center ${currTab == 'follow' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('follow')}><FormattedMessage id="tcCommunityFollowing" /></Col>
        </Row> */}
        <Row className="tc-community-home-content" id="tc_community_handelDocID" style={_isMob ? { padding: '0 10%', height: _height } : { height: _height }}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <Row style={{ padding: '10px 20px' }}>
              <Row style={{ padding: '2%' }} className="tc-community-detail-page">
                <Row>{tcDailyTopic.desc}</Row>
                <Divider style={{ margin: '1% 0' }} />
                {
                  tcDailyTopicParticipants.length > 0
                  &&
                  <Row className="tc-cdi-likes-main" onClick={this.onGoToLikesPage} style={{ cursor: 'pointer' }} >
                    {
                      tcDailyTopicParticipants.map((_item, _idx) => {
                        let _likesListavatarUrl = _item.avatar ? _item.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg';
                        return <Avatar
                          key={'tc-cdi-likes-' + _item.id}
                          src={_likesListavatarUrl}
                          alt={_item.name}
                        />
                      })
                    }
                  </Row>
                }
              </Row>
            </Row>
            <List
              dataSource={commentList}
              renderItem={item => (
                <List.Item key={item.id} className="tc-comm-list-item">
                  <TcCommunityDetailPage itemdata={item} InitData={InitData} history={this.props.history} deletefeed={this.deleteFeedProp} />
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
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('topicstxt') }}><Icon type="edit" theme="twoTone" /> </Row>
            <Divider style={{ margin: '1% 0' }} />
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('topicspicture') }}><Icon type="picture" theme="twoTone" /></Row>
            <Divider style={{ margin: '1% 0' }} />
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('topicsvideo') }}><Icon type="video-camera" theme="twoTone" /></Row>
            <Divider style={{ margin: '1% 0' }} />
          </Row>

        </Drawer>

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcCommunityTopicPage)
