import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Row, Col, Icon, Avatar, Divider, message, Drawer, Input, Modal } from 'antd';
import Loadable from '../../components/loadable'
import config from '../../../public/config'
import { dateFormat, isURL, tcShareUrl, browserRedirect, scrollIntoTop, transformParas, get_local_cache, get_session_cache, remove_session_cache, tcReplaceUrl } from '../../../public/common'
import Loading from '../../components/Loading'
// import TcPopUpLayer from '../../components/TcPopUpLayer'
// import TcModalImageRIG from '../../components/TcModalImageRIG'
import { Player } from 'video-react';

const TcPopUpLayer = Loadable(() => import('../../components/TcPopUpLayer'));
const TcModalImageRIG = Loadable(() => import('../../components/TcModalImageRIG'));

import "video-react/dist/video-react.css";
const { confirm } = Modal;

class TcCommunityDetailPage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      isCurrentUser: false,
      has_like: false,
      like_count: 0,
      visibleCommunityDrawer: false,
      commentTxt: '',
      commentInfo: {
        userId: '',
        userName: '',
        _type: '',
        _item: {},
      },
      commentInputPr: '',
      commentAddList: [],
      commentType: 'comment',
      repostableInfo: '',
      imgListIndx: 0,
    }

    this.initFun = this.initFun.bind(this)
    this.clickLike = this.clickLike.bind(this)  // 点赞
    this.clickForward = this.clickForward.bind(this)
    this.clickUserAvatar = this.clickUserAvatar.bind(this)
    this.clickDetail = this.clickDetail.bind(this)
    this.clickTopics = this.clickTopics.bind(this)
    this.clickComment = this.clickComment.bind(this)
    this.showCommunityDrawer = this.showCommunityDrawer.bind(this)
    this.onCloseCommunityDrawer = this.onCloseCommunityDrawer.bind(this)
    this.onChangeCommentInput = this.onChangeCommentInput.bind(this)
    this.onSubmitComment = this.onSubmitComment.bind(this)  // 评论
    this.weixinscrollIntoTop = this.weixinscrollIntoTop.bind(this)
    this.clickShareOrDelete = this.clickShareOrDelete.bind(this)
    this.deleteFeeds = this.deleteFeeds.bind(this)
    this.getFeedByRepostableid = this.getFeedByRepostableid.bind(this)  // 获取转发的动态信息
    this._getPictureList = this._getPictureList.bind(this)
    this.showShareReportImg = this.showShareReportImg.bind(this)
    this.showModalImg = this.showModalImg.bind(this)

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
      if (_userInfo) {
        _userInfo.id == props.itemdata.user.id && (_isCurr = true)
      }

    }
    this.setState({
      isCurrentUser: _isCurr,
      has_like: props.itemdata.has_like,
      like_count: parseInt(props.itemdata.like_count) || 0,
      commentAddList: props.itemdata.comments || [],
    }, () => {
      props.itemdata.repostable_id != 0 && this.getFeedByRepostableid(props.itemdata.repostable_id);
    })
  }

  getFeedByRepostableid (_id) {
    // this.setState({
    //   isFetching: true
    // })
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
  clickUserAvatar (_item) {
    console.log('===clickUserAvatar===', _item);
    this.props.history.push('/userinfo/' + _item.id)
  }
  clickDetail (_item, _anchor) {
    console.log('===clickDetail===', _item);
    let _path = _anchor ? `/communityinfo/${_item}${_anchor}` : `/communityinfo/${_item}`;
    this.props.history.push(_path)
  }
  clickTopics (_item) {
    console.log('===clickTopics===', _item);
    this.props.history.push('/communitytopic/' + _item.id)
  }
  clickForward () {
    console.log('===clickForward===', this.props.itemdata);
    this.props.history.push('/addfeed/repostable/' + this.props.itemdata.id)
  }


  clickComment (_id, _name, _type, _item) {
    console.log('===clickComment===', _id, _name, _type);
    if (!sessionStorage.tc_access_token_token) {
      message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
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

  clickLike () {
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
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (sessionStorage.tc_access_token_token) {
      _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + sessionStorage.tc_access_token_token
      };
    }
    let url = `${config.tcCommunityGetFeeds}/${this.props.itemdata.id}/${this.state.has_like ? 'unlike' : 'like'}`;
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
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
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
          like_count: this.state.has_like ? this.state.like_count - 1 : this.state.like_count + 1,
        });
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });


  };
  deleteFeeds () {
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
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (sessionStorage.tc_access_token_token) {
      _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + sessionStorage.tc_access_token_token
      };
    }
    let url = `${config.tcCommunityGetFeeds}/${this.props.itemdata.id}/currency`;

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
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
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
          this.props.deletefeed(this.props.itemdata.id);
        });
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });


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
      let _type = get_local_cache('tc_community_type');
      // let _shareUrl = this.props.InitData._homeImgPath + '/communityinfo/' + this.props.itemdata.id;
      let _shareUrl = this.props.InitData._appSharePath + tcShareUrl(this.props.itemdata.id);
      if (_type) {
        if (_type == 'iosapp') {
          window.webkit.messageHandlers.sendParamsToAPP.postMessage({ body: _shareUrl });
        } else if (_type == 'androidapp') {
          appJavaScriptObject.getJavaScriptParams(_shareUrl);
        }
      } else {
        // message.destroy()
        message.warning(this.props.intl.formatMessage({ id: 'tc12' }))
      }
    }
  }

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
    let url = `${config.tcCommunityGetFeeds}/${this.props.itemdata.id}/comments`;
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
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
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
          visibleCommunityDrawer: false,
          commentTxt: '',
          commentAddList: commentType == 'comment' ?
            [...[(JSON.parse(data)).comment], ...commentAddList] :
            commentAddList.filter((_i) => _i.id != commentInfo._item.id),
        });

      }).catch(error => {
        console.log();
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });

  };
  weixinscrollIntoTop () {
    sessionStorage.appVersion &&
      setTimeout(() => {
        scrollIntoTop();
      }, 0)

  };

  _getPictureList () {
    let { itemdata, InitData } = this.props;
    if (itemdata.images.length < 0) return;

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

    let _html = '', _itemImgList = itemdata.images;
    if (_itemImgList.length > 4) {
      _html = <Row className="tc-com-detail-img-main" gutter={2} >
        {
          itemdata.images.map((_item, _idx) => {
            // let _ig = InitData._tcCommImgPath + _item.file + "?r=" + new Date().getTime();
            return <Col span={6} key={'tc-com-detail-img' + _item.file + _idx} style={{ paddingBottom: '3px' }}>
              <img
                alt={"img"}
                className='think-car-home-price-img'
                src={_item.filename}
                onClick={() => {
                  this.setState({ imgListIndx: _idx }, () => {
                    this.showModalImg();
                  })
                }}
              />
            </Col>
          })}
      </Row>
    } else {
      _html = <Row className="tc-com-detail-img-main">
        {
          itemdata.images.map((_item, _idx) => {
            // let _ig = InitData._tcCommImgPath + _item.file + "?r=" + new Date().getTime();

            return <img
              key={'tc-com-detail-img' + _item.file + _idx}
              alt={"img"}
              className='think-car-home-price-img'
              src={_item.filename}
              onClick={() => {
                this.setState({ imgListIndx: _idx }, () => {
                  this.showModalImg();
                })
              }}
            />
          })}
      </Row>
    }

    return _html;

  }

  showShareReportImg () {
    console.log('===showShareReportImg==');
    this.refs.tcPopUpLayer.showModal()
  }
  showModalImg () {
    console.log('===showModalImg==');
    this.refs.tcModalImageRIG.showModal();
    this.refs.tcModalImageRIG.carouselGoto(this.state.imgListIndx);
    this.props.swipeablechange(false);

  }
  render () {
    let { isFetching, has_like, visibleCommunityDrawer, commentInputPr, commentAddList, commentType, isCurrentUser, repostableInfo, like_count } = this.state;
    let { InitData, intl, itemdata } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    let _avatarUrl = itemdata.user.avatar ? itemdata.user.avatar.url : InitData._homeImgPath + '/Home/img/default_avatar.jpg';
    // let _isUrl = isURL(itemdata.feed_content);


    let _repostableHtml = '';
    if (repostableInfo) {
      _repostableHtml = <span className="tc-repostable-txt" >{repostableInfo.feed_content}</span>;
      repostableInfo.images.length > 0 && (_repostableHtml = <span ><Icon theme="twoTone" type="picture" style={{ padding: '0 2%', verticalAlign: 'middle' }} /><span className="tc-repostable-txt"><FormattedMessage id="tcAddFeedViewPicture" /></span></span>)
      repostableInfo.video && (_repostableHtml = <span ><Icon theme="twoTone" type="play-square" style={{ paddin: '0 2%', verticalAlign: 'middle' }} /><span className="tc-repostable-txt"><FormattedMessage id="tcAddFeedViewVideo" /></span></span>)
    }
    let _imgListRIG = [];
    itemdata.images.map((_im) => {
      // let _ig = InitData._tcCommImgPath + _im.file;
      _imgListRIG.push({ "id": _im.file, "url": _im.filename })
    })

    // 处理 是否 http://aws.ithinkcar.com/Home/Index/shareReport 加入iframe 显示
    let _isShareReport = '';
    if (itemdata.feed_content) {
      if (itemdata.feed_content.indexOf('http://aws.ithinkcar.com') != -1 ||
        itemdata.feed_content.indexOf('https://aws.ithinkcar.com') != -1) {
        var re = /(https?:\/\/|ftps?:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:[0-9]+)?|(localhost)(:[0-9]+)?|([\w]+\.)(\S+)(\w{2,4})(:[0-9]+)?)(\/?([\w#!:.?+=&%@!\-\/]+))?/ig;
        itemdata.feed_content.replace(re, function (a) {
          _isShareReport = a;
        });
      }
    }

    return (
      <div className="tc-community-detail-page">
        <Row>

          {/* 用户信息 */}
          <Row>

            <Col span={19} className="tc-com-detail-title">
              <Avatar
                style={{ float: 'left', margin: '5px', cursor: 'pointer' }}
                onClick={() => { this.clickUserAvatar(itemdata.user) }}
                src={_avatarUrl}
                alt={itemdata.user.name}
              />
              <p className="tc-com-detail-author-name">{itemdata.user.name}</p>
              <p>{dateFormat("mm-dd", new Date(itemdata.created_at.replace(/\-/g, "/")))}</p>
            </Col>
            {/* <Col span={3} style={{ textAlign: 'center', paddingTop: '1%' }}>
              <Avatar
                onClick={() => { this.clickUserAvatar(itemdata.user) }}
                src={_avatarUrl}
                alt={itemdata.user.name}
              />
            </Col>
            <Col span={16} className="tc-com-detail-title">
              <p className="tc-com-detail-author-name">{itemdata.user.name}</p>
              <p>{dateFormat("mm-dd", new Date(itemdata.created_at.replace(/\-/g, "/")))}</p>
            </Col> */}
            <Col span={5} style={{ textAlign: 'right', paddingRight: '2%' }}>
              {
                itemdata.pinned && <span className="tc-cd-hava-pinned"><FormattedMessage id="tcCommunityDeatilTipe1" /></span>
              }
            </Col>

          </Row>

          {/* 内容显示 */}
          <Row style={{ padding: "2%", cursor: 'pointer' }} onClick={() => { this.clickDetail(itemdata.id) }}>
            {/* {
              _isUrl ?
                <a href={itemdata.feed_content}><FormattedMessage id="tcViewLinks" /></a> :
                <p onClick={() => { this.clickDetail(itemdata.id) }} className="tc-com-detail-content"> {itemdata.feed_content}</p>
            } */}
            {/* <p onClick={() => { this.clickDetail(itemdata.id) }} className="tc-com-detail-content"> {tcReplaceUrl(itemdata.feed_content)}</p> */}
            <p dangerouslySetInnerHTML={{ __html: tcReplaceUrl(itemdata.feed_content) }} className="tc-com-detail-content"></p>
          </Row>
          {
            _isShareReport != '' && <Row>
              <iframe
                className="tc-mobile-ShareReport-iframe"
                src={_isShareReport}
                width="100%"
                style={{ height: '300px' }}
                frameBorder="0"
                scrolling="auto"
              ></iframe>
              <Row onClick={this.showShareReportImg} style={{
                height: '300px', width: '100%', position: 'absolute',
                top: '0'
              }}></Row>
            </Row>
          }
          {/* 图片显示 */}
          {itemdata.images.length > 0 && this._getPictureList()
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
          {repostableInfo && <Row className="tc-com-detail-repostable-main" onClick={() => { this.clickDetail(repostableInfo.id) }} style={{ cursor: 'pointer' }} >
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
          <Divider style={{ margin: '1% 0' }} />

          {/* 点赞数、评论数量、转发数量、浏览数量 */}
          <Row className="tc-com-detail-feed-main">
            {like_count}<FormattedMessage id="tcLikes" /> ·
            {' ' + itemdata.feed_comment_count}<FormattedMessage id="tcComments" /> ·
            {' ' + itemdata.feed_repost_count}<FormattedMessage id="tcForwards" /> ·
            {' ' + itemdata.feed_view_count}<FormattedMessage id="tcViews" />
          </Row>

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
            <Col span={7} onClick={this.clickForward} style={{ cursor: 'pointer' }} >
              <Icon type="diff" style={{ paddingRight: '5%' }} />
              <FormattedMessage id="tcForward" />
            </Col>

            <Col span={5} onClick={this.clickShareOrDelete} style={{ cursor: 'pointer' }} >
              <Icon type={isCurrentUser ? "delete" : "share-alt"} style={{ paddingRight: '5%' }} />
              <FormattedMessage id={isCurrentUser ? "tcDelete" : "tcShare"} />
            </Col>
          </Row>
          <Divider style={{ margin: '1% 0' }} />

          {/* 回复列表 */}
          <Row className="tc-com-detail-comments-list-main">
            {
              commentAddList.length > 0 &&
              commentAddList.map((_item, _idx) => {
                return <Row
                  key={'tc-com-detail-comments-commentAddList' + _item.id + _idx}
                >
                  <span className="tc-cdclm-name" onClick={() => { this.clickUserAvatar(_item.user) }}>{_item.user.name}</span>
                  {_item.reply && ' @ '}
                  {_item.reply && <span className="tc-cdclm-name" onClick={() => { this.clickUserAvatar(_item.reply) }}>{_item.reply.name}</span>}
                  <span onClick={() => { this.clickComment(_item.user.id, _item.user.name, 'lev2', _item) }} >{': ' + _item.body}</span>
                </Row>
              })
            }
            {/* {
              itemdata.comments.length > 0 &&
              itemdata.comments.map((_item, _idx) => {
                return <Row
                  key={'tc-com-detail-comments' + _item.id + _idx}
                >
                  <span className="tc-cdclm-name" onClick={() => { this.clickUserAvatar(_item.user) }}>{_item.user.name}</span>
                  {_item.reply && ' @ '}
                  {_item.reply && <span className="tc-cdclm-name" onClick={() => { this.clickUserAvatar(_item.reply) }}>{_item.reply.name}</span>}
                  <span onClick={() => { this.clickComment(_item.user.id, _item.user.name, 'lev2', _item) }} >{': ' + _item.body}</span>
                </Row>
              })
            } */}
            {
              itemdata.feed_comment_count > 5 &&
              <Row onClick={() => { this.clickDetail(itemdata.id, "#tc_cdcl_DocID") }} className="tc-cdclm-feed_comment_count">
                <FormattedMessage id="tcCommunityDeatilTipe2" />
                {itemdata.feed_comment_count}
                <FormattedMessage id="tcCommunityDeatilTipe3" />
              </Row>
            }
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
                <Button style={{ width: '100%' }} onClick={this.onCloseCommunityDrawer} ><FormattedMessage id="tc5" /></Button>
              </Row>
          }


          {/* <p style={{ textAlign: 'center' }}>
            {"weixin:  " + sessionStorage.appVersion}
          </p> */}
        </Drawer>

        <TcModalImageRIG
          ref="tcModalImageRIG"
          tcimglist={_imgListRIG}
          tctitle={''}
          tcstyle={{ height: '500px', width: "100%" }}
          swipeablechange={this.props.swipeablechange}
        // tcmheight={'70%'}
        />
        <TcPopUpLayer ref="tcPopUpLayer" tcpath={_isShareReport} tctitle={''} tcstyle={{ height: '500px' }} />
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcCommunityDetailPage)
