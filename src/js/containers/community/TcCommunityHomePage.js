import React from 'react'
// import ReactDOM from 'react-dom'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Card, message, Avatar, BackTop, Divider, Icon, Drawer, Carousel } from 'antd';
import { Tabs, PullToRefresh, ListView, ActivityIndicator } from 'antd-mobile';
import config from '../../../public/config'
// import Lazyload from 'react-lazyload';
import Loadable from '../../components/loadable'
import request, { transformParas, getQueryStringArgs, set_session_cache, set_local_cache, get_local_cache, get_session_cache, deepObjectMerge, getSign, browserRedirect } from '../../../public/common'
// import Loading from '../../components/Loading'
// import TcCommunityDetailPage from './TcCommunityDetailPage';
const TcCommunityDetailPage = Loadable(() => import('./TcCommunityDetailPage'));
// import 'antd-mobile/lib/tabs/style/css';

// const { TabPane } = Tabs;
const { Meta } = Card;
let _pageSize = 5;

class TcCommunityHomePage extends React.Component {
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
      currTab: 'new',

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


      hotAdList: [],
      refereeList: [],
      refereeInfoList: [],

      indexTab: 0,
      visibleFeedsDrawer: false,
      tcDailyTopic: {},
      _height: document.documentElement.clientHeight - (browserRedirect() ? 190 : 140),

      _isSwipeable: true, // 阻止 tabs 与 Carousel 滑动冲突

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
    this.goToSearchFeedsPage = this.goToSearchFeedsPage.bind(this)
    this.tcGetAndroidAppUserInfo = this.tcGetAndroidAppUserInfo.bind(this)  // android 模式获取用户信息
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.swipeableChange = this.swipeableChange.bind(this)

  }

  // componentDidUpdate () {
  //   if (this.state.useBodyScroll) {
  //     document.body.style.overflow = 'auto';
  //   } else {
  //     document.body.style.overflow = 'hidden';
  //   }
  // }

  componentDidMount () {
    this.initFun(this.props);
  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    // message.error(get_local_cache('tc_community_type'));
    let _querydata = getQueryStringArgs();
    if (_querydata) {
      if (_querydata.logintype) {
        let _to = _querydata.userTonken;
        _to = _to.replace("Bearer", "").trim();
        console.log('===userInfo===', _to);
        set_local_cache('tc_community_type', _querydata.logintype);
        set_session_cache('tc_access_token_token', _to);
        this.setState({ _height: document.documentElement.clientHeight - 100 }, () => {
          this.tcGetAndroidAppUserInfo(_querydata.userInfo);
        })
      }
    }

    // 缓存列表数据
    let _cacheData = get_local_cache("tc_community_commentList_cache");
    if (_cacheData) {
      _cacheData = JSON.parse(get_local_cache("tc_community_commentList_cache"));
      this.setState({
        commentList: _cacheData,
        dataSourcecommentList: this.state.dataSourcecommentList.cloneWithRows(_cacheData),
        refreshing: false, isLoading: false,
      }, () => {
        setTimeout(() => {
          this.tcCommunityGetFeeds(this.state.currTab);
        }, 10000)
      })
    } else {
      this.tcCommunityGetFeeds(this.state.currTab);
    }

    // 缓存每日推荐
    let _cachetcDailyTopic = get_local_cache("tc_community_tcDailyTopic_cache");
    if (_cachetcDailyTopic) {
      _cachetcDailyTopic = JSON.parse(get_local_cache("tc_community_tcDailyTopic_cache"));
      this.setState({ tcDailyTopic: _cachetcDailyTopic }, () => {
      })
    } else {
      this.tcGetDailyTopic();
    }

    // 缓存host 轮播图片
    let _cachehotAdList = get_local_cache("tc_community_hotAdList_cache");
    if (_cachehotAdList) {
      _cachehotAdList = JSON.parse(get_local_cache("tc_community_hotAdList_cache"));
      this.setState({ hotAdList: _cachehotAdList }, () => {
      })
    } else {
      this.tcGetAdList();
    }

  }

  tcGetAdList () {
    // this.setState({
    //   isFetching: true
    // })
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
            // isFetching: false,
            hotAdList: data.data || []
          }, () => {
            set_local_cache("tc_community_hotAdList_cache", data.data);

          })

          return true

        } else {
          // this.setState({
          //   // isFetching: false
          // }, () => message.error(data.message))
          return false

        }
      })
      .catch(err => {
        // this.setState({
        //   // isFetching: false
        // }, () => message.error(err.toString()))
        return false
      })
  }
  tcGetRefereeList () {
    // this.setState({
    //   isFetching: true
    // })
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
            // isFetching: false,
            refereeList: data.data.list
          }, () => {
            _lt.length && this.tcGetUserList(_lt);
            set_session_cache("tc_community_refereeList_cache", data.data.list);
          })

          return true

        } else {
          // this.setState({
          //   isFetching: false
          // }, () => message.error(data.message))
          return false

        }
      })
      .catch(err => {
        // this.setState({
        //   isFetching: false
        // }, () => message.error(err.toString()))
        return false
      })
  }

  tcCommunityGetFeedsRef (_type) {
    let { commentList, dataSourcecommentList, currTab, isFetching, videoList, followList, hotList } = this.state;
    if (isFetching || (_type == 'video' && videoList.length > 0)) return;
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

    let _loadingType = {};

    switch (_type) {
      case 'new':
        _loadingType = { isLoading: true };
        _pr.after = commentList.length > 0 ? commentList[commentList.length - 1].id : '';
        url += `?${transformParas(_pr)}`;
        break;
      case 'hot':
        _loadingType = { hotisLoading: true };
        _pr.after = hotList.length > 0 ? hotList[hotList.length - 1].id : '';
        _type == 'hot' && (_pr.hot = hotList.length > 0 ? hotList[hotList.length - 1].hot : '')
        url += `?${transformParas(_pr)}`;
        break;
      case 'follow':
        _loadingType = { followisLoading: true };
        _pr.after = followList.length > 0 ? followList[followList.length - 1].id : '';
        url += `?${transformParas(_pr)}`;
        break;
      case 'video':
        _loadingType = { videoisLoading: true };
        url = config.tcGetVideoList + '?r=' + new Date().getTime();
        _por.method = 'post';
        _pr.type = 0;
        _pr.offset = videoList.length || 0;
        _por.body = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
        break;
    }

    this.setState(_loadingType)

    fetch(url, _por).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        if (_type == 'video') {
          if (data.code == 0) {
            let _d = [...videoList, ...data.data.list];
            this.setState({
              videoloading: false,
              videohasMore: data.data.list.length >= _pageSize ? true : false,
              videoList: _d,
              dataSourcevideoList: this.state.dataSourcevideoList.cloneWithRows(_d),
              videorefreshing: false, videoisLoading: false,
            }, () => {
              set_local_cache('tc_community_videolist_cache', _d);
            })

          } else {
            this.setState({
              videoloading: false
            });
            // }, () => message.error(data.message))
          }
        } else {
          let _updateInfo = {}, _ismo = data.feeds.length >= _pageSize ? true : false;
          currTab == 'new' && (_updateInfo = {
            isLoading: false, hasMore: _ismo,
            commentList: [...commentList, ...data.feeds],
            dataSourcecommentList: this.state.dataSourcecommentList.cloneWithRows([...commentList, ...data.feeds])
          },
            set_local_cache('tc_community_commentList_cache', [...commentList, ...data.feeds]));
          currTab == 'hot' && (_updateInfo = {
            otloading: false, hothasMore: _ismo,
            hotList: [...hotList, ...data.feeds],
            dataSourcehotList: this.state.dataSourcehotList.cloneWithRows([...hotList, ...data.feeds]),
            hotrefreshing: false, hotisLoading: false,
          }, set_local_cache('tc_community_hotList_cache', [...hotList, ...data.feeds]));
          currTab == 'follow' && (_updateInfo = {
            followloading: false, followhasMore: _ismo,
            followList: [...followList, ...data.feeds],
            dataSourcefollowList: this.state.dataSourcefollowList.cloneWithRows([...followList, ...data.feeds]),
            followrefreshing: false, followisLoading: false,
          }, set_local_cache('tc_community_followList_cache', [...followList, ...data.feeds]));
          this.setState(_updateInfo)
        }

      }).catch(error => {
        this.setState({
          loading: false,
          hotloading: false,
          followloading: false,
          videoloading: false,
        })
        // }, () => message.error(error.toString()))

      });

  }
  tcCommunityGetFeeds (_type) {
    let { currTab, videoList, refreshing, videorefreshing, hotrefreshing, followrefreshing } = this.state;

    (!refreshing && !videorefreshing && !hotrefreshing && !followrefreshing) && this.setState({ isFetching: true });

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
      _pr.offset = videoList.length || 0;
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
              videohasMore: data.data.list.length >= _pageSize ? true : false,
              videoList: data.data.list,
              dataSourcevideoList: this.state.dataSourcevideoList.cloneWithRows(data.data.list),
              videorefreshing: false, videoisLoading: false,
            }, () => {
              set_local_cache('tc_community_videolist_cache', data.data.list);
            })

          } else {
            this.setState({
              isFetching: false
            });
            // }, () => message.error(data.message))
          }
        } else {
          data.pinned.map((_item) => {
            _item.pinned = true;
          })

          let _d = [...data.pinned, ...data.feeds];
          let _updateInfo = {}, _ismo = data.feeds.length >= _pageSize ? true : false;
          currTab == 'new' && (_updateInfo = {
            isFetching: false, hasMore: _ismo,
            commentList: _d,
            dataSourcecommentList: this.state.dataSourcecommentList.cloneWithRows(_d),
            refreshing: false,
            isLoading: false,
          }, set_local_cache('tc_community_commentList_cache', _d));
          currTab == 'hot' && (_updateInfo = {
            isFetching: false, hothasMore: _ismo,
            hotList: _d,
            dataSourcehotList: this.state.dataSourcehotList.cloneWithRows(_d),
            hotrefreshing: false, hotisLoading: false,
          }, set_local_cache('tc_community_hotList_cache', _d));
          currTab == 'follow' && (_updateInfo = {
            isFetching: false, followhasMore: _ismo,
            followList: _d,
            dataSourcefollowList: this.state.dataSourcefollowList.cloneWithRows(_d),
            followrefreshing: false, followisLoading: false,
          }, set_local_cache('tc_community_followList_cache', _d));
          this.setState(_updateInfo)
        }


      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => {
          // message.error(error.toString());
        })
      });

  }
  tcGetDailyTopic (_type) {
    // this.setState({
    //   isFetching: true
    // })

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
          // isFetching: false,
          tcDailyTopic: data
        }, () => {
          set_local_cache("tc_community_tcDailyTopic_cache", data);
        })
      }).catch(error => {
        // this.setState({
        //   // isFetching: false
        // }, () => message.error(error.toString()))
      });

  }

  onClickCommunityTab (_type) {
    let { refereeInfoList, videoList, currTab, commentList, followList, hotList } = this.state;
    console.log('===videoList====', _type, videoList, commentList);

    this.setState({
      currTab: _type,
    }, () => {
      if (_type == 'new' && commentList.length == 0) {
        // 缓存列表数据
        let _cacheData = get_local_cache("tc_community_commentList_cache");
        if (_cacheData) {
          _cacheData = JSON.parse(get_local_cache("tc_community_commentList_cache"));
          this.setState({
            commentList: _cacheData,
            dataSourcecommentList: this.state.dataSourcecommentList.cloneWithRows(_cacheData),
            refreshing: false, isLoading: false,
          })
        } else {
          this.tcCommunityGetFeeds(_type);
        }
      }
      if (_type == 'hot' && hotList.length == 0) {
        // 缓存列表数据
        let _cachehotList = get_local_cache("tc_community_hotList_cache");
        if (_cachehotList) {
          _cachehotList = JSON.parse(get_local_cache("tc_community_hotList_cache"));
          this.setState({
            hotList: _cachehotList,
            dataSourcehotList: this.state.dataSourcehotList.cloneWithRows(_cachehotList),
            hotrefreshing: false, hotisLoading: false,
          })
        } else {
          this.tcCommunityGetFeeds(_type);
        }

        // 缓存host 轮播图片
        let _cachehotAdList = get_local_cache("tc_community_hotAdList_cache");
        if (_cachehotAdList) {
          _cachehotAdList = JSON.parse(get_local_cache("tc_community_hotAdList_cache"));
          this.setState({ hotAdList: _cachehotAdList }, () => {
          })
        } else {
          this.tcGetAdList();
        }
      }
      if (_type == 'video' && videoList.length == 0) {
        // 缓存列表数据
        let _cachevideolist = get_local_cache("tc_community_videolist_cache");
        if (_cachevideolist) {
          _cachevideolist = JSON.parse(get_local_cache("tc_community_videolist_cache"));
          this.setState({
            videoList: _cachevideolist,
            dataSourcevideoList: this.state.dataSourcevideoList.cloneWithRows(_cachevideolist),
            videorefreshing: false, videoisLoading: false,
          })
        } else {
          this.tcCommunityGetFeeds(_type);
        }
      }
      // (_type == 'new' && commentList.length == 0) && this.tcCommunityGetFeeds(_type);
      // (_type == 'hot' && hotList.length == 0) && this.tcCommunityGetFeeds(_type);
      // (_type == 'video' && videoList.length == 0) && this.tcCommunityGetFeeds(_type);
      if (_type == 'follow') {
        // 判断是否登录
        if (sessionStorage.tc_access_token_token && followList.length == 0) {
          // 缓存列表数据
          let _cachefollowList = get_local_cache("tc_community_followList_cache");
          if (_cachefollowList) {
            _cachefollowList = JSON.parse(get_local_cache("tc_community_followList_cache"));
            this.setState({
              followList: _cachefollowList,
              dataSourcefollowList: this.state.dataSourcefollowList.cloneWithRows(_cachefollowList),
              followrefreshing: false, followisLoading: false,
            })
          } else {
            this.tcCommunityGetFeeds(_type);
          }

          // 缓存每日推荐
          let _cachetcDailyTopic = get_local_cache("tc_community_tcDailyTopic_cache");
          if (_cachetcDailyTopic) {
            _cachetcDailyTopic = JSON.parse(get_local_cache("tc_community_tcDailyTopic_cache"));
            this.setState({ tcDailyTopic: _cachetcDailyTopic }, () => {
            })
          } else {
            this.tcGetDailyTopic();
          }

        }
        // (sessionStorage.tc_access_token_token && followList.length == 0) && this.tcCommunityGetFeeds(_type);
        // refereeInfoList.length == 0 && this.tcGetRefereeList();
        if (refereeInfoList.length == 0) {
          let _cacherefereeList = get_session_cache("tc_community_refereeList_cache");
          let _cacherefereeInfoList = get_session_cache("tc_community_refereeInfoList_cache");
          if (_cacherefereeList) {
            _cacherefereeList = JSON.parse(get_session_cache("tc_community_refereeList_cache"));
            if (_cacherefereeInfoList) {
              _cacherefereeInfoList = JSON.parse(get_session_cache("tc_community_refereeInfoList_cache"));
              this.setState({ refereeList: _cacherefereeList, refereeInfoList: _cacherefereeInfoList });
            } else {
              this.setState({ refereeList: _cacherefereeList }, () => { _cacherefereeList.length && this.tcGetUserList(_cacherefereeList); });
            }

          } else {
            this.tcGetRefereeList();
          }
        }
      }

    });

  }

  handleInfiniteOnLoad () {
    let { currTab } = this.state;
    switch (currTab) {
      case 'new':
        this.state.hasMore && this.tcCommunityGetFeedsRef(currTab)
        break;
      case 'hot':
        this.state.hothasMore && this.tcCommunityGetFeedsRef(currTab)
        break;
      case 'follow':
        this.state.followhasMore && this.tcCommunityGetFeedsRef(currTab)
        break;
      case 'video':
        this.state.videohasMore && this.tcCommunityGetFeedsRef(currTab)
        break;
      default:
        message.error('error')
    }

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
      message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
    } else {
      this.props.history.push('/addfeed/' + _type + '/0')
    }

  }
  deleteFeedProp (_id) {
    let { currTab, commentList, followList, hotList } = this.state;
    let _list = [];
    if (currTab == 'new') {
      _list = commentList.filter(_item => _item.id != _id);
      this.setState({
        commentList: _list,
        dataSourcecommentList: this.state.dataSourcecommentList.cloneWithRows(_list)
      }, () => {
        set_local_cache('tc_community_commentList_cache', _list);
      });
    } else if (currTab == 'hot') {
      _list = hotList.filter(_item => _item.id != _id);
      this.setState({ hotList: _list, dataSourcehotList: this.state.dataSourcehotList.cloneWithRows(_list) }, () => {
        set_local_cache('tc_community_hotList_cache', _list);
      });
    } else if (currTab == 'follow') {
      _list = followList.filter(_item => _item.id != _id);
      this.setState({ followList: _list, dataSourcefollowList: this.state.dataSourcefollowList.cloneWithRows(_list) }, () => {
        set_local_cache('tc_community_followList_cache', _list);
      });
    }
  }

  tcGetUserList (_type) {
    let { refereeInfoList } = this.state;
    // this.setState({
    //   isFetching: true
    // })

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
          // isFetching: false,
          // hasMore: data.length >= _pageSize ? true : false,
          refereeInfoList: _html
        }, () => {
          set_session_cache("tc_community_refereeInfoList_cache", _html);
        })
      }).catch(error => {
        // this.setState({
        //   isFetching: false
        // });
        // }, () => message.error(error.toString()))
      });

  }
  tcGetAndroidAppUserInfo (_userid) {
    // this.setState({
    //   isFetching: true
    // })

    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcRegister + '/' + _userid + '?r=' + new Date().getTime();
    fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {

        set_session_cache('tc_temporary_user_info', data)
        // this.setState({
        //   isFetching: false,
        // })
      }).catch(error => {
        // this.setState({
        //   isFetching: false
        // }, () => message.error(error.toString()))
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
          <Row><Avatar onClick={() => this.clickUserAvatar(_item2)} src={_item2.avatar ? _item2.avatar.url : InitData._homeImgPath + '/Home/img/default_avatar.jpg'} /></Row>
          <Row onClick={() => this.clickUserAvatar(_item2)} className="tc-home-following-username">{_item2.name}</Row></Col>)

      })
      _html.push(<Row key={"tc-home-following-keylev1" + _idx} >{_lev2}</Row>)
    })
    // for (let i = 0; i < refereeInfoList.length; i++) {
    //   refereeInfoList[i] && _html.push(<Card hoverable style={{ width: '100%' }} key={"tc-home-following-key" + refereeInfoList[i].id + i}
    //     cover={<Avatar src={refereeInfoList[i].avatar ? refereeInfoList[i].avatar.url : InitData._homeImgPath + '/Home/img/default_avatar.jpg'}
    //       alt={refereeInfoList[i].name} />} >
    //     <Meta title={refereeInfoList[i].name} />
    //   </Card>)
    // }
    return _html;
  }

  goToSearchFeedsPage (_item) {
    console.log('===goToSearchFeedsPage===', _item);
    this.props.history.push('/tccsearch/' + _item)
  }

  handleChange (event, value) {
    this.setState({
      indexTab: value,
    });
  };

  handleChangeIndex (index) {
    let _da = 'new';
    switch (index) {
      case 0:
        _da = 'new';
        break;
      case 1:
        _da = 'hot';
        break;
      case 2:
        _da = 'follow';
        break;
      case 3:
        _da = 'video';
        break;
      default:
        _da = 'new';
    }
    this.setState({
      indexTab: index,
    }, () => {
      this.onClickCommunityTab(_da);
    });
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
        commentList.length ? (_da = (<Row className="tc-community-home-content" id="tc_community_handelDocID_new"
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
          {/* {_getloginType != 'iosapp' && _getloginType != 'androidapp' && <BackTop target={() => document.getElementById('tc_community_handelDocID_new')} />} */}
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
      case 'follow':
        followList.length ? (_da = (<Row className="tc-community-home-content" id="tc_community_handelDocID_follow"
          style={{ height: this.state._height, }}  >

          <ListView
            key={this.state.followuseBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={dataSourcefollowList}
            renderHeader={() => <Carousel autoplay className="binnerList tc-home-following-carousel" dots={false} swipe={false}>
              {
                this.getFollowingUserInfo()
              }
            </Carousel>}
            renderFooter={() => (<div style={{ textAlign: 'center' }}>
              {this.state.followisLoading ? 'Loading...' : 'Loaded'}
            </div>)}
            renderRow={_ttrow}
            useBodyScroll={this.state.followuseBodyScroll}
            style={this.state.followuseBodyScroll ? {} : {
              height: this.state._height,
            }}
            pullToRefresh={<PullToRefresh
              refreshing={this.state.followrefreshing}
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
          {/*   {_getloginType != 'iosapp' && _getloginType != 'androidapp' && <BackTop target={() => document.getElementById('tc_community_handelDocID_follow')} />} */}
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
      case 'new':
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        this.tcCommunityGetFeedsRef(currTab);
        break;
      case 'hot':
        console.log(this.state.hothasMore);
        if (this.state.hotisLoading && !this.state.hothasMore) {
          return;
        }
        this.tcCommunityGetFeedsRef(currTab);
        break;
      case 'follow':
        if (this.state.followisLoading && !this.state.followhasMore) {
          return;
        }
        this.tcCommunityGetFeedsRef(currTab);
        break;
      case 'video':
        if (this.state.videoisLoading && !this.state.videohasMore) {
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
    let { isFetching, currTab, _isSwipeable, commentList, indexTab, videoList, hotList, followList, _height, visibleFeedsDrawer, tcDailyTopic, hotAdList, refereeInfoList } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isLogo = false, _isOneself = {};
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');

    if (_getSeuserInfo) {
      _isOneself = JSON.parse(_getSeuserInfo);
      _isLogo = true;
    }

    let _isMob = browserRedirect();
    // let _allList = (currTab == 'video' && videoList.length > 0) ? _allList = videoList : _allList = commentList;

    return (
      <div className="tc-community-home-page">

        <Row className="tc-community-home-tabs-main tc-ch-header-info-row" style={_isMob ? { padding: '5px 8%' } : {}} >
          <Col style={{ textAlign: 'center', fontSize: '22px' }} span={2}  >
            <Icon type="form" onClick={() => this.showFeedsDrawer()} />
          </Col>
          <Col style={{ textAlign: 'center', fontSize: '22px' }} span={2}  >
            <Icon type="search" onClick={() => this.goToSearchFeedsPage('community')} />
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
                src={_isOneself.avatar ? _isOneself.avatar.url : InitData._homeImgPath + '/Home/img/default_avatar.jpg'}
                alt={_isOneself.name}
              />

            </Col>
          }
        </Row>

        <Tabs tabs={[
          { title: <FormattedMessage id="tcCommunityExplore" />, key: 'new' },
          { title: <FormattedMessage id="tcCommunityHotspot" />, key: 'hot' },
          { title: <FormattedMessage id="tcCommunityFollowing" />, key: 'follow' },
          { title: <FormattedMessage id="tcVideos" />, key: 'video' },
        ]}
          initialPage={currTab}
          distanceToChangeTab={0.8}
          useOnPan={false}
          swipeable={_isSwipeable}
          onChange={(tab, index) => { this.handleChangeIndex(index) }}
          onTabClick={(tab, index) => { this.handleChangeIndex(index) }}
        >
          {this.renderContent}
        </Tabs>

        {/* 发布动态框 */}
        <Drawer
          // title="回复框"
          key="tc-community-add-feeds-drawer"
          placement="top"
          height={"auto"}
          closable={false}
          onClose={this.onCloseFeedsDrawer}
          visible={visibleFeedsDrawer}
        >
          <Row>
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('txt') }}><Icon type="edit" theme="twoTone" /> </Row>
            {/* <Divider style={{ margin: '1% 0' }} /> */}
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('picture') }}><Icon type="picture" theme="twoTone" /></Row>
            {/* <Divider style={{ margin: '1% 0' }} /> */}
            <Row className="tc-community-feeds" onClick={() => { this.clickAddFeeds('video') }}><Icon type="video-camera" theme="twoTone" /></Row>
            {/* <Divider style={{ margin: '1% 0' }} /> */}
          </Row>

        </Drawer>

        {/* <Loading loading={isFetching} /> */}
      </div >
    )
  }
}

export default injectIntl(TcCommunityHomePage)
