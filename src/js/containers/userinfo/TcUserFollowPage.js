import React from 'react'
import ReactDOM from 'react-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Card, Empty, message, List, Avatar, Spin, BackTop } from 'antd';
import config from '../../../public/config'
import request, { transformParas, browserRedirect, getProductByLang, get_session_cache, remove_session_cache, deepObjectMerge, getSign } from '../../../public/common'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroller';

let _pageSize = 20;

class TcUserFollowPage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      currTab: this.props.match.params.type || 'followers',
      likesList: [],
      loading: false,
      hasMore: false,
      _height: document.documentElement.clientHeight * 6 / 7,
    }

    this.initFun = this.initFun.bind(this)
    this.tcCommunityGetFeeds = this.tcCommunityGetFeeds.bind(this)
    this.tcCommunityGetFeedsRef = this.tcCommunityGetFeedsRef.bind(this)
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
    this.clickUserAvatar = this.clickUserAvatar.bind(this)
    this.onClickFollow = this.onClickFollow.bind(this)  // 收藏
    this.onClickCommunityTab = this.onClickCommunityTab.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    this.tcCommunityGetFeeds(this.props.match.params.type)
  }

  tcCommunityGetFeedsRef (_type) {
    let { likesList, currTab, isFetching } = this.state;
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

    let url = `${config.tcRegister}/${this.props.match.params.userid}/${_type}`;
    let _pr = { // 接口参数
      "limit": _pageSize,
      "offset": likesList.length || 0,
      "r": new Date().getTime(),
    };
    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        let _d = [...likesList, ...data];
        this.setState({
          hasMore: data.length >= _pageSize ? true : false,
          loading: false,
          likesList: _d
        })
      }).catch(error => {
        this.setState({
          loading: false
        }, () => message.error(error.toString()))
      });

  }
  tcCommunityGetFeeds (_type) {
    let { likesList, currTab } = this.state;
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcRegister}/${this.props.match.params.userid}/${_type}`;
    let _pr = { // 接口参数
      "limit": _pageSize,
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
        let _d = [...likesList, ...data];
        this.setState({
          isFetching: false,
          hasMore: data.length >= _pageSize ? true : false,
          likesList: _d
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });

  }


  handleInfiniteOnLoad () {
    this.state.hasMore && this.tcCommunityGetFeedsRef(this.props.match.params.type)
  };

  clickUserAvatar (_item) {
    // console.log('===clickUserAvatar===', _item);
    this.props.history.push('/userinfo/' + _item.id)
  }
  onClickFollow (_item) {
    let { likesList } = this.state;
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
    let url = `${config.tcGetUserInfo}/followings/${_item.id}`;
    let _options = {
      method: _item.follower ? 'DELETE' : 'PUT',
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
        // let _da = itemdata;
        // _da.has_collect = !itemdata.has_collect;
        let _list = likesList;
        _list.map((_i) => {
          _i.id == _item.id && (_i.follower = !_item.follower)
        })
        this.setState({
          isFetching: false,
          likesList: _list,
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });
  };
  onClickCommunityTab (_type) {
    this.setState({
      currTab: _type,
      likesList: []
    }, () => {
      this.tcCommunityGetFeeds(_type)
    })
  }
  render () {
    let { isFetching, currTab, likesList, _height } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    let _isOneself = {};
    if (_getSeuserInfo) {
      _isOneself = JSON.parse(_getSeuserInfo);
    }

    return (
      <div className="tc-communitylikes-home-page" style={_isMob ? { padding: '0 20%' } : {}} >
        <Row>
          <Col
            span={12}
            className={`tc-community-tabs text-center ${currTab == 'followers' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('followers')}><FormattedMessage id="tcCommunityFollowers" /></Col>
          <Col
            span={12}
            className={`tc-community-tabs text-center ${currTab == 'followings' ? 'tc-community-tab-select' : ''}`}
            onClick={() => this.onClickCommunityTab('followings')}><FormattedMessage id="tcCommunityFollowing" /></Col>

        </Row>
        <Row className="tc-communitylikes-home-content" id="tc_community_likes_handelDocID" style={{ height: _height }}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={likesList}
              renderItem={item => (
                <List.Item key={item.id} className="tc-comm-list-item">

                  <Col span={3} style={{ textAlign: 'center', paddingTop: '1%' }} >
                    <Avatar
                      onClick={() => { this.clickUserAvatar(item) }}
                      style={{ cursor: 'pointer' }}
                      src={item.avatar ? item.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg'}
                      alt={item.name}
                    />
                  </Col>
                  <Col span={15} className="tc-com-detail-title" >
                    <p style={{ cursor: 'pointer' }} onClick={() => { this.clickUserAvatar(item) }} className="tc-com-detail-author-name">{item.name}</p>
                    <p>{item.bio ? item.bio : this.props.intl.formatMessage({ id: 'tcNoSomething' })}</p>
                  </Col>
                  <Col span={6} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => { this.onClickFollow(item) }}>
                    {
                      _isOneself.id != item.id && <span>{
                        item.follower ? < span className="tc-cd-hava-following"><FormattedMessage id="tcCommunityFollowing" /></span>
                          : < span className="tc-cd-hava-follow">+<FormattedMessage id="tcCommunityFollow" /></span>
                      }
                      </span>
                    }
                  </Col>

                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="tc-community-loading-container">
                  <Spin />
                </div>
              )}
            </List>
            <BackTop target={() => document.getElementById('tc_community_likes_handelDocID')} />
          </InfiniteScroll>
        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcUserFollowPage)
