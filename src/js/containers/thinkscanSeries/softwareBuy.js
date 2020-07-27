import React from 'react'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Icon, Input, Button, Checkbox, message, Modal, Select, Row, Col, Tooltip, Radio, Empty, Affix } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../../public/config'
import request, { getSign, deepObjectMerge, browserRedirect, remove_session_cache, getInitDataByLang, getProductByLang, get_session_cache, set_session_cache } from '../../../public/common'
import Loading from '../../components/Loading'
// import InitData from '../components/InitData'

const { Option } = Select;

class softwareBuyForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      regionData: [ // 国家 州 级联数据
        {
          "id": 233, "name": "United States",
          "stateList": [
            { "id": "1398", "name": "Howland Island", "country_id": "233", "country_code": "US" },
            { "id": "1399", "name": "Delaware", "country_id": "233", "country_code": "US" }
          ]
        }

      ],
      selectState: '',
      stateRegionBillList: [], // 选择国家后 获取的 州 数据 Bill
      paymentMehtodData: [],  // 支付方式列表
      paymentMehtodIsCC: false,  // 支付方式是否 Credit Card
      productList: [],  // 商品列表

      buyList: [], // 购买的软件列表

    }

    this.handleSubmit = this.handleSubmit.bind(this)//
    this.getAreaList = this.getAreaList.bind(this)//获取国家信息
    this.getCreateOrder = this.getCreateOrder.bind(this)// 触发接口请求： 创建订单
    this.handleProvinceBillChange = this.handleProvinceBillChange.bind(this)
    this.onChangePaymentMehtod = this.onChangePaymentMehtod.bind(this)//
    this.tcOrdercnvalidator = this.tcOrdercnvalidator.bind(this)

    this.getSoftWareList = this.getSoftWareList.bind(this)

  }
  componentDidMount () {
    //sessionStorage.clear()
    this.initF(this.props);
    this.getAreaList(this.props);
  }

  // componentWillReceiveProps (newProps) {
  //   this.initF(newProps);
  // }
  initF (props) {
    var _sn = props.match.params.sn;
    var _list = props.match.params.data;
    _list = _list.split(',');
    console.log('=====_list======', _list);
    let _getSW = get_session_cache('tc_SoftWare_list');
    if (_getSW) {
      let _sl = JSON.parse(_getSW) || [];
      let _fl = [];
      _list.map((_item, _idx) => {
        var _find = _sl.find((_fi) => _fi.id == _item);
        _find && (_fl.push(_find))
      })
      this.setState({
        buyList: _fl || [],
        paymentMehtodData: props.InitData.paymentMehtodEn_US
      }, () => {
        console.log('=====buyList======', this.state.buyList);
      })

    } else {
      this.getSoftWareList(props, _list, _sn);
    }
  }
  getSoftWareList (_props, _list, _sn) {
    let _url = config.getSoftWareList;
    var _pr = { // 接口参数
      "lang": _props.intl.locale || "",
    };
    _sn && (_pr.serial_no = _sn || '');
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
          let _sl = data.data || [];
          let _fl = [];
          _list.map((_item, _idx) => {
            var _find = _sl.find((_fi) => _fi.id == _item);
            _find && (_fl.push(_find))
          })

          this.setState({
            isFetching: false,
            buyList: _fl || [],
            paymentMehtodData: _props.InitData.paymentMehtodEn_US
          }, () => {
            set_session_cache('tc_SoftWare_list', _sl || []);
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
  // 接口：获取国家、州 信息
  getAreaList (_pr) {
    var _url = config.getCountryList;
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
  handleSubmit (e) {
    e.preventDefault();
    // console.log(this.props.form);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getCreateOrder().then(data => {
          if (data) {
            // this.props.history.push('/')
          }
        })
      }
    });
  }
  getCreateOrder () {
    let _url = config.getSoftWareCreateOrder;
    const { buyList,
      regionData, paymentMehtodIsCC,
      stateRegionBillList } = this.state;
    const { getFieldValue } = this.props.form;
    console.log('===buyList====', buyList);

    let _total = 0, _amount = 0;
    if (buyList.length) {
      buyList.map((ob, idx) => {
        _amount += 1 * ob.price;
        _amount = parseFloat(_amount * 100) / 100;

      })
      _total = _amount.toFixed(2);
    }

    var _pr = { // 接口参数
      "lang": this.props.intl.locale,
      "user_email": getFieldValue('tcSwEmail') || "",
      "serial_no": this.props.match.params.sn || "",
      // "user_id": "",
      "software_ids": this.props.match.params.data || "",
      "quantity": buyList.length || 0,
      "total_amount": _total,

      // "bill_phone": "",
      // "bill_email": "",
      // "bill_first_name": "",
      // "bill_last_name": "",
      // "bill_street1": "",
      // "bill_street2": "",
      // "bill_country": "",
      // "bill_province": "",
      // "bill_city": "",
      // "bill_zipcode": "",

      "pay_method": paymentMehtodIsCC ? "card" : "paypal",
      // "card_no": "",
      // "card_cvv": "",
      // "card_year": "",
      // "card_month": ""
    };
    if (paymentMehtodIsCC) {
      let _b1 = getFieldValue('tcOFPhoneNumberBill') || "";
      let _b2 = getFieldValue('tcOrderEmailBill') || "";
      let _b3 = getFieldValue('tcOFFirstNameBill') || "";
      let _b4 = getFieldValue('tcOFLastNameBill') || "";
      let _b5 = getFieldValue('tcOFStreetAddressBill') || "";
      let _b6 = getFieldValue('tcOFStreetAddress2Bill') || "";
      let _b7 = getFieldValue('tcOFZipCodeBill') || "";
      let _b8 = getFieldValue('tcOFCityBill') || "";
      _b1 && (_pr.bill_phone = _b1);
      _b2 && (_pr.bill_email = _b2);
      _b3 && (_pr.bill_first_name = _b3);
      _b4 && (_pr.bill_last_name = _b4);
      _b5 && (_pr.bill_street1 = _b5);
      _b6 && (_pr.bill_street2 = _b6);
      _b7 && (_pr.bill_zipcode = _b7);
      _b8 && (_pr.bill_city = _b8);

      // 获取国家、州 值 Bill
      var _fclb = regionData.find((_i) => _i.id == getFieldValue('tcOFCountryOrRegionBill'));
      if (_fclb) {
        _fclb.name && (_pr.bill_country = _fclb.name || "");
        // bill_province_iso2 bill_country_iso3
        _fclb.iso3 && (_pr.bill_country_iso3 = _fclb.iso3 || "");
        var _fzlb = stateRegionBillList.find((_i) => _i.id == getFieldValue('tcOFStateRegionBill'));

        _fzlb && (_pr.bill_province = _fzlb.name || "", _pr.bill_province_iso2 = _fzlb.iso2 || "")
      }

      let _c1 = getFieldValue('tcOFPayCreditCardNumber') || "";
      let _c2 = getFieldValue('tcOFPayCVV') || "";
      let _c3 = getFieldValue('tcOFPayYYYY') || "";
      let _c4 = getFieldValue('tcOFPayMM') || "";
      _c1 && (_pr.card_no = _c1);
      _c2 && (_pr.card_cvv = _c2);
      _c3 && (_pr.card_year = _c3);
      _c4 && (_pr.card_month = _c4);

    }

    this.props.InitData.isLogin && (_pr.user_id = this.props.InitData.userInfo.id)
    this.setState({
      isFetching: true
    });
    let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    console.log('======_param=======', _param);
    return request(_url, {
      method: 'POST',
      body: _param,
    })
      .then(data => {
        if (data.code == 0) {

          if (data.data.pay_method === "paypal") {
            let _url = data.data.secureAcceptanceUrl || "";
            window.location.replace(_url);
          } else if (data.data.pay_method === "card") {
            if (this.props.match.params.type === 'buyCarList') {
              this.props.clearBuyCartList('/PMessagePage/orderok');
            } else {
              this.props.history.replace('/PMessagePage/orderok')
            }
          }
          setTimeout(() => {
            this.setState({
              isFetching: false
            })
          }, 2000)
          return true
        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.message))
          paymentMehtodIsCC && this.props.history.push('/PMessagePage/orderokerr');
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
  // 选择国家 Bill
  handleProvinceBillChange (value) {
    const { intl: { formatMessage } } = this.props;
    var _find = this.state.regionData.find(_item => _item.id == value) || null;
    // var _l = _find.stateList || [];

    // this.setState({
    //   stateRegionBillList: _l,
    // });
    // this.props.form.setFieldsValue({ tcOFStateRegionBill: _l.length ? _l[0].id : '' });

    var _url = config.getStateList;
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
          var _isTip = false, _isThinkcar = false;


          (value != '39' && value != '142') && (_isTip = true)
          _isThinkcar = this.state.productList.some((_item) => _item.type == '0');

          _isTip && _isThinkcar && Modal.info({
            title: formatMessage({ id: 'tc5_19' }),
            content: (
              <div>{formatMessage({ id: 'tc5_20' })} </div>
            ),
            onOk () { },
          });

          this.setState({
            stateRegionBillList: _l,
          });

          this.props.form.resetFields(['tcOFStateRegionBill']);

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

  // 选择支付方式
  onChangePaymentMehtod (e) {
    this.setState({ paymentMehtodIsCC: e.target.value == 'tc_payment_2' });
  };

  tcOrdercnvalidator (rule, val, callback) {
    const { intl: { formatMessage } } = this.props;
    if (val) {
      val == '5424000000000015' ? callback(formatMessage({ id: 'tc6_17' })) : callback();
    } else {
      callback();
    }
  }

  render () {
    let { isFetching, lang, buyList, regionData, stateRegionBillList, paymentMehtodData, paymentMehtodIsCC } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { intl: { formatMessage }, InitData } = this.props;
    const _row_span = 12;
    const _ioceStyle = {
      color: '#AF0005',
      fontSize: '16px',
      verticalAlign: 'middle',
      marginLeft: '2%',
    };

    const _radioStyle = {
      display: 'block',
      border: '1px solid #e8e8e8',
      padding: '2%',
      marginBottom: '2%',
    };

    let _total = 0, _serviceAllprice = 0, _buyAllNumber = buyList.length, _amount = 0;
    let _isReserve = false;
    if (buyList.length) {
      buyList.map((ob, idx) => {
        _amount += 1 * ob.price;
        _amount = parseFloat(_amount * 100) / 100;
      })
      _total = (_amount + _serviceAllprice).toFixed(2);
      _serviceAllprice = _serviceAllprice.toFixed(2);
    }

    return (
      <div className="tc-order-page">

        <h1 className="text-center tc-title">
          <FormattedMessage id="tc5_1" />
        </h1>
        {
          buyList.length > 0 ?
            <Form onSubmit={this.handleSubmit} className="tc-order-form">
              <Row gutter={[_row_span]} >
                <Col className="tc-mobile-col-widthmax" span={16}>
                  <Row>
                    <h2>Information</h2>
                  </Row>
                  {/* sn ， 邮箱 */}
                  <Row gutter={[_row_span]}>
                    <Col className="tc-mobile-col-widthmax" span={12}>
                      <Form.Item >
                        {/* {getFieldDecorator('tcSwSN', {
                          rules: [{ required: true, message: "Please input SN" }],
                        })(
                          <Input placeholder={"SN *"} />
                        )} */}
                        <Input placeholder={"SN *"} defaultValue={this.props.match.params.sn} disabled />
                      </Form.Item>
                    </Col>
                    <Col className="tc-mobile-col-widthmax" span={12}>
                      <Form.Item >
                        {getFieldDecorator('tcSwEmail', {
                          rules: [{
                            type: 'email', message: <FormattedMessage id="tc1" />,
                          }, {
                            required: true, message: <FormattedMessage id="tc6_2" />,
                          }],
                        })(
                          <Input placeholder={formatMessage({ id: "email" }) + " *"} />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>




                  {/* 支付方式 标题*/}
                  <Row>
                    <h2><FormattedMessage id="tc5_5" /></h2>
                  </Row>
                  {/* 支付方式 */}
                  <Row className="tc-order-shipping-info">
                    <Form.Item >
                      {paymentMehtodData.length && getFieldDecorator('spaymentMehtRadio', {
                        initialValue: paymentMehtodData[0].id
                      })(
                        <Radio.Group onChange={this.onChangePaymentMehtod} style={{ fontSize: '16px', width: '100%', paddingTop: '3%' }}>
                          {
                            paymentMehtodData.map((ob) =>
                              <Radio key={'radioList' + ob.id} style={_radioStyle} value={ob.id}>
                                <span >{ob.title}</span>
                                {/* <span className="tc-shipping-tc-dec">{ob.description}</span> */}
                                <img alt={ob.name} className="think-car-home-price-img-logo" style={ob.id == 'tc_payment_2' ? { width: '20%' } : {}} src={InitData._homeImgPath + ob.img} />
                                {
                                  ob.id == 'tc_payment_2' && paymentMehtodIsCC &&
                                  <Row style={{ marginTop: '2%' }}>
                                    <Row gutter={[_row_span]}>
                                      <Col className="tc-mobile-col-widthmax" span={12}>
                                        <Form.Item>
                                          {getFieldDecorator('tcOFPayCreditCardNumber', {
                                            rules: [
                                              { required: true, message: <FormattedMessage id="tc6_10" /> },
                                              // { validator: this.tcOrdercnvalidator }
                                            ],
                                          })(
                                            <Input placeholder={formatMessage({ id: "tc5_18" }) + " *"} />
                                          )}
                                        </Form.Item>
                                      </Col>
                                      <Col className="tc-mobile-col-widthmax" span={12}>
                                        <Form.Item>
                                          {getFieldDecorator('tcOFPayCVV', {
                                            rules: [{ required: true, message: <FormattedMessage id="tc6_11" /> }],
                                          })(
                                            <Input placeholder={formatMessage({ id: "tcOFPayCVV" }) + " *"} />
                                          )}
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                    <Row gutter={[_row_span]}>
                                      <Col className="tc-mobile-col-widthmax" span={12}>
                                        <Form.Item>
                                          {getFieldDecorator('tcOFPayYYYY', {
                                            rules: [{ required: true, message: <FormattedMessage id="tc6_12" /> }],
                                          })(
                                            <Input placeholder={formatMessage({ id: "tcOFPayYYYY" }) + " *"} />
                                          )}
                                        </Form.Item>
                                      </Col>
                                      <Col className="tc-mobile-col-widthmax" span={12}>
                                        <Form.Item>
                                          {getFieldDecorator('tcOFPayMM', {
                                            rules: [{ required: true, message: <FormattedMessage id="tc6_13" /> }],
                                          })(
                                            <Input placeholder={formatMessage({ id: "tcOFPayMM" }) + " *"} />
                                          )}
                                        </Form.Item>
                                      </Col>
                                    </Row>

                                  </Row>
                                }
                              </Radio>
                            )
                          }
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Row>


                  {/* 信用卡账单地址填写 */}
                  {
                    paymentMehtodIsCC && <Row>
                      <Row>
                        <h2><FormattedMessage id="tc6_14" /></h2>
                      </Row>
                      <Row className="tc-text-align-right">
                        {/* 国家 ， 邮箱 */}
                        <Row gutter={[_row_span]}>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item >
                              {getFieldDecorator('tcOFCountryOrRegionBill', {
                                rules: [{ required: true, message: <FormattedMessage id="tc6_1" /> }],
                              })(
                                <Select
                                  showSearch
                                  placeholder={formatMessage({ id: "tc5_7" }) + " *"}
                                  onChange={this.handleProvinceBillChange}
                                  filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {regionData.map(_item => (
                                    <Option key={_item.id + "Bill"} value={_item.id}>{_item.name}</Option>
                                  ))}
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item >
                              {getFieldDecorator('tcOrderEmailBill', {
                                rules: [{
                                  type: 'email', message: <FormattedMessage id="tc1" />,
                                }, {
                                  required: true, message: <FormattedMessage id="tc6_2" />,
                                }],
                              })(
                                <Input placeholder={formatMessage({ id: "email" }) + " *"} />
                              )}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* 名字1 ， 名字2 */}
                        <Row gutter={[_row_span]}>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item >
                              {getFieldDecorator('tcOFFirstNameBill', {
                                rules: [{ required: true, message: <FormattedMessage id="tc6_3" /> }],
                              })(
                                <Input placeholder={formatMessage({ id: "tc5_10" }) + " *"} />
                              )}
                            </Form.Item>
                          </Col>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item >
                              {getFieldDecorator('tcOFLastNameBill', {
                                rules: [{ required: true, message: <FormattedMessage id="tc6_4" /> }],
                              })(
                                <Input placeholder={formatMessage({ id: "tc5_11" }) + " *"} />
                              )}
                            </Form.Item>
                          </Col>
                        </Row>

                        {/* 地址1 ， 地址2 */}
                        <Row gutter={[_row_span]}>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item>
                              {getFieldDecorator('tcOFStreetAddressBill', {
                                rules: [{ required: true, message: <FormattedMessage id="tc6_7" /> }],
                              })(
                                <Input placeholder={formatMessage({ id: "tc5_14" }) + " *"} />
                              )}
                            </Form.Item>
                          </Col>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item>
                              {getFieldDecorator('tcOFStreetAddress2Bill', {
                                rules: [{ required: false }],
                              })(
                                <Input placeholder={formatMessage({ id: "tc5_15" })} />
                              )}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* 州 ， 输入地址详情 */}
                        <Row gutter={[_row_span]}>

                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item>
                              {getFieldDecorator('tcOFCityBill', {
                                rules: [{ required: true, message: <FormattedMessage id="tc6_5" /> }],
                              })(
                                <Input placeholder={formatMessage({ id: "tc5_12" }) + " *"} />
                              )}
                            </Form.Item>
                          </Col>
                          <Col className="tc-mobile-col-widthmax" span={12}>

                            <Form.Item >
                              {getFieldDecorator('tcOFStateRegionBill', {
                                rules: [{ required: false }],
                                // rules: [{ required: true, message: <FormattedMessage id="tc6_6" /> }],
                              })(
                                <Select
                                  showSearch
                                  filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                  placeholder={formatMessage({ id: "tc5_13" })}
                                >
                                  {stateRegionBillList.map(_item => (
                                    <Option key={_item.id + "Bill"} value={_item.id}>{_item.name}</Option>
                                  ))}
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                        </Row>

                        {/* 邮编 ， 电话 */}
                        <Row gutter={[_row_span]}>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item >
                              {getFieldDecorator('tcOFZipCodeBill', {
                                rules: [{ required: true, message: <FormattedMessage id="tc6_8" /> }],
                              })(
                                <Input placeholder={formatMessage({ id: "tc5_16" }) + " *"} />
                              )}
                            </Form.Item>
                          </Col>
                          <Col className="tc-mobile-col-widthmax" span={12}>
                            <Form.Item>
                              {getFieldDecorator('tcOFPhoneNumberBill', {
                                rules: [{ required: true, message: <FormattedMessage id="tc6_9" /> }],
                              })(
                                <Input placeholder={formatMessage({ id: "tc5_17" }) + " *"} />
                              )}
                            </Form.Item>
                          </Col>
                        </Row>

                      </Row>
                    </Row>
                  }

                  {
                    browserRedirect() && <Row>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Button className="tc-buy-btn tc-buy-btn-addBuy" htmlType="submit" >
                          <FormattedMessage id={_isReserve ? "tcHTPSettleNowr" : "tcRESERVE"} />
                        </Button>

                      </Form.Item>
                    </Row>
                  }

                </Col>

                <Col className="tc-mobile-col-widthmax" span={8} >
                  {/* <Affix key="affixeOrderSummary" offsetTop={100} > */}
                  <Row>
                    <Row >
                      <h2><FormattedMessage id="tc5_6" /></h2>
                    </Row>
                    <Row className="tc-order-summary-info">
                      {
                        buyList.length > 0 ?
                          buyList.map((ob, idx) => {


                            return <div key={"swbcl_" + ob.id} className="tc-buy-car-list-div">
                              <Row gutter={[10]}>
                                <Col span={16} style={{ paddingLeft: '15px' }}>
                                  <p className="tc-bc-info-title">{ob.soft_name + ' ' + ob.version_no}</p>
                                  <Row >
                                    X&nbsp;&nbsp;1
                                  </Row>
                                </Col>
                                <Col span={8}>
                                  <p className="tc-bc-info-title2">{"$ " + ob.price}</p>
                                </Col>
                              </Row>
                            </div>
                          })
                          : <Empty />
                      }

                      {
                        buyList.length > 0 &&
                        <div className="tc-buy-car-product-all-info">
                          <Row className="tc-row-5">
                            <Col span={12} ><FormattedMessage id="tcQuantity" /></Col>
                            <Col span={12} className="tc-title2 tc-text-align-right">{_buyAllNumber}</Col>
                          </Row>
                          <Row className="tc-row-5">
                            <Col span={12} ><FormattedMessage id="tcService" /></Col>
                            <Col span={12} className="tc-title2 tc-text-align-right">+${_serviceAllprice}</Col>
                          </Row>



                          <Row className="tc-row-5">
                            <Col span={12} ><FormattedMessage id="tcTotal" /></Col>
                            <Col span={12} className="tc-title2 tc-title3 tc-text-align-right">${_total}</Col>
                          </Row>
                        </div>

                      }

                      <Row>
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Button className="tc-buy-btn tc-buy-btn-addBuy" htmlType="submit" >
                            <FormattedMessage id={_isReserve ? "tcHTPSettleNowr" : "tcRESERVE"} />
                          </Button>

                        </Form.Item>
                      </Row>

                    </Row>
                  </Row>
                  {/* </Affix> */}
                </Col>

              </Row>
            </Form>
            : <Empty />
        }
        <Loading loading={isFetching} />
      </div>
    )
  }
}
const softwareBuy = Form.create({ name: 'software' })(softwareBuyForm);
export default injectIntl(softwareBuy)