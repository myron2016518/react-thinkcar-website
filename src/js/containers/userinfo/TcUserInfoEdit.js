import React from 'react'
import { Link } from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import 'es6-promise';//fetch是基于Promise来实现的，所以还需要Promise的polyfillpromise的polyfill
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Icon, Input, Button, Drawer, message, Select, Row, Avatar, Radio, Tag, Upload, Divider, Col } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../../public/config'
import request, { get_session_cache, set_session_cache, md5, browserRedirect, getHeadersAuthorization, remove_session_cache, getSign, transformParas, deepObjectMerge } from '../../../public/common'
import Loading from '../../components/Loading'

const { TextArea } = Input;

const Option = Select.Option;
class TcUserInfoEditForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      loading: false,
      imageUrl: '',
      imageNode: '',
      visibleCityDrawer: false,
      selectedTags: [],
      userInfo: {
        'location': ''
      },
      regionData: [ // 国家 州 级联数据
        {
          "id": 233, "name": "United States",
          "stateList": [
            { "id": "1398", "name": "Howland Island", "country_id": "233", "country_code": "US" },
            { "id": "1399", "name": "Delaware", "country_id": "233", "country_code": "US" }
          ]
        }

      ],
      stateRegionList: [], // 选择国家后 获取的 州 数据
      selectRegion: '',
      selectState: '',
      inputCity: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)//点击登录
    this.editUserInfo = this.editUserInfo.bind(this)//请求登录
    this.onGetUserInfo = this.onGetUserInfo.bind(this)
    this.initFun = this.initFun.bind(this)
    this.goToUserTagPath = this.goToUserTagPath.bind(this)
    this.showCityDrawer = this.showCityDrawer.bind(this)
    this.closeCityDrawer = this.closeCityDrawer.bind(this)
    this.getCurrentUserTags = this.getCurrentUserTags.bind(this)
    this.handleProvinceChange = this.handleProvinceChange.bind(this)
    this.selectStateRegionChange = this.selectStateRegionChange.bind(this)
    this.getAreaList = this.getAreaList.bind(this)//获取国家信息
    this.onChangeInputCity = this.onChangeInputCity.bind(this)
    this.saveChooseCity = this.saveChooseCity.bind(this)
    this.getBase64 = this.getBase64.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getUploadData = this.getUploadData.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)
  }

  initFun (props) {
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (!sessionStorage.tc_access_token_token || !_getSeuserInfo) {
      message.error(this.props.intl.formatMessage({ id: 'tcLoginAgain' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
    } else {
      this.onGetUserInfo();
      this.getCurrentUserTags();
      this.getAreaList(props);
    }

  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.editUserInfo().then(data => {
          // console.log(data);
          // if (data) {
          //   // this.props.history.push('/')

          // }
        })
      }
    });
  }
  editUserInfo () {
    const { getFieldValue } = this.props.form;
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
    let url = `${config.tcGetUserInfo}?r=${new Date().getTime()}`;
    fetch(url, {
      method: 'PATCH',
      body: transformParas({
        name: getFieldValue('username'),
        bio: getFieldValue('userintro'),
        sex: getFieldValue('usergender'),
        location: this.state.userInfo.location,
        // avatar: this.state.imageNode
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
        this.setState({
          isFetching: false,
        }, () => {
          message.success(this.props.intl.formatMessage({ id: 'tcForgotPasswordSuccess' }))
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });

  }

  onGetUserInfo () {
    const { form, InitData } = this.props;
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
    let _headers = getHeadersAuthorization();
    let url = `${config.tcGetUserInfo}?r=${new Date().getTime()}`;
    let _options = {
      method: 'GET',
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
        let _data = JSON.parse(data);
        console.log('eeeee');
        this.setState({
          isFetching: false,
          userInfo: _data,
          imageUrl: _data.avatar != null ? _data.avatar.url : InitData._homeImgPath + 'Home/img/default_avatar.jpg',
        }, () => {
          form.setFieldsValue({
            'username': _data.name,
            'usergender': _data.sex + '',
            'userintro': _data.bio,
          });

        });

      }).catch(error => {
        console.log('eeeee');
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });
  };

  getCurrentUserTags () {
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
    let _headers = getHeadersAuthorization();
    let url = `${config.tcGetUserInfo}/tags?r=${new Date().getTime()}`;
    let _options = {
      method: 'GET',
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
          selectedTags: JSON.parse(data),
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
      });
  };

  goToUserTagPath () {
    this.props.history.push('/usertags')
  }
  showCityDrawer () {
    this.setState({
      visibleCityDrawer: true
    });
  }
  closeCityDrawer () {
    this.setState({
      visibleCityDrawer: false
    });
  }
  selectStateRegionChange (value) {
    this.setState({
      selectRegion: value
    });
  }

  handleProvinceChange (value) {
    const { intl: { formatMessage } } = this.props;
    var _find = this.state.regionData.find(_item => _item.id == value) || null;
    // var _l = _find.stateList || [];

    var _url = config.getStateList + '?r=' + new Date().getTime();
    var _pr = { // 接口参数
      "lang": this.props.intl.locale,
      "cid": value
    };
    this.setState({
      isFetching: true
    });
    let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    return request(_url, {
      method: 'POST',
      body: _param,
    })
      .then(data => {
        if (data.code == 0) {
          this.setState({
            isFetching: false,

          });
          var _l = data.data || [];
          this.setState({
            stateRegionList: _l,
            selectState: _find.name,
            selectRegion: '',
          });
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
      });

  };

  getAreaList (_pr) {
    var _url = config.getCountryList + '?r=' + new Date().getTime();
    var _pr = { // 接口参数
      "lang": _pr.intl.locale,
    };
    this.setState({
      isFetching: true
    });
    let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    return request(_url, {
      method: 'POST',
      body: _param,
    })
      .then(data => {
        if (data.code == 0) {
          this.setState({
            isFetching: false,
            regionData: data.data
          });
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
      });
  }
  onChangeInputCity (e) {
    this.setState({
      inputCity: e.target.value,
    });
  };
  saveChooseCity () {
    let { inputCity, selectRegion, selectState, userInfo } = this.state;
    let _us = userInfo;
    _us.location = `${inputCity} ${selectRegion} ${selectState}`;
    this.setState({
      userInfo: _us,
      visibleCityDrawer: false
    })

  };


  getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload (file) {
    console.log('==beforeUpload===', file);
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

  handleChange (info) {
    console.log('==handleChange===', info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

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
      let _headers = getHeadersAuthorization();
      let _urlTxt = info.file.response.uri, _sub = 'storage/public';
      let _urlindex = _urlTxt.lastIndexOf(_sub)
      _urlTxt = _urlTxt.substring(_urlindex + _sub.length, _urlTxt.length);
      let url = config.tcFilesStorage + _urlTxt;

      let _d = new FormData();
      _d.append('file', info.file.originFileObj);
      _d.append('filename', info.file.name);
      _d.append('Hash', info.file.response.headers['x-plus-storage-hash']);
      _d.append('size', info.file.response.headers['x-plus-storage-size']);
      _d.append('mime_type', info.file.response.headers['x-plus-storage-mime-type']);
      _d.append('storage[channel]', 'public');
      // _headers['Content-type'] = 'multipart/form-data;'
      // _headers.Accept = '*/*'
      _headers['Content-Disposition'] = "attachment;filename=" + info.file.name;
      _headers['Content-Md5'] = info.file.response.headers['x-plus-storage-hash'];
      _headers['Content-Length'] = info.file.response.headers['x-plus-storage-size'];
      // _headers['Content-Type'] = info.file.response.headers['x-plus-storage-mime-type'];
      let _options = {
        method: info.file.response.method || 'POST',
        credentials: 'include',
        headers: _headers,
        body: _d,
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
          let _data = JSON.parse(data);
          console.log('eeeee', data);
          this.getBase64(info.file.originFileObj, imageUrl => {
            this.setState({
              imageUrl,
              imageNode: info.file.response.node || '',
              loading: false,
            })
          });

        }).catch(error => {
          this.setState({
            isFetching: false
          }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
        });

    }
  };

  getUploadData (file) {
    console.log('==getUploadData===', file);
    // let _d = new FormData();
    // _d.append('filename', file.name);
    // _d.append('hash', md5(file));
    // _d.append('size', file.size);
    // _d.append('mime_type', file.type);
    // _d.append('storage[channel]', 'public');
    // return _d;
    return {
      "filename": file.name,
      "hash": md5(file),
      "size": file.size,
      "mime_type": file.type,
      "storage[channel]": "public",
    };
  };

  render () {
    let { isFetching, imageUrl, userInfo, selectedTags, visibleCityDrawer, regionData, stateRegionList, selectRegion } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { intl: { formatMessage } } = this.props;
    let _isMob = browserRedirect();
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text"><FormattedMessage id="tcUpload" /></div>
      </div>
    );
    return (
      <div className="tc-useredit-page" style={_isMob ? { padding: '0% 25%' } : {}} >

        <div className="tc-useredit-form">
          <Row className="tc-useredit-form-title"><FormattedMessage id="tcUserInfoEditTitle" /></Row>
          <Row className="tc-useredit-form-avatar">
            <Col span={8} style={{ padding: '0 6%' }}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="tc-user-avatar-uploader"
                showUploadList={false}
                // headers={getHeadersAuthorization()}
                headers={{
                  // 'Content-type': 'multipart/form-data',
                  "Authorization": 'Bearer' + sessionStorage.tc_access_token_token
                }}
                data={this.getUploadData}
                action={config.tcStorages}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Col>
            <Col span={16} style={{ lineHeight: '65px', color: '#ccc' }}><FormattedMessage id="tcUserChangeprofilephoto" /></Col>
          </Row>
          <Divider style={{ margin: '0% 0% 4% 0%' }} />
          <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label={this.props.intl.formatMessage({ id: 'tcUserName' })}>
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [{ required: true, message: <FormattedMessage id="tcUserNameInputTip" /> }],
              })(
                <Input allowClear placeholder={this.props.intl.formatMessage({ id: 'tcUserNamePr' })} />
              )}
            </Form.Item>
            <Form.Item label={this.props.intl.formatMessage({ id: 'tcGender' })}>
              {getFieldDecorator('usergender', {
                initialValue: '',
                rules: [{ required: false }],
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio value="1"><FormattedMessage id="tcMale" /></Radio>
                  <Radio value="2"><FormattedMessage id="tcFeMale" /></Radio>
                  <Radio value="0"><FormattedMessage id="tcSecret" /></Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label={this.props.intl.formatMessage({ id: 'tcOrderCity' })}>
              <Row className="tc-user-info-city" onClick={this.showCityDrawer}>{userInfo.location || <span style={{ color: '#d9d9d9' }}>{this.props.intl.formatMessage({ id: 'tcUserCityPr' })}</span>}</Row>
            </Form.Item>
            <Form.Item label={this.props.intl.formatMessage({ id: 'tcUserTags' })}>
              <Row className="tc-user-info-tags" onClick={this.goToUserTagPath}>
                {selectedTags.length > 0 && selectedTags.map(_tag => {
                  return <Tag key={'tc-user-info-currenttags-' + _tag.id}> {_tag.name} </Tag>
                })}
              </Row>
            </Form.Item>

            <Form.Item label={this.props.intl.formatMessage({ id: 'tcUserIntro' })}>
              {getFieldDecorator('userintro', {
                initialValue: '',
                rules: [{ required: true, message: <FormattedMessage id="tcUserEditIntroInputTip" /> }],
              })(
                <TextArea
                  placeholder={this.props.intl.formatMessage({ id: 'tcUserEditIntroPr' })}
                  autoSize={{ minRows: 2, maxRows: 4 }}
                />
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" className="btn-block"> <FormattedMessage id="tcDone" /> </Button>
            </Form.Item>
          </Form>

        </div>

        {/* City 选择 */}
        <Drawer
          placement="bottom"
          // height='50%'
          closable={false}
          onClose={this.closeCityDrawer}
          visible={visibleCityDrawer}
        >
          <Row>
            <Row style={{ width: '100%', paddingBottom: '10px' }}>
              <Select
                style={{ width: '100%' }}
                showSearch
                placeholder={formatMessage({ id: "tcOrderCountryOrRegion" })}
                onChange={this.handleProvinceChange}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {regionData.map(_item => (
                  <Option key={_item.id + "-userinfo-country"} value={_item.id}>{_item.name}</Option>
                ))}
              </Select>
            </Row>
            <Row style={{ width: '100%', paddingBottom: '20px' }}>
              <Select
                style={{ width: '100%' }}
                value={selectRegion}
                placeholder={formatMessage({ id: "tcOrderStateRegion" })}
                onChange={this.selectStateRegionChange}
              >
                {stateRegionList.map(_item => (
                  <Option key={_item.id + '-user-stateregion'} value={_item.name}>{_item.name}</Option>
                ))}
              </Select>
            </Row>
            <Row style={{ width: '100%', paddingBottom: '20px' }}>
              <Input placeholder={formatMessage({ id: "tcOrderCity" })} onChange={this.onChangeInputCity} />
            </Row>
            <Row style={{ width: '100%', paddingBottom: '20px' }}>
              <Button style={{ width: '100%', color: '#286dad', marginBottom: '2%' }} type="primary" onClick={this.saveChooseCity} ><FormattedMessage id="tcDone" /></Button>
            </Row>
          </Row>
        </Drawer>
        <Loading loading={isFetching} />
      </div>


    )

  }
}
const TcUserInfoEdit = Form.create({ name: 'useredit' })(TcUserInfoEditForm);
export default injectIntl(TcUserInfoEdit)