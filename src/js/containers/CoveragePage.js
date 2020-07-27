import React from 'react'
//import {Link} from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Form, message, Select, Empty } from 'antd';
import request, { deepObjectMerge, getSign, browserRedirect } from '../../public/common'
import Loading from '../components/Loading'
import config from '../../public/config'
// import { Flex } from 'antd-mobile';

const { Option } = Select;

class CoveragePage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      coverageSelect1Data: [], // 产品列表
      coverageSelect2Data: [], // 车型选择
      coverageSelect3Data: [], // 品牌选择
      coverageSelect4Data: [], // 年款选择
      select1ChooseData: [], //产品 支持功能
      selectAllChooseData: [], //支持检测系统
      isShowAllChooseData: true,

    }

    this.initFun = this.initFun.bind(this)//购买
    this.handleSubmit = this.handleSubmit.bind(this)//点击
    this.coverageSelect1Change = this.coverageSelect1Change.bind(this)//接口
    this.coverageSelect2Change = this.coverageSelect2Change.bind(this)
    this.coverageSelect3Change = this.coverageSelect3Change.bind(this)
    this.coverageSelect4Change = this.coverageSelect4Change.bind(this)
    this._getlang = this._getlang.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)
  }

  initFun (_props) {
    console.log(_props.match.params.type);
    let _url = config.goodsFunctions;
    var _pr = { // 接口参数
      "lang": this._getlang(_props.intl.locale) || "",
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
            coverageSelect1Data: data.data || []
          }, () => {
            _props.match.params.type == 'tool_diag' && this.coverageSelect1Change('3')
          })

          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.msg))
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

  coverageSelect1Change (value) {
    var _find = this.state.coverageSelect1Data.find(_item => _item.goods_id == value) || null;
    var _l = _find.goods_functions || [];

    let _url = config.getMakeList;
    var _pr = { // 接口参数
      "lang": this._getlang(this.props.intl.locale) || "",
      "product_type": _find.product_type || "0",
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
            // select1ChooseData: _l || [],
            select1ChooseData: [],
            coverageSelect2Data: data.data || [],
            coverageSelect3Data: [],
            coverageSelect4Data: [],
            selectAllChooseData: [],
            isShowAllChooseData: _find.product_type != '0'
          });
          this.props.form.resetFields(['tcCoverageSelect2', 'tcCoverageSelect3', 'tcCoverageSelect4']);
          // this.props.form.setFieldsValue({ tcCoverageSelect2: '', tcCoverageSelect3: '', tcCoverageSelect4: '' });

          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.msg))
          return false

        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })

  };
  coverageSelect2Change (value) {
    const { getFieldValue } = this.props.form;
    let _sel1data = this.props.match.params.type == 'tool_diag' ? '3' : getFieldValue('tcCoverageSelect1');
    let _id = value.split('|&|');
    _id = _id[0];
    var _find = this.state.coverageSelect2Data.find(_item => _item.id == _id) || null;
    var _findPt = this.state.coverageSelect1Data.find(_item => _item.goods_id == _sel1data) || null;
    let _url = config.getModelByMake;
    var _pr = { // 接口参数
      "lang": this._getlang(this.props.intl.locale) || "",
      "car_make_id": _id || "",
      "product_type": _findPt.product_type || "0",
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
            select1ChooseData: [],
            coverageSelect3Data: data.data || [],
            coverageSelect4Data: [],
            selectAllChooseData: [],
          });
          this.props.form.resetFields(['tcCoverageSelect3', 'tcCoverageSelect4']);

          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.msg))
          return false

        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  };
  coverageSelect3Change (value) {
    const { getFieldValue } = this.props.form;
    let _sel1data = this.props.match.params.type == 'tool_diag' ? '3' : getFieldValue('tcCoverageSelect1');
    var _findPt = this.state.coverageSelect1Data.find(_item => _item.goods_id == _sel1data) || null;
    var _find = this.state.coverageSelect3Data.find(_item => _item.id == value) || null;
    let _url = config.getYearByMakeAndModel;
    var _pr = { // 接口参数
      "lang": this._getlang(this.props.intl.locale) || "",
      "car_make_id": _find.make_id || "",
      "car_model_id": value || "",
      "car_model": _find.model || "",
      "product_type": _findPt.product_type || "0"
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
            select1ChooseData: [],
            coverageSelect4Data: data.data || [],
            selectAllChooseData: [],
          });
          this.props.form.resetFields(['tcCoverageSelect4']);

          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.msg))
          return false

        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  };
  coverageSelect4Change (value) {
    const { getFieldValue } = this.props.form;
    let _sel1data = this.props.match.params.type == 'tool_diag' ? '3' : getFieldValue('tcCoverageSelect1');
    var _find = this.state.coverageSelect4Data.find(_item => _item.id == value) || null;
    var _find2 = this.state.coverageSelect1Data.find(_item => _item.goods_id == _sel1data) || null;
    let _l = _find2.goods_functions || [];
    if (_find2.product_type == '1') {
      var _find3 = this.state.coverageSelect3Data.find(_item => _item.id == _find.model_id) || null;
      let _url = config.getThinkDiagSupportSysByCar;
      var _pr = { // 接口参数
        "lang": this._getlang(this.props.intl.locale) || "",
        "car_make_id": _find.make_id || "",
        "car_model_id": _find.model_id || "",
        "car_model": _find3.model || "",
        "car_year": _find.year || ""
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

            let _allList = [], _data2 = data.data || {};
            if (_data2.support_system.length) {
              for (let _i in _data2.support_system) {
                let _o = { 'name': _data2.support_system[_i], 'isUp': true };
                _allList.push(_o)
              }
            }
            if (_data2.un_support_system.length) {
              for (let _i in _data2.un_support_system) {
                let _o = { 'name': _data2.un_support_system[_i], 'isUp': false };
                _allList.push(_o)
              }
            }
            // console.log('=====_allList===========', _allList);
            this.setState({
              isFetching: false,
              selectAllChooseData: _allList,
              select1ChooseData: _l || [],
            }, () => {
              // var widget = document.getElementById('toolDiag_anchor');
              // widget.scrollIntoView();
            });

            return true

          } else {
            this.setState({
              isFetching: false
            }, () => message.error(data.msg))
            return false

          }
        })
        .catch(err => {
          this.setState({
            isFetching: false
          }, () => message.error(err.toString()))
          return false
        })

    } else {

      let _allList = [];
      if (_find.support_system) {
        for (let _i in _find.support_system) {
          let _o = { 'name': _find.support_system[_i], 'isUp': true };
          _allList.push(_o)
        }
      }
      if (_find.un_support_system) {
        for (let _i in _find.un_support_system) {
          let _o = { 'name': _find.un_support_system[_i], 'isUp': false };
          _allList.push(_o)
        }
      }
      // console.log('=====_allList===========', _allList);
      this.setState({
        selectAllChooseData: _allList,
        select1ChooseData: _l || [],
      });
    }

  };
  handleSubmit (e) {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     this.onClickRewardsCode().then(data => {
    //       if (data) {
    //         // this.props.history.push('/')
    //       }
    //     })
    //   }
    // });
  }

  _getlang (_l) {
    return _l == 'zh-cn' ? _l : 'en-us'
    // return 'en-us';
  }

  render () {
    let { isFetching, isShowAllChooseData, coverageSelect1Data, coverageSelect2Data, coverageSelect3Data, coverageSelect4Data, select1ChooseData, selectAllChooseData } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { intl: { formatMessage }, InitData } = this.props;
    const gutter = 24;
    let _isMob = browserRedirect();
    let _bannerImg = _isMob ? InitData._homeImgPath + '/Home/img/coverage_bg.jpg' : InitData._homeImgPath + '/Home/img/mobile/coverage_bg.jpg'
    let _style2 = _isMob ? { padding: '2% 20%' } : { padding: '2%' };
    let _isToolDiag = this.props.match.params.type == 'tool_diag' ? 8 : 6;
    let _toolDiagBannerStyle = this.props.match.params.type == 'tool_diag' ? { height: '300px' } : {};
    return (
      <div className="tc-coverage-page">

        <Row className="tc-coverage-info">
          <Row className="tc-redemption-img1 ">
            <img alt="THINKCAR" className="think-car-home-price-img" src={_bannerImg} style={_toolDiagBannerStyle} />

            <Row className="tc-coverage-form-info">
              <Row><h2 className="tc-coverage-form-title"><FormattedMessage id="tccoverageTitle1" /></h2></Row>
              <Row className="tc-coverage-btn-list" gutter={gutter}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  {
                    _isToolDiag == 6 && <Col className="tc-mobile-col-widthmax" span={_isToolDiag}>
                      <Form.Item>
                        {getFieldDecorator('tcCoverageSelect1', {
                          rules: [{ required: false }],
                        })(
                          <Select
                            placeholder={formatMessage({ id: "tcCoverageSelect1" }) + " *"}
                            onChange={this.coverageSelect1Change}
                          >
                            {coverageSelect1Data.map((_item) => {
                              // if (_item.product_type == '2') return; //下架thinkcar 1
                              return <Option key={"coverageSelect1" + _item.goods_id} value={_item.goods_id}>{_item.name.toUpperCase()}</Option>
                            })}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  }

                  <Col className="tc-mobile-col-widthmax" span={_isToolDiag}>
                    <Form.Item>
                      {getFieldDecorator('tcCoverageSelect2', {
                        rules: [{ required: false }],
                      })(
                        <Select
                          placeholder={formatMessage({ id: "tcCoverageSelect2" }) + " *"}
                          onChange={this.coverageSelect2Change}
                        >
                          {coverageSelect2Data.map((_item, _idx) => (
                            <Option key={_idx + "coverageSelect2" + _item.id + "" + _item.make} value={_item.id + "|&|" + _item.make}>{_item.make}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col className="tc-mobile-col-widthmax" span={_isToolDiag}>
                    <Form.Item>
                      {getFieldDecorator('tcCoverageSelect3', {
                        rules: [{ required: false }],
                      })(
                        <Select
                          placeholder={formatMessage({ id: "tcCoverageSelect3" }) + " *"}
                          onChange={this.coverageSelect3Change}
                        >
                          {coverageSelect3Data.map(_item => (
                            <Option key={"coverageSelect3" + _item.id} value={_item.id}>{_item.model}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col className="tc-mobile-col-widthmax" span={_isToolDiag}>
                    <Form.Item>
                      {getFieldDecorator('tcCoverageSelect4', {
                        rules: [{ required: false }],
                      })(
                        <Select
                          placeholder={formatMessage({ id: "tcCoverageSelect4" }) + " *"}
                          onChange={this.coverageSelect4Change}
                        >
                          {coverageSelect4Data.map(_item => (
                            <Option key={"coverageSelect4" + _item.id} value={_item.id}>{_item.year}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>

                </Form>
              </Row>
            </Row>
          </Row>
          <Row className="tc-coverage-title1" id="toolDiag_anchor">
            <Row><FormattedMessage id="tccoverageTitle2" /></Row>
            <Row style={{ padding: '2% 0' }}>
              {
                select1ChooseData.length > 0 && select1ChooseData.map((_x, _d) => {
                  return <Col span={4} className="tc-coverage-support-functions tc-mobile-col-widthmax" key={"select1ChooseData" + _x.id}>{_x.name}</Col>
                })

              }
              {!select1ChooseData.length && <Empty />}

            </Row>
            {isShowAllChooseData && <Row><FormattedMessage id="tccoverageTitle3" /></Row>}
            {isShowAllChooseData && <Row style={_style2}>
              <Row className="tc_ctb">
                <Col span={12} className="tc-coverage-support-functions2 tc_ctb1"><FormattedMessage id="tccoverageTitle3_1" /></Col>
                <Col span={12} className="tc-coverage-support-functions2"><FormattedMessage id="tccoverageTitle3_2" /></Col>
              </Row>

              {
                selectAllChooseData.length > 0 && selectAllChooseData.map((_x, _d) => {
                  var _img = _x.isUp ? InitData._homeImgPath + '/Home/img/coverage_ok.png' : InitData._homeImgPath + '/Home/img/coverage_err.png';
                  return <Row key={"selectAllChooseData" + _x.name + "" + _d} style={{ border: '1px solid #eee' }}>
                    <Col span={12} className="tc-coverage-support-functions3" style={{ borderRight: '1px solid #eee' }} >{_x.name}</Col>
                    <Col span={12} className="tc-coverage-support-functions3" >
                      <img alt="THINKCAR" className="think-car-home-price-img" style={{ width: '20px' }} src={_img} />
                    </Col>
                  </Row>
                })

              }
              {!selectAllChooseData.length && <Empty style={{ marginTop: '2%' }} />}

            </Row>
            }
          </Row>


        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

const Coverage = Form.create({ name: 'coverage' })(CoveragePage);
export default injectIntl(Coverage)
