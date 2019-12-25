import React from 'react'
import ReactDOM from 'react-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Icon, Tooltip, List, Avatar, Divider, message, Drawer, Input, BackTop, Spin, Modal } from 'antd';
import request, { dateFormat, scrollIntoTop, browserRedirect, isURL, transformParas, remove_session_cache, getProductByLang, get_session_cache, deepObjectMerge, getSign, tcReplaceUrl } from '../../../public/common'
import Zmage from 'react-zmage'
import { Player } from 'video-react';
import InfiniteScroll from 'react-infinite-scroller';
import config from '../../../public/config'
import Loading from '../../components/Loading'

import "video-react/dist/video-react.css";
const { TextArea } = Input;
const { confirm } = Modal;
let _pageSize = 20;

class TcCommunityInfoDetailPage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      loading: false,
      hasMore: false,
      _height: document.documentElement.clientHeight * 5 / 6,
      has_like: false,
      has_follow: false,
      visibleCommunityDrawer: false,
      visibleActionDrawer: false,
      isCurrentUser: false,
      repostableInfo: '',
      commentType: 'comment',
      actionTypeDrawer: 'bottom',
      reportTxt: '',
      commentTxt: '',
      commentInfo: {
        userId: '',
        userName: '',
        _type: '',
        _item: {},
      },
      commentInputPr: '',
      commentAddList: [],
      itemdata: {
        "id": 0,
        "user_id": 0,
        "feed_content": "",
        "feed_from": 0,
        "like_count": 0,
        "feed_view_count": 0,
        "feed_comment_count": 0,
        "feed_latitude": "",
        "feed_longtitude": "",
        "feed_geohash": "",
        "audit_status": 0,
        "feed_mark": 0,
        "repostable_type": null,
        "report_info": "0",
        "feed_repost_count": 0,
        "repostable_id": 0,
        "hot": 0,
        "created_at": "2019-11-23 00:13:44",
        "updated_at": "2019-12-04 06:34:31",
        "deleted_at": null,
        "comments": [],
        "has_collect": false,
        "has_like": false,
        "images": [],
        "paid_node": null,
        "video": null,
        "user": {
          "id": 0,
          "name": "",
          "bio": null,
          "sex": 0,
          "location": null,
          "avatar": {
            "url": "",
            "vendor": "",
            "mime": "",
            "size": 0,
          },
          "bg": null,
          "email_verified_at": null,
          "phone_verified_at": null,
          "register_ip": "::1",
          "last_login_ip": "::1",
          "created_at": "2019-10-30 01:54:48",
          "updated_at": "2019-10-30 02:24:33",
          "deleted_at": null,
          "pref_list": null,
          "verified": null,
          "extra": {
            "user_id": 0,
            "likes_count": 0,
            "comments_count": 0,
            "followers_count": 0,
            "followings_count": 0,
            "updated_at": "2019-12-04 05:33:56",
            "feeds_count": 0,
            "questions_count": 0,
            "answers_count": 0,
            "checkin_count": 0,
            "last_checkin_count": 0
          },
          "certification": null
        },
        "topics": []
      },
      likesList: [],
    }

    this.initFun = this.initFun.bind(this)
    this.tcCommunityGetFeeds2 = this.tcCommunityGetFeeds2.bind(this)  // 获取该评论的基本信息
    this.tcCommunityGetFeedsToLikes = this.tcCommunityGetFeedsToLikes.bind(this)  // 获取该评论的点赞人数列表
    this.tcCommunityGetFeedsToComments = this.tcCommunityGetFeedsToComments.bind(this)  // 获取该评论的评论列表
    this.tcCommunityGetFeedsToCommentsRef = this.tcCommunityGetFeedsToCommentsRef.bind(this)  // 获取该评论的评论列表
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
    this.clickLike = this.clickLike.bind(this)
    this.clickUserAvatar = this.clickUserAvatar.bind(this)
    this.clickTopics = this.clickTopics.bind(this)
    this.clickComment = this.clickComment.bind(this)
    this.showActionDrawer = this.showActionDrawer.bind(this)
    this.onCloseActionDrawer = this.onCloseActionDrawer.bind(this)
    this.showCommunityDrawer = this.showCommunityDrawer.bind(this)
    this.onCloseCommunityDrawer = this.onCloseCommunityDrawer.bind(this)
    this.onChangeCommentInput = this.onChangeCommentInput.bind(this)
    this.onSubmitComment = this.onSubmitComment.bind(this)  // 评论
    this.weixinscrollIntoTop = this.weixinscrollIntoTop.bind(this)
    this.onClickCollections = this.onClickCollections.bind(this)  // 收藏
    this.onClickFollow = this.onClickFollow.bind(this)  // 关注
    this.onClickReport = this.onClickReport.bind(this)  // 显示举报
    this.onSubmitReport = this.onSubmitReport.bind(this)  // 举报
    this.onChangeReportInput = this.onChangeReportInput.bind(this)  // 举报
    this.onClickBlock = this.onClickBlock.bind(this)  // 屏蔽
    this.onGoToLikesPage = this.onGoToLikesPage.bind(this)  // 跳转路由喜欢页面
    this.onGetUserInfo = this.onGetUserInfo.bind(this)  //获取用户信息
    this.clickCommentItemLike = this.clickCommentItemLike.bind(this)  //点赞回复列表
    this.clickForward = this.clickForward.bind(this)
    this.clickShareOrDelete = this.clickShareOrDelete.bind(this)
    this.getFeedByRepostableid = this.getFeedByRepostableid.bind(this)
    this.deleteFeeds = this.deleteFeeds.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)
    // this.props.itemdata.has_like && this.setState({ has_like: true });

  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    this.tcCommunityGetFeeds2();
    this.tcCommunityGetFeedsToLikes();
    this.tcCommunityGetFeedsToComments();
  }

  tcCommunityGetFeedsToCommentsRef () {
    let { commentAddList, isFetching } = this.state;
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
    let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}/comments`;
    let _pr = { // 接口参数
      "limit": _pageSize,
      "after": commentAddList.length > 0 ? commentAddList[commentAddList.length - 1].id : '',
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
        let _d = [...commentAddList, ...data.comments];
        this.setState({
          hasMore: data.comments.length >= _pageSize ? true : false,
          loading: false,
          commentAddList: _d
        })
      }).catch(error => {
        this.setState({
          loading: false
        }, () => message.error(error.toString()))
      });

  }
  tcCommunityGetFeedsToComments () {
    this.setState({
      isFetching: true
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
    let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}/comments?limit=${_pageSize}&r=${new Date().getTime()}`;

    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        this.setState({
          isFetching: false,
          hasMore: data.comments.length >= _pageSize ? true : false,
          commentAddList: data.comments
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
  }
  handleInfiniteOnLoad () {
    console.log(this.state.hasMore);
    this.state.hasMore && this.tcCommunityGetFeedsToCommentsRef()
  };
  tcCommunityGetFeedsToLikes () {
    this.setState({
      isFetching: true
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
    let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}/likes?limit=6&r=${new Date().getTime()}`;

    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        this.setState({
          isFetching: false,
          likesList: data
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
  }
  tcCommunityGetFeeds2 () {
    this.setState({
      isFetching: true
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
      "id": this.props.match.params.feedid,
      "r": new Date().getTime()
    };

    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        let _da = data.feeds[0];
        // 判断是否当前登录用户
        var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
        let _isCurr = false;
        if (!sessionStorage.tc_access_token_token && !_getSeuserInfo) {
          _isCurr = false;
        } else {
          let _userInfo = JSON.parse(_getSeuserInfo);
          _userInfo.id == _da.user.id && (_isCurr = true)
        }

        this.setState({
          isFetching: false,
          isCurrentUser: _isCurr,
          has_like: _da.has_like,
          itemdata: _da,
        }, () => {
          this.onGetUserInfo();
          _da.repostable_id != 0 && this.getFeedByRepostableid(_da.repostable_id);
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
  }
  clickUserAvatar (_item) {
    console.log('===clickUserAvatar===', _item);
    this.props.history.push('/userinfo/' + _item.id)
  }

  clickTopics (_item) {
    console.log('===clickTopics===', _item);
    this.props.history.push('/communitytopic/' + _item.id)
  }

  clickForward () {
    console.log('===clickForward===', this.props.itemdata);
    this.props.history.push('/addfeed/repostable/' + this.props.match.params.feedid)
  }

  onGoToLikesPage () {
    console.log('===onGoToLikesPage===', this.props.match.params.feedid);
    this.props.history.push('/communitylikes/feed/' + this.props.match.params.feedid)
  }
  clickComment (_id, _name, _type, _item) {
    console.log('===clickComment===', _id, _name, _type);
    if (!sessionStorage.tc_access_token_token) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    let _isCommentOrDelete = true;
    if (_getSeuserInfo) {
      let _userInfo = JSON.parse(_getSeuserInfo);
      (_userInfo.id == _id && _type == 'lev2') && (_isCommentOrDelete = false);
    }
    this.setState({
      commentType: _isCommentOrDelete ? 'comment' : 'delete',
      commentInfo: {
        userId: _id,
        userName: _type == 'lev2' ? _name : '',
        _type: _type,
        _item: _item,
      },
      commentInputPr: _type == 'lev2' ? this.props.intl.formatMessage({ id: 'tcCommentReply' }) + " : " + _name : this.props.intl.formatMessage({ id: 'tcCommentSaySomething' }),
    }, () => setTimeout(() => { this.showCommunityDrawer() }, 500))
  }

  // 单条 点赞
  clickCommentItemLike (_item) {
    console.log(_item);
    let { commentAddList } = this.state;
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
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (sessionStorage.tc_access_token_token) {
      _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + sessionStorage.tc_access_token_token
      };
    }
    let url = `${config.tcCommunityGetFeeds}/${_item.hasLike == 0 ? 'commentLike' : 'commentLikeCancel'}`;
    fetch(url, {
      method: 'POST',
      body: transformParas({
        "reply_id": _item.id,
        "reply_user": _item.user.id,
      }),
      headers: _headers
    }).then(response => {
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
        let _da = JSON.parse(data);
        if (_da.message == 'success') {
          let _cL = commentAddList;
          _cL.map((_i, _x) => {
            if (_i.id == _item.id) {
              _i.hasLike = _i.hasLike == 0 ? 1 : 0;
              _i.like_count = _i.hasLike == 0 ? parseInt(_i.like_count) - 1 : parseInt(_i.like_count) + 1;
            }
          })
          this.setState({
            isFetching: false,
            commentAddList: _cL
          });
        } else {
          this.setState({
            isFetching: false,
          });
        }

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });


  };
  // 点赞
  clickLike () {
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
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (sessionStorage.tc_access_token_token) {
      _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + sessionStorage.tc_access_token_token
      };
    }
    let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}/${this.state.has_like ? 'unlike' : 'like'}`;
    fetch(url, {
      method: this.state.has_like ? 'DELETE' : 'POST',
      headers: _headers
    }).then(response => {
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
          has_like: !this.state.has_like,
        });
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });


  };

  showActionDrawer (_type) {
    this.setState({
      visibleActionDrawer: true,
      actionTypeDrawer: '_type',
    });
  };

  onCloseActionDrawer () {
    this.setState({
      visibleActionDrawer: false,

    });
  };
  showCommunityDrawer () {
    this.setState({
      visibleCommunityDrawer: true,
    });
  };

  onCloseCommunityDrawer () {
    this.setState({
      visibleCommunityDrawer: false,
    });
  };

  onChangeCommentInput (e) {
    this.setState({
      commentTxt: e.target.value,
    });
  };
  onSubmitComment () {
    let { commentType, commentInfo, commentTxt, commentAddList } = this.state;
    sessionStorage.appVersion &&
      setTimeout(() => {
        scrollIntoTop();
      }, 0)
    // console.log(commentTxt);
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
    let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}/comments`;
    let _options = {
      method: 'POST',
      credentials: 'include',
      headers: _headers
    }
    // 判断:评论or删除
    if (commentType == 'comment') {
      _options.body = transformParas({
        "body": commentTxt,
        "reply_user": commentInfo._type == 'lev1' ? '' : commentInfo.userId,
      });
    } else {
      _options.method = 'DELETE';
      url += '/' + commentInfo._item.id;
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
        let _data = {};
        commentType == 'comment' && (_data = (JSON.parse(data)).comment, _data.hasLike = 0, _data.like_count = 0)
        this.setState({
          isFetching: false,
          visibleCommunityDrawer: false,
          commentTxt: '',
          commentAddList: commentType == 'comment' ?
            [...[_data], ...commentAddList] :
            commentAddList.filter((_i) => _i.id != commentInfo._item.id),
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });

  };
  weixinscrollIntoTop () {
    sessionStorage.appVersion &&
      setTimeout(() => {
        scrollIntoTop();
      }, 0)

  };
  onGetUserInfo () {
    let { itemdata } = this.state;
    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcRegister}/${itemdata.user.id}`;
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
          has_follow: data.follower,
        });

      }).catch(error => {
        console.log('===onGetUserInferror===', error);
      });
  };
  onClickFollow () {
    let { itemdata, has_follow } = this.state;
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
    let url = `${config.tcGetUserInfo}/followings/${itemdata.user.id}`;
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
        // let _da = itemdata;
        // _da.has_collect = !itemdata.has_collect;
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
  onClickCollections () {
    let { itemdata } = this.state;
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
    let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}`;
    let _options = {
      method: 'POST',
      credentials: 'include',
      headers: _headers
    }
    // 判断: 是否收藏
    if (!itemdata.has_collect) {
      url += '/collections';
    } else {
      _options.method = 'DELETE';
      url += '/uncollect';
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
        let _da = itemdata;
        _da.has_collect = !itemdata.has_collect;
        this.setState({
          isFetching: false,
          itemdata: _da,
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });
  };
  onClickReport () {
    let { itemdata } = this.state;
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (!sessionStorage.tc_access_token_token && !_getSeuserInfo) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    let _userInfo = JSON.parse(_getSeuserInfo);
    if (_userInfo.id == itemdata.user.id) {
      this.onCloseActionDrawer();
    } else {
      this.setState({
        actionTypeDrawer: 'report'
      })
    }
  };
  onSubmitReport () {
    let { itemdata, reportTxt } = this.state;
    sessionStorage.appVersion &&
      setTimeout(() => {
        scrollIntoTop();
      }, 0)
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (!sessionStorage.tc_access_token_token && !_getSeuserInfo) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    let _userInfo = JSON.parse(_getSeuserInfo);
    if (_userInfo.id == itemdata.user.id) {
      this.onCloseActionDrawer();
    } else {
      if (reportTxt.trim()) {
        this.setState({
          isFetching: true
        })
        let _headers = {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
        let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}/reports`;
        let _options = {
          method: 'POST',
          credentials: 'include',
          body: transformParas({
            "reason": reportTxt,
          }),
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
            message.success(this.props.intl.formatMessage({ id: 'tcCommentDeleteReportSuccess' }), 5)
            this.setState({
              isFetching: false,
              visibleActionDrawer: false,
              reportTxt: '',
            });

          }).catch(error => {
            this.setState({
              isFetching: false
            }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
          });
      }
    }
  };
  onChangeReportInput (e) {
    this.setState({
      reportTxt: e.target.value,
    });
  };

  onClickBlock () {
    let { itemdata } = this.state;
    if (!sessionStorage.tc_access_token_token) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    console.log('===Block ====', itemdata);
  };

  clickShareOrDelete () {
    console.log('===clickShareOrDelete===', this.state.isCurrentUser);
    let _that = this;
    if (this.state.isCurrentUser) {
      confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          _that.deleteFeeds();
        },
        onCancel () {
        },
      });
    } else {

    }
  }

  getFeedByRepostableid (_id) {
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
      "id": _id,
      "r": new Date().getTime()
    };

    url += `?${transformParas(_pr)}`;
    fetch(url, {
      method: 'get',
      headers: _headers
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {
        this.setState({
          isFetching: false,
          repostableInfo: data.feeds[0],
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
  }

  deleteFeeds () {
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
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (sessionStorage.tc_access_token_token) {
      _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + sessionStorage.tc_access_token_token
      };
    }
    let url = `${config.tcCommunityGetFeeds}/${this.props.match.params.feedid}/currency`;

    fetch(url, {
      method: 'DELETE',
      headers: _headers
    }).then(response => {
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
        }, () => {
          this.props.history.push('/community');
        });
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });


  };

  render () {
    let { isFetching, has_like, has_follow, _height, itemdata, likesList, commentAddList, commentType, actionTypeDrawer, visibleCommunityDrawer, commentInputPr, visibleActionDrawer, isCurrentUser, repostableInfo } = this.state;
    let { InitData, intl } = this.props;
    // console.log('=id===', this.props.match.params.feedid);
    const gutter = 16;
    let _isMob = browserRedirect();
    let _avatarUrl = itemdata.user.avatar ? itemdata.user.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg';
    let _isUrl = isURL(itemdata.feed_content);
    let _imgList = [];
    if (itemdata.images.length > 0) {
      itemdata.images.map((_item, _idx) => {
        let _ig = InitData._tcCommImgPath + _item.file;
        _imgList.push({
          src: _ig,
          alt: _item.mime
        });
      })
    }

    // 屏蔽、举报 
    let _actionDrawerHtml = null;
    switch (actionTypeDrawer) {
      case 'bottom':
        _actionDrawerHtml = <Row>
          <Button style={{ width: '100%', marginBottom: '10px' }} type="primary" onClick={this.onClickReport} ><FormattedMessage id="tcReport" /></Button>
          {/* <Button style={{ width: '100%', color: '#286dad', marginBottom: '10px' }} onClick={this.onClickBlock} ><FormattedMessage id="tcBlock" /></Button> */}
          <Button style={{ width: '100%' }} onClick={this.onCloseActionDrawer} ><FormattedMessage id="tcMessageTitlePaycancel" /></Button>
        </Row>
        break;
      case 'report':
        _actionDrawerHtml = <Row>
          <Row><FormattedMessage id="tcCommentDeleteReportTip1" /><span style={{ color: '#1C1F86' }} onClick={() => { this.clickUserAvatar(itemdata.user) }}>{itemdata.user.name}</span></Row>

          <Row className="tc-cdi-report-row">
            {
              itemdata.images.length > 0 && <img style={{ width: '12%', float: 'left' }} alt="THINKCAR" className="think-car-home-price-img" src={InitData._tcCommImgPath + itemdata.images[0].file} />
            }
            <span className="tc-com-detail-info-report-content" >{itemdata.feed_content}</span>
          </Row>
          <TextArea
            style={{ width: '100%', marginBottom: '10%' }}
            placeholder={this.props.intl.formatMessage({ id: 'tcCommentDeleteReportTip2' })}
            // allowClear
            maxLength='255'
            onChange={this.onChangeReportInput}
            onBlur={this.weixinscrollIntoTop}
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
          <Button style={{ width: '100%', marginBottom: '10%' }} type="primary" onClick={this.onSubmitReport} ><FormattedMessage id="tcReport" /></Button>
        </Row>
        break;
      default:
        _actionDrawerHtml = <Row>
          <Button style={{ width: '100%', marginBottom: '10px' }} type="primary" onClick={this.onClickReport} ><FormattedMessage id="tcReport" /></Button>
          {/* <Button style={{ width: '100%', color: '#286dad', marginBottom: '10px' }} onClick={this.onClickBlock} ><FormattedMessage id="tcBlock" /></Button> */}
          <Button style={{ width: '100%' }} onClick={this.onCloseActionDrawer} ><FormattedMessage id="tcMessageTitlePaycancel" /></Button>
        </Row>
    }


    let _repostableHtml = '';
    if (repostableInfo) {
      _repostableHtml = <span className="tc-repostable-txt" >{repostableInfo.feed_content}</span>;
      repostableInfo.images.length > 0 && (_repostableHtml = <span ><Icon theme="twoTone" type="picture" style={{ padding: '0 2%', verticalAlign: 'middle' }} /><span className="tc-repostable-txt"><FormattedMessage id="tcAddFeedViewPicture" /></span></span>)
      repostableInfo.video && (_repostableHtml = <span ><Icon theme="twoTone" type="play-square" style={{ paddin: '0 2%', verticalAlign: 'middle' }} /><span className="tc-repostable-txt"><FormattedMessage id="tcAddFeedViewVideo" /></span></span>)
    }
    return (
      <div className="tc-community-detail-page tc-community-detail-info-page">
        <Row style={_isMob ? { padding: '0 10%' } : {}}>

          {/* 用户信息 */}
          <Row>
            <Col span={17} className="tc-com-detail-title">
              <Avatar
                style={{ float: 'left', margin: '5px', cursor: 'pointer' }}
                onClick={() => { this.clickUserAvatar(itemdata.user) }}
                src={_avatarUrl}
                alt={itemdata.user.name}
              />
              <p
                style={{ padding: '10px', cursor: 'pointer' }}
                onClick={() => { this.clickUserAvatar(itemdata.user) }}
                className="tc-com-detail-author-name"
              >{itemdata.user.name}</p>

            </Col>
            {
              !isCurrentUser && <Col span={7} style={{ textAlign: 'center', paddingRight: '2%', fontSize: '20px' }}>
                <Icon
                  type="heart" theme={has_follow ? 'filled' : ''}
                  style={{ color: '#286dad', marginRight: '10%' }}
                  onClick={this.onClickFollow}
                />
                <Icon type="ellipsis" onClick={() => { this.showActionDrawer('bottom') }} />
              </Col>
            }


          </Row>

          {/* 内容显示 */}
          <Row style={{ padding: "2%" }}>
            {/* {
              _isUrl ?
                <a href={itemdata.feed_content}><FormattedMessage id="tcViewLinks" /></a> :
                <p className="tc-com-detail-info-content"> {itemdata.feed_content}</p>
            } */}
            <p
              className="tc-com-detail-info-content"
              dangerouslySetInnerHTML={{ __html: tcReplaceUrl(itemdata.feed_content) }}>
            </p>
          </Row>

          {/* 图片显示 */}
          {itemdata.images.length > 0 &&
            <Row className="tc-com-detail-img-main">
              {
                itemdata.images.map((_item, _idx) => {
                  let _ig = InitData._tcCommImgPath + _item.file;
                  return <Zmage
                    key={'tc-com-detail-img' + _item.file + _idx}
                    src={_ig}
                    alt={_item.mime}
                    set={_imgList}
                  />

                })}
            </Row>
          }
          {/* 视频显示 */}
          {itemdata.video &&
            <Row className="tc-com-detail-video-main">
              <Player
                playsInline
                // poster="/assets/poster.png"
                src={itemdata.video.video_id_url}
              />
            </Row>
          }

          {/* 转发内容 */}
          {repostableInfo && <Row className="tc-com-detail-repostable-main" onClick={() => { this.clickDetail(repostableInfo.id) }}>
            <Row className="tc-feed-repostable-row">
              {repostableInfo.user.name + ': '}
              {_repostableHtml}
            </Row>
          </Row>
          }

          {/* 今日话题标示 */}
          {
            itemdata.topics.length > 0 &&
            <Row className="tc-com-detail-topics-main">
              {
                itemdata.topics.map((_item, _idx) => {
                  return <span
                    key={'tc-com-detail-topics' + _item.id + _idx}
                    onClick={() => { this.clickTopics(_item) }}
                    style={{ cursor: 'pointer' }}
                  >{_item.name}</span>
                })}
            </Row>
          }

          <Row className="tc-cdi-fontsize12">{itemdata.created_at}</Row>
          <Row className="tc-cdi-fontsize12"> {itemdata.feed_view_count + ' '}<FormattedMessage id="tcViews" /></Row>

          <Divider style={{ margin: '1% 0' }} />

          {/* 喜欢列表 */}
          <Row className="tc-cdi-likes-main"
            onClick={this.onGoToLikesPage}
            style={{ cursor: 'pointer' }}
          >
            {
              likesList.map((_item, _idx) => {
                let _likesListavatarUrl = _item.user.avatar ? _item.user.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg';
                return <Avatar
                  key={'tc-cdi-likes-' + _item.id}
                  src={_likesListavatarUrl}
                  alt={_item.user.name}
                />
              })
            }
            <span className="tc-cdi-likes-tip">{itemdata.like_count}</span><FormattedMessage id="tcLikes" />

          </Row>
          <Divider style={{ margin: '1% 0' }} />
          {/* 操作：点赞、评论、转发、分享 */}
          <Row className="tc-com-detail-action-main">
            <Col span={5} onClick={this.clickLike} style={{ cursor: 'pointer' }}>
              <Icon style={{ paddingRight: '5%' }} type="like" theme={has_like ? 'twoTone' : ''} />
              <FormattedMessage id="tcLike" />
            </Col>
            <Col span={7} onClick={() => { this.clickComment(itemdata.user.id, '', 'lev1') }} style={{ cursor: 'pointer' }}>
              <Icon style={{ paddingRight: '5%' }} type="message" />
              <FormattedMessage id="tcComment" />
            </Col>
            <Col span={7} onClick={this.clickForward} style={{ cursor: 'pointer' }}>
              <Icon type="diff" style={{ paddingRight: '5%' }} />
              <FormattedMessage id="tcForward" />
            </Col>

            <Col span={5} onClick={this.clickShareOrDelete} style={{ cursor: 'pointer' }}>
              <Icon type={isCurrentUser ? "delete" : "share-alt"} style={{ paddingRight: '5%' }} />
              <FormattedMessage id={isCurrentUser ? "tcDelete" : "tcShare"} />
            </Col>

          </Row>
          <Divider style={{ margin: '1% 0' }} />

          {/* 回复列表 */}
          <Row className="tc-com-detail-comments-title">{itemdata.feed_comment_count + " "}<FormattedMessage id="tcComments" /></Row>
          <Divider style={{ margin: '1% 0' }} />
          {/* <Row className="tc-com-detail-comments-list-main">
            {
              commentAddList.length > 0 &&
              commentAddList.map((_item, _idx) => {
                return <Row
                  key={'tc-com-detail-comments' + _item.id + _idx}
                >
                  <span className="tc-cdclm-name" onClick={() => { this.clickUserAvatar(_item.user) }}>{_item.user.name}</span>
                  {_item.reply && ' @ '}
                  {_item.reply && <span className="tc-cdclm-name" onClick={() => { this.clickUserAvatar(_item.reply) }}>{_item.reply.name}</span>}
                  <span onClick={() => { this.clickComment(_item.user.id, _item.user.name, 'lev2', _item) }} >{': ' + _item.body}</span>
                </Row>
              })
            }

          </Row> */}

          <Row className="tc-com-detail-comments-list-main tc-cdinfo-comment-list-main" id="tc_cdcl_DocID" style={{ height: _height }}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.loading && this.state.hasMore}
              useWindow={false}
            >
              <List
                dataSource={commentAddList}
                renderItem={(_item, _idx) => (
                  <List.Item key={'tc-cdinfo-' + _item.id} className="tc-comm-list-item">
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ cursor: 'pointer' }}
                          onClick={() => { this.clickUserAvatar(_item.user) }}
                          src={_item.user.avatar ? _item.user.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg'}
                        />
                      }
                      title={[
                        <span
                          key={'tc-cdinfo-username-' + _item.id}
                          style={{ float: 'left', cursor: 'pointer' }}
                          onClick={() => { this.clickUserAvatar(_item.user) }}>{_item.user.name}</span>,
                        <span
                          key={'tc-cdinfo-userlike-' + _item.id}
                          className="tc-cdinfo-userlike-class"
                          onClick={() => { this.clickCommentItemLike(_item) }}
                        ><Icon style={{ paddingRight: '1%', cursor: 'pointer' }} type="like" theme={_item.hasLike == 0 ? '' : 'twoTone'} />{' ' + (_item.like_count || 0)}</span>
                      ]}
                      description={
                        <span>
                          {_item.reply && <FormattedMessage id="tcCommentReply" />}
                          {_item.reply && <span className="tc-cdclm-name" onClick={() => { this.clickUserAvatar(_item.reply) }}>{' ' + _item.reply.name + ': '}</span>}
                          <span onClick={() => { this.clickComment(_item.user.id, _item.user.name, 'lev2', _item) }} >{_item.body}</span>
                        </span>}
                    />
                  </List.Item>
                )}
              >
                {this.state.loading && this.state.hasMore && (
                  <div className="tc-community-loading-container">
                    <Spin />
                  </div>
                )}
              </List>
              {/* <BackTop target={() => document.getElementById('tc_cdcl_DocID')} /> */}
            </InfiniteScroll>
          </Row>

        </Row>


        {/* 回复框 */}
        <Drawer
          // title="回复框"
          placement="bottom"
          height={'auto'}
          closable={false}
          onClose={this.onCloseCommunityDrawer}
          visible={visibleCommunityDrawer}
        >
          {
            commentType == 'comment' ? <Row>
              <Input
                style={{ width: '80%' }}
                placeholder={commentInputPr}
                allowClear
                onChange={this.onChangeCommentInput}
                onBlur={this.weixinscrollIntoTop}
              />
              <Button style={{ width: '18%', marginLeft: '2%' }} type="primary" onClick={this.onSubmitComment} ><FormattedMessage id="tcSend" /></Button>
            </Row> :
              <Row>
                <Button style={{ width: '100%', color: '#286dad', marginBottom: '2%' }} onClick={this.onSubmitComment} ><FormattedMessage id="tcCommentDeleteComment" /></Button>
                <Button style={{ width: '100%' }} onClick={this.onCloseCommunityDrawer} ><FormattedMessage id="tcMessageTitlePaycancel" /></Button>
              </Row>
          }


          {/* <p style={{ textAlign: 'center' }}>
            {"weixin:  " + sessionStorage.appVersion}
          </p> */}
        </Drawer>

        {/* 举报、屏蔽 */}
        <Drawer
          title={actionTypeDrawer == 'report' ? <FormattedMessage id="tcReport" /> : ''}
          placement="bottom"
          height={'auto'}
          closable={false}
          onClose={this.onCloseActionDrawer}
          visible={visibleActionDrawer}
        >
          {_actionDrawerHtml}
        </Drawer>

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcCommunityInfoDetailPage)
