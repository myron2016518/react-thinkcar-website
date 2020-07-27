import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Row, Col, message, List, Avatar, Spin, BackTop, Input, Icon } from 'antd';
import config from '../../../public/config'
import { transformParas, browserRedirect, getProductByLang, get_local_cache, get_session_cache, set_session_cache, remove_session_cache, deepObjectMerge, getSign } from '../../../public/common'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroller';
import TcCommunityDetailPage from './TcCommunityDetailPage';

const { Search } = Input;
let _pageSize = 20;

class TcCommunitySearchPage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      currTab: 'explore',
      loading: false,
      hasMore: false,
      searchInputTxt: '',
      tcSearchFeedsList: [],
      tcSearchHistoryList: [],
      _height: document.documentElement.clientHeight - (get_local_cache('tc_community_type') ? 100 : 150),
    }

    this.initFun = this.initFun.bind(this)
    this.tcCommunityGetFeeds = this.tcCommunityGetFeeds.bind(this)
    this.tcCommunityGetFeedsRef = this.tcCommunityGetFeedsRef.bind(this)
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
    this.clickUserAvatar = this.clickUserAvatar.bind(this)
    this.onClickFollow = this.onClickFollow.bind(this)  // 收藏
    this.onClickCommunityTab = this.onClickCommunityTab.bind(this)
    this.clickSearchFriend = this.clickSearchFriend.bind(this)
    this.deleteSearchFeedProp = this.deleteSearchFeedProp.bind(this)
    this.clearHistoryList = this.clearHistoryList.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    let _getSearchList = get_session_cache('tc_community_search_list');
    if (_getSearchList) {
      _getSearchList = JSON.parse(_getSearchList);
      this.setState({ tcSearchHistoryList: _getSearchList })
    }
    // this.tcCommunityGetFeeds(this.state.currTab)
  }

  tcCommunityGetFeedsRef (_type) {
    let { tcSearchFeedsList, searchInputTxt, isFetching } = this.state;
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

    let url = `${config.tcCommunityGetFeeds}`;
    let _pr = { // 接口参数
      "limit": _pageSize,
      "r": new Date().getTime(),
    };
    if (_type == 'explore') {
      _pr.search = searchInputTxt;
      _pr.after = tcSearchFeedsList.length > 0 ? tcSearchFeedsList[tcSearchFeedsList.length - 1].id : '';
    } else {
      url = `${config.tcGetUserInfo}/search`;
      _pr.keyword = searchInputTxt;
      _pr.offset = tcSearchFeedsList.length;
    }

    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {

        if (_type == 'explore') {

          let _d = [...tcSearchFeedsList, ...data.feeds];
          this.setState({
            hasMore: data.feeds.length >= _pageSize ? true : false,
            loading: false,
            tcSearchFeedsList: _d
          })

        } else {
          let _d = [...tcSearchFeedsList, ...data];
          this.setState({
            loading: false,
            hasMore: data.length >= _pageSize ? true : false,
            tcSearchFeedsList: _d
          })
        }

      }).catch(error => {
        this.setState({
          loading: false
        }, () => message.error(error.toString()))
      });

  }
  tcCommunityGetFeeds (_type) {
    let { tcSearchFeedsList, searchInputTxt } = this.state;
    this.setState({
      isFetching: true
    })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcCommunityGetFeeds}`;

    let _pr = { // 接口参数
      "limit": _pageSize,
      "r": new Date().getTime()
    };

    if (_type == 'explore') {
      _pr.search = searchInputTxt;
    } else {
      url = `${config.tcGetUserInfo}/search`;
      _pr.keyword = searchInputTxt;
      _pr.offset = tcSearchFeedsList.length;
    }
    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {

        if (_type == 'explore') {
          data.pinned.map((_item) => {
            _item.pinned = true;
          })

          let _d = [...data.pinned, ...data.feeds];
          this.setState({
            isFetching: false,
            hasMore: data.feeds.length >= _pageSize ? true : false,
            tcSearchFeedsList: _d
          })
        } else {
          let _d = [...tcSearchFeedsList, ...data];
          this.setState({
            isFetching: false,
            hasMore: data.length >= _pageSize ? true : false,
            tcSearchFeedsList: _d
          })
        }


      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });

  }


  handleInfiniteOnLoad () {
    this.state.hasMore && this.tcCommunityGetFeedsRef(this.state.currTab)
  };

  clickUserAvatar (_item) {
    // console.log('===clickUserAvatar===', _item);
    this.props.history.push('/userinfo/' + _item.id)
  }
  onClickFollow (_item) {
    let { tcSearchFeedsList } = this.state;
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
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
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
        let _list = tcSearchFeedsList;
        _list.map((_i) => {
          _i.id == _item.id && (_i.follower = !_item.follower)
        })
        this.setState({
          isFetching: false,
          tcSearchFeedsList: _list,
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });
  };
  onClickCommunityTab (_type) {
    let { searchInputTxt } = this.state;
    this.setState({
      currTab: _type,
      tcSearchFeedsList: []
    }, () => {
      searchInputTxt.trim() && this.tcCommunityGetFeeds(_type)
    })
  }
  clickSearchFriend (_val) {
    let { currTab, tcSearchHistoryList } = this.state
    let _v = _val.trim();
    if (_v != '') {

      let _d = tcSearchHistoryList.filter(_item => _item != _v);
      _d = [...[_v], ..._d]
      this.setState({ searchInputTxt: _v, tcSearchFeedsList: [], hasMore: false, tcSearchHistoryList: _d }, () => {
        this.tcCommunityGetFeeds(currTab);
        set_session_cache('tc_community_search_list', _d);
      })
    }
  }

  deleteSearchFeedProp (_id) {
    let _list = this.state.tcSearchFeedsList;
    _list = _list.filter(_item => _item.id != _id)
    this.setState({ tcSearchFeedsList: _list })
  }
  clearHistoryList (_txt) {
    if (_txt) {
      let _list = this.state.tcSearchHistoryList.filter(_item => _item != _txt);
      this.setState({ tcSearchHistoryList: _list || [] }, () => { set_session_cache('tc_community_search_list', _list || []); })
    } else {
      this.setState({ tcSearchHistoryList: [] }, () => { remove_session_cache('tc_community_search_list') })
    }

  }

  render () {
    let { isFetching, currTab, _height, searchInputTxt, tcSearchFeedsList, tcSearchHistoryList } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    let _isOneself = {};
    if (_getSeuserInfo) {
      _isOneself = JSON.parse(_getSeuserInfo);
    }

    console.log(tcSearchFeedsList)

    return (
      <div className="tc-communitysearch-home-page" style={_isMob ? { padding: '0 20%' } : {}} >
        <Row className="tc-caffd-search">
          <Search
            placeholder="input search text"
            value={searchInputTxt}
            onChange={v => this.setState({ searchInputTxt: v.target.value })}
            onSearch={value => { this.clickSearchFriend(value) }} enterButton
          />
        </Row>
        {
          searchInputTxt == '' ? <Row className="tc-cm-search-history-main">
            {
              tcSearchHistoryList.map((_item, _idx) => {
                return <Row key={"tc-com-search-history-key" + _idx} className="tc-cm-search-history-row">
                  <Col span={22} className="tc-cmshrc-txt" onClick={() => { this.clickSearchFriend(_item) }} >
                    <Icon type="history" />&nbsp;&nbsp;&nbsp;
                    {_item}
                  </Col>
                  <Col span={2} onClick={() => { this.clearHistoryList(_item) }} > <Icon type="close" /></Col>
                </Row>
              })
            }
            {
              tcSearchHistoryList.length > 0 && <Row onClick={this.clearHistoryList} className="tc-cm-search-history-row" style={{ color: '#000', textAlign: 'center' }}> Clear searching history </Row>
            }
          </Row>
            :
            <Row>
              <Row className="tc-community-search-tab">
                <Col
                  span={12}
                  className={`tc-community-tabs text-center ${currTab == 'explore' ? 'tc-community-tab-select' : ''}`}
                  onClick={() => this.onClickCommunityTab('explore')}><FormattedMessage id="tcCommunityExplore" /></Col>
                <Col
                  span={12}
                  className={`tc-community-tabs text-center ${currTab == 'user' ? 'tc-community-tab-select' : ''}`}
                  onClick={() => this.onClickCommunityTab('user')}><FormattedMessage id="tcUser" /></Col>

              </Row>
              <Row className="tc-communitysearch-home-content" id="tc_community_search_handelDocID" style={{ height: _height }}>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={tcSearchFeedsList}
                    renderItem={item => (
                      <List.Item key={item.id} className={currTab == 'explore' ? "tc-comm-search-list-item" : "tc-csli-user-item"}>

                        {
                          currTab == 'explore' ?
                            <TcCommunityDetailPage itemdata={item} InitData={InitData} history={this.props.history} deletefeed={this.deleteSearchFeedProp} />
                            : <Row className="tc-csli-user-row" >
                              <Col span={3} style={{ textAlign: 'center', paddingTop: '1%' }} >
                                <Avatar
                                  onClick={() => { this.clickUserAvatar(item) }}
                                  style={{ cursor: 'pointer' }}
                                  src={item.avatar ? item.avatar.url : InitData._homeImgPath + '/Home/img/default_avatar.jpg'}
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
                            </Row>
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
                  <BackTop target={() => document.getElementById('tc_community_search_handelDocID')} />
                </InfiniteScroll>
              </Row>
            </Row>
        }

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcCommunitySearchPage)
