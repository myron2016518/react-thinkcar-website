import React from 'react'
import ReactDOM from 'react-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, message, Divider, Drawer, Input, Icon, List, BackTop, Avatar, Upload, Modal } from 'antd';
import config from '../../../public/config'
import request, { transformParas, get_session_cache, browserRedirect, remove_session_cache, deepObjectMerge, getSign } from '../../../public/common'
import Loading from '../../components/Loading'

const { TextArea, Search } = Input;
const _pageSize = 200;

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class TcCommunityAddFeeds extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      visibleFriendsDrawer: false,
      tcFeedFriendsList: [],
      feedInputTxt: 'nice thinkcar',
      searchfeedInputTxt: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      feedInfo: {
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
    }

    this.initFun = this.initFun.bind(this)
    this.showFriendsDrawer = this.showFriendsDrawer.bind(this)
    this.onCloseFriendsDrawer = this.onCloseFriendsDrawer.bind(this)
    this.saveFeeds = this.saveFeeds.bind(this)  // 发布动态
    this.tcFeedGetFriends = this.tcFeedGetFriends.bind(this)  // 列出用户授权用户正在关注的人
    this.clickFriendItem = this.clickFriendItem.bind(this)  // 点击选择朋友
    this.feedAddInputChange = this.feedAddInputChange.bind(this)
    this.clickSearchFriend = this.clickSearchFriend.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
    this.tcGetFeedInfo = this.tcGetFeedInfo.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (!sessionStorage.tc_access_token_token || !_getSeuserInfo) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
    } else {
      this.tcFeedGetFriends('');
      // repostable : 转发 。 txt、picture、video：普通动态的发布。 topicstxt、topicspicture、topicsvideo：某个话题下的动态的发布。 
      this.props.match.params.type == 'repostable' && this.tcGetFeedInfo(this.props.match.params.id);
    }
  }

  tcFeedGetFriends (_searchTxt) {
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
    let url = `${config.tcGetUserInfo}/${_searchTxt == "" ? 'followings' : 'search'}`;
    let _pr = { // 接口参数
      "limit": _pageSize,
      "keyword": _searchTxt || '',
      "r": new Date().getTime()
    };
    url += `?${transformParas(_pr)}`;

    fetch(url, {
      method: 'get',
      credentials: 'include',
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
          tcFeedFriendsList: JSON.parse(data),
        });
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });


  };

  saveFeeds () {

    const { feedInputTxt, fileList } = this.state;
    let _ptype = this.props.match.params.type;
    if (feedInputTxt.trim() == "") return;

    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (_getSeuserInfo) {
      _getSeuserInfo = JSON.parse(_getSeuserInfo);
    }

    let _daModel = {
      "feed_content": "内容",
      "feed_from": "5",
      "feed_mark": "xxxxx1",
      "images": [
        {
          "id": 1
        },
        {
          "id": 1,
          "amount": 100,
          "type": "read"
        }
      ],
      "feed_latitude": "12.32132123",
      "feed_longtitude": "32.33332123",
      "feed_geohash": "GdUDHyfghjd==",
      "amount": 450,
      "topics": [1, 2, 3]
    }
    let _da = {
      "feed_content": feedInputTxt || "",
      "feed_from": "5",
      "feed_mark": new Date().getTime().toString().substr(0, 11) + '' + _getSeuserInfo.id,
      // "video": { "video_id": '', "cover_id": '' }
    }

    if (_ptype == 'picture' || _ptype == 'topicspicture') {    // 普通图片
      let _imgList = [];
      fileList.map((_item, _idx) => {
        _item.status == 'done' && (_da['images[' + _idx + '][id]'] = _item.response.id)
      })

    } else if (_ptype == 'repostable') {  //转发
      _da.repostable_id = this.props.match.params.id;
      _da.repostable_type = 'feeds';
    } else if (_ptype == 'video' || _ptype == 'topicsvideo') {
      _da["video[video_id]"] = fileList[0].response.id;
      _da["video[cover_id]"] = fileList[0].response.id;
    }
    console.log('=====save====', _ptype, this.props.match.params.id, feedInputTxt, _getSeuserInfo);
    console.log('=====_da====', _da);
    console.log('=====fileList====', fileList);

    // 判断是否每日话题，并加上指定字段标示
    if (_ptype == 'topicspicture' || _ptype == 'topicsvideo' || _ptype == 'topicstxt') {
      _da["topics[0]"] = this.props.match.params.id;
    }

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
    let url = `${config.tcCommunityGetFeeds}`;

    fetch(url, {
      method: 'POST',
      body: transformParas(_da),
      // credentials: 'include',
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
        return response.json();  // 先将结果转换为 JSON 对象
      }
    })
      .then(data => {
        this.setState({
          isFetching: false,
        });
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });
  };

  showFriendsDrawer () {
    this.setState({
      visibleFriendsDrawer: true,
    });
  };

  onCloseFriendsDrawer () {
    this.setState({
      visibleFriendsDrawer: false,
    });
  };
  clickFriendItem (_item) {
    let _txt = this.state.feedInputTxt;
    _txt = _txt + " @" + _item.name + " ";
    this.setState({ feedInputTxt: _txt, visibleFriendsDrawer: false })
  };
  feedAddInputChange (e) {
    this.setState({ feedInputTxt: e.target.value })
  };
  clickSearchFriend (_val) {
    let _v = _val.trim();
    if (_v == '') {
      this.setState({ searchfeedInputTxt: _v, tcFeedFriendsList: [] }, () => { this.tcFeedGetFriends(''); })
    } else {
      this.setState({ searchfeedInputTxt: _v, tcFeedFriendsList: [] }, () => { this.tcFeedGetFriends(_val); })
    }
    console.log('===clickSearchFriend===', _val);

  };

  handleCancel () {
    this.setState({ previewVisible: false });
  }

  async handlePreview (file) {
    console.log('===handlePreview===', file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange ({ fileList }) {
    this.setState({ fileList });
  }

  beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    // return isJpgOrPng && isLt2M;
    return isJpgOrPng;
  }


  tcGetFeedInfo (_feedid) {
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
      "id": _feedid,
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
          feedInfo: data.feeds[0],
        })
      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(error.toString()))
      });
  }

  render () {
    let { isFetching, visibleFriendsDrawer, tcFeedFriendsList, feedInputTxt, searchfeedInputTxt, previewVisible, previewImage, fileList, feedInfo } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    // var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    // let _isOneself = {};
    // if (_getSeuserInfo) {
    //   _isOneself = JSON.parse(_getSeuserInfo);
    // }

    let _friends = [];
    if (tcFeedFriendsList.length && searchfeedInputTxt == "") {
      _friends = tcFeedFriendsList.filter((_item) => _item.follower && _item.following)
    } else {
      _friends = tcFeedFriendsList;
    }

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text"><FormattedMessage id="tcUpload" /></div>
      </div>
    );

    let _repostableHtml = '';
    if (this.props.match.params.type == 'repostable') {
      _repostableHtml = feedInfo.feed_content;
      feedInfo.images.length > 0 && (_repostableHtml = <span ><Icon type="picture" style={{ paddingRight: '2%', verticalAlign: 'middle' }} /><span style={{ fontSize: '12px' }}><FormattedMessage id="tcAddFeedViewPicture" /></span></span>)
      feedInfo.video && (_repostableHtml = <span ><Icon type="play-square" style={{ paddingRight: '2%', verticalAlign: 'middle' }} /><span style={{ fontSize: '12px' }}><FormattedMessage id="tcAddFeedViewVideo" /></span></span>)
    }

    return (
      <div className="tc-community-add-feed-home-page" style={_isMob ? { padding: '0% 25%' } : {}}>
        <Row className="tc-community-add-feed-home-content" >
          <h1><FormattedMessage id="tcFeedCommunityTitle" /></h1>
          <Row>
            <TextArea
              placeholder={this.props.intl.formatMessage({ id: 'tcFeedCommunityInputPr' })}
              autoSize={{ minRows: 5, maxRows: 8 }}
              value={feedInputTxt}
              onChange={this.feedAddInputChange}
            />
          </Row>
          {
            (this.props.match.params.type == 'picture' || this.props.match.params.type == 'topicspicture') && <Row style={{ padding: '2% 0' }}>
              <Upload
                accept={InitData._uploadType.img}
                listType="picture-card"
                action={config.tcFiles}
                fileList={fileList}
                onPreview={this.handlePreview}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                headers={{
                  // 'Content-type': 'multipart/form-data',
                  "Authorization": 'Bearer' + sessionStorage.tc_access_token_token
                }}
                showUploadList={{ 'showPreviewIcon': true, 'showRemoveIcon': true, 'showDownloadIcon': false }}
              >
                {fileList.length >= 15 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Row>
          }
          {
            (this.props.match.params.type == 'video' || this.props.match.params.type == 'topicsvideo') && <Row style={{ padding: '2% 0' }}>
              <Upload
                accept={InitData._uploadType.video}
                listType="picture"
                action={config.tcFiles}
                fileList={fileList}
                // onPreview={this.handlePreview}
                // beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                headers={{
                  // 'Content-type': 'multipart/form-data',
                  "Authorization": 'Bearer' + sessionStorage.tc_access_token_token
                }}
                showUploadList={{ 'showPreviewIcon': true, 'showRemoveIcon': true, 'showDownloadIcon': false }}
              >
                {fileList.length >= 1 ? null : <Button> <Icon type="upload" /> <FormattedMessage id="tcUpload" /> </Button>}

              </Upload>
              {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal> */}
            </Row>
          }
          {
            this.props.match.params.type == 'repostable' && <Row className="tc-feed-repostable-row" >
              <Row>{feedInfo.user.name}</Row>
              <Row className="tc-feed-repostable-content" >{_repostableHtml}</Row>
            </Row>
          }
          <Divider />
          <Row className="tc-feed-btn-row" onClick={this.showFriendsDrawer}>
            <Col span={20}>@<FormattedMessage id="tcFeedFriends" /></Col>
            <Col span={4} style={{ textAlign: 'right' }}><Icon type="right" /></Col>
          </Row>
          <Divider />
          <Row className="tc-feed-btn-row">
            <Button className="tc-feed-btn-save" type="primary" onClick={this.saveFeeds} ><FormattedMessage id="tcDone" /></Button>
          </Row>
        </Row>

        {/* @人 弹出框*/}
        <Drawer
          // title="回复框"
          className="tc-feed-friends-drawer"
          key="tc-community-add-feeds-friends-drawer"
          placement="bottom"
          height={'80%'}
          bodyStyle={{ height: '100%', overflow: 'hidden' }}
          // closable={false}
          onClose={this.onCloseFriendsDrawer}
          visible={visibleFriendsDrawer}
        >
          <Row className="tc-caffd-main" style={_isMob ? { padding: '0% 25%' } : {}}>
            <Row className="tc-caffd-search">
              <Search placeholder="input search text" onSearch={value => { this.clickSearchFriend(value) }} enterButton />
            </Row>
            <Row className="tc-community-feed-friend-content" id="tc_community_feed_friend_handelDocID" >
              <List
                dataSource={_friends}
                renderItem={item => (
                  <List.Item key={'tc-feed-friends-key-' + item.id} className="tc-comm-list-item" onClick={() => { this.clickFriendItem(item) }} >

                    <Col span={3} style={{ textAlign: 'center', paddingTop: '1%' }} >
                      <Avatar
                        src={item.avatar ? item.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg'}
                        alt={item.name}
                      />
                    </Col>
                    <Col span={15} className="tc-com-detail-title">
                      <p className="tc-com-detail-author-name">{item.name}</p>
                      <p>{item.bio ? item.bio : this.props.intl.formatMessage({ id: 'tcNoSomething' })}</p>
                    </Col>

                  </List.Item>
                )}
              >

              </List>
              <BackTop target={() => document.getElementById('tc_community_feed_friend_handelDocID')} />
            </Row>

          </Row>

        </Drawer>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(TcCommunityAddFeeds)
