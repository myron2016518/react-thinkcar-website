import React from 'react'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Icon, Input, Button, Checkbox, message, Modal, Select, Row, Col, Tooltip, Radio, Empty, Affix } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request, { _assessClick, getSign, deepObjectMerge, browserRedirect, remove_session_cache, getInitDataByLang, getProductByLang, get_session_cache, set_session_cache } from '../../public/common'
import Loading from '../components/Loading'
// import InitData from '../components/InitData'

const { Option } = Select;

class OrderForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      current: 0,
      regionData: [ // 国家 州 级联数据
        {
          "id": 233, "name": "United States",
          "stateList": [
            { "id": "1398", "name": "Howland Island", "country_id": "233", "country_code": "US" },
            { "id": "1399", "name": "Delaware", "country_id": "233", "country_code": "US" }
          ]
        }

      ],
      selectRegion: '',
      selectState: '',
      stateRegionList: [], // 选择国家后 获取的 州 数据
      stateRegionBillList: [], // 选择国家后 获取的 州 数据 Bill
      shippingData: [],  // 快递选择列表
      shippingprice: 9.95, // 快递费用 邮费：加拿大、墨西哥必须付邮费    现在是：选择加拿大还可以选择免邮费 
      paymentMehtodData: [],  // 支付方式列表
      paymentMehtodIsCC: false,  // 支付方式是否 Credit Card
      productList: [],  // 商品列表
      ishaveCode: false, //是否有优惠码
      codePrice: 0, // 优惠码价格
      address_is_same: true, // 收货地址是否和账单地址一致（1（相同）,0（不相同））

    }

    this.handleSubmit = this.handleSubmit.bind(this)//
    this.getAreaList = this.getAreaList.bind(this)//获取国家信息
    this.getCreateOrder = this.getCreateOrder.bind(this)// 触发接口请求： 创建订单
    this.handleProvinceChange = this.handleProvinceChange.bind(this)
    this.handleProvinceBillChange = this.handleProvinceBillChange.bind(this)
    this.onSecondCityChange = this.onSecondCityChange.bind(this)//
    this.onChangePaymentMehtod = this.onChangePaymentMehtod.bind(this)//
    this.onChangeShippingRadio = this.onChangeShippingRadio.bind(this)  //  快速方式改变事件
    this.onBlurGetWebRebate = this.onBlurGetWebRebate.bind(this)  //  接口 : 优惠码校验
    this.onChangeAddressIsSame = this.onChangeAddressIsSame.bind(this)
    this.tcOrdercnvalidator = this.tcOrdercnvalidator.bind(this)

  }
  componentDidMount () {
    //sessionStorage.clear()
    this.initF(this.props);
    // console.log('====ordernewProps.props==', this.props);
    this.getAreaList(this.props);
    _assessClick('pay/info');
  }

  componentWillReceiveProps (newProps) {
    // console.log('=====ordernewProps========', newProps);
    this.initF(newProps);
  }
  initF (props) {
    // var _paymentMehtod = getInitDataByLang(props.intl.locale, props.InitData, 'paymentMehtod');
    //商品数据: "buynow": 立即购买 ， buyCarList: 购物车跳转
    var _list = [];
    if (props.match.params.type === 'buynow') {
      var _pOb = JSON.parse(props.match.params.data);
      var _d = getProductByLang(props.intl.locale, props.InitData) || [];
      _d = _d.find(_item => _item.id == _pOb.id);
      var _o = objectAssign({}, _pOb, _d);
      _list.push(_o);
    } else if (props.match.params.type === 'buyCarList') {
      _list = props.buyDrawerList.list;
      // var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
      // var _da = get_session_cache('tc_temporary_buy_car_data');
      // !_da && props.history.push('/');
    }

    let _pr = {
      productList: _list,
      paymentMehtodData: props.InitData.paymentMehtodEn_US
    }
    console.log(this.state.shippingData);
    this.state.shippingData.length <= 0 && (_pr.shippingData = props.InitData.shippingEn_US);
    this.setState(_pr);

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
    let _url = config.getCreateOrder;
    const { ishaveCode, productList, shippingprice, codePrice,
      regionData, paymentMehtodIsCC, address_is_same,
      stateRegionList, stateRegionBillList } = this.state;
    const { getFieldValue } = this.props.form;
    console.log('===productList====', productList);

    let _total = 0, _serviceAllprice = 0, _buyAllNumber = 0, _amount = 0, _cart_ids = [], _cart_json = [], _shippNumber = 1, _shippingClear = false;
    if (productList.length) {
      productList.map((ob, idx) => {

        if (this.props.InitData.isLogin && this.props.match.params.type === 'buyCarList') {
          _cart_ids.push(ob.cart_id);
        } else {
          var _cj = {
            "goods_id": ob.id,
            "goods_name": ob.name,
            "goods_price": ob.price,
            "goods_smimg": ob.smimg,
            "quantity": ob.number,
            "service_id": "",
            "service_name": "",
            "service_price": "",
            "service_smimg": ""
          }
          if (ob.service) {
            var _fsel = ob.serviceList.find((_ifsel) => _ifsel.id == ob.serviceType);
            _fsel && (_cj.service_id = _fsel.id, _cj.service_name = _fsel.name, _cj.service_price = _fsel.price, _cj.service_smimg = _fsel.smimg)
          }
          _cart_json.push(_cj);
        }

        _buyAllNumber += parseFloat(ob.number);
        if (ob.service) {
          var _d = getProductByLang(this.props.intl.locale, this.props.InitData) || [];
          _d = _d.find(_item => _item.id == ob.id);
          var _service = _d.serviceList.find(_item => _item.id == ob.serviceType);
          _serviceAllprice += ob.number * _service.price;
          _serviceAllprice = parseFloat((_serviceAllprice) * 100) / 100;
        }
        _amount += ob.number * ob.price;
        _amount = parseFloat(_amount * 100) / 100;


        // 判断活动，免运费 ： diag 
        // if (ob.id == '3') {
        //   productList.length == 1 ? _shippingClear = true : _shippingClear = false;
        // }

        // 判断odb 的运费个数
        // if (ob.id == '4') {
        //   if (productList.length == 1 && parseInt(ob.number) <= 2) {
        //     _shippNumber = 1;
        //   } else {
        //     _shippNumber = parseInt(parseInt(ob.number) / 2);
        //     parseInt(parseInt(ob.number) % 2) == 1 && (_shippNumber = _shippNumber + 1)
        //   }
        // }

      })
      // _shippingClear ? _total = (_amount + _serviceAllprice).toFixed(2) : _total = (_amount + (shippingprice * _shippNumber) + _serviceAllprice).toFixed(2);
      _total = (_amount + (shippingprice * _shippNumber) + _serviceAllprice).toFixed(2);
      _serviceAllprice = _serviceAllprice.toFixed(2);
      ishaveCode && (_total = (parseFloat(_total) - parseFloat(codePrice)).toFixed(2))
    }
    // 获取国家、州 值
    var _c = '', _z = '', _iso2 = '';
    var _fcl = regionData.find((_i) => _i.id == getFieldValue('tcOFCountryOrRegion'));
    if (_fcl) {
      _c = _fcl.name;
      var _fzl = stateRegionList.find((_i) => _i.id == getFieldValue('tcOFStateRegion'));
      console.log('===_fzl====', _fzl);
      _fzl && (_z = _fzl.name, _iso2 = _fzl.iso2 || '');
    }



    // console.log(encodeURIComponent(JSON.stringify(_cart_json)));
    var _pr = { // 接口参数
      "lang": this.props.intl.locale,
      // "user_ip": ishaveCode ? returnCitySN.cip : '',
      "user_id": "",
      "cart_ids": _cart_ids.length ? _cart_ids.toString() : "",
      "cart_json": _cart_json.length ? JSON.stringify(_cart_json) : "",
      "total_amount": _total,
      // "shipping_cost": _shippingClear ? 0 : shippingprice * _shippNumber,
      "shipping_cost": shippingprice * _shippNumber,
      "user_email": getFieldValue('tcOrderEmail') || "",
      "user_rcode": ishaveCode ? getFieldValue('tcOFCouponCode') : '',
      "user_first_name": getFieldValue('tcOFFirstName') || "",
      "user_last_name": getFieldValue('tcOFLastName') || "",
      "user_street1": getFieldValue('tcOFStreetAddress') || "",
      "user_street2": getFieldValue('tcOFStreetAddress2') || "",

      "user_country": _c,
      "user_province": _z,
      // user_country_iso3 user_province_iso2 bill_province_iso2 bill_country_iso3
      "user_country_iso3": _fcl.iso3 || '',
      "user_province_iso2": _iso2,

      "user_city": getFieldValue('tcOFCity') || "",
      "user_phone": getFieldValue('tcOFPhoneNumber') || "",
      "user_zipcode": getFieldValue('tcOFZipCode') || "",

      "address_is_same": 1,
      "bill_phone": "",
      "bill_email": "",
      "bill_first_name": "",
      "bill_last_name": "",
      "bill_street1": "",
      "bill_street2": "",
      "bill_country": "",
      "bill_province": "",
      "bill_city": "",
      "bill_zipcode": "",

      "pay_method": paymentMehtodIsCC ? "card" : "paypal",
      "card_no": "",
      "card_cvv": "",
      "card_year": "",
      "card_month": ""
    };
    if (!address_is_same && paymentMehtodIsCC) {
      _pr.address_is_same = 0;
      _pr.bill_phone = getFieldValue('tcOFPhoneNumberBill') || "";
      _pr.bill_email = getFieldValue('tcOrderEmailBill') || "";
      _pr.bill_first_name = getFieldValue('tcOFFirstNameBill') || "";
      _pr.bill_last_name = getFieldValue('tcOFLastNameBill') || "";
      _pr.user_last_name = getFieldValue('tcOFLastNameBill') || "";
      _pr.bill_street1 = getFieldValue('tcOFStreetAddressBill') || "";
      _pr.bill_street2 = getFieldValue('tcOFStreetAddress2Bill') || "";
      _pr.bill_zipcode = getFieldValue('tcOFZipCodeBill') || "";
      _pr.bill_city = getFieldValue('tcOFCityBill') || "";

      // 获取国家、州 值 Bill
      var _fclb = regionData.find((_i) => _i.id == getFieldValue('tcOFCountryOrRegionBill'));
      if (_fclb) {
        _pr.bill_country = _fclb.name || "";
        // bill_province_iso2 bill_country_iso3
        _pr.bill_country_iso3 = _fclb.iso3 || "";
        var _fzlb = stateRegionBillList.find((_i) => _i.id == getFieldValue('tcOFStateRegionBill'));

        _fzlb && (_pr.bill_province = _fzlb.name || "", _pr.bill_province_iso2 = _fzlb.iso2 || "")
      }
      //判断 输入地址的两个地址总和长度不能超过60
      // let _addressLength2 = _pr.bill_street1 + "" + _pr.bill_street2;
      // if (_addressLength2.length > 60) {
      //   message.error(this.props.intl.formatMessage({ id: 'tc5_27' }));
      //   return;
      // }

    } else {
      //判断 输入地址的两个地址总和长度不能超过60
      // let _addressLength = getFieldValue('tcOFStreetAddress') + "" + getFieldValue('tcOFStreetAddress2');
      // if (_addressLength.length > 60) {
      //   message.error(this.props.intl.formatMessage({ id: 'tc5_27' }));
      //   return;
      // }
    }


    if (paymentMehtodIsCC) {
      _pr.card_no = getFieldValue('tcOFPayCreditCardNumber') || "";
      _pr.card_cvv = getFieldValue('tcOFPayCVV') || "";
      _pr.card_year = getFieldValue('tcOFPayYYYY') || "";
      _pr.card_month = getFieldValue('tcOFPayMM') || "";
    }

    this.props.InitData.isLogin && (_pr.user_id = this.props.InitData.userInfo.id)
    this.setState({
      isFetching: true
    });
    console.log('==============');
    let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    // console.log(_param);
    return request(_url, {
      method: 'POST',
      body: _param,
    })
      .then(data => {
        if (data.code == 0) {

          if (data.data.pay_method === "paypal") {
            let _url = data.data.secureAcceptanceUrl || "";
            remove_session_cache('tc_temporary_buy_car_data');
            window.location.replace(_url);
          } else if (data.data.pay_method === "card") {
            remove_session_cache('tc_temporary_buy_car_data');
            if (this.props.match.params.type === 'buyCarList') {
              this.props.clearBuyCartList('/PMessagePage/orderok');
            } else {
              this.props.history.replace('/PMessagePage/orderok')
            }
            // this.setState({
            //   isFetching: false
            // })

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
          var _shippingDisabled = [];
          // _shippingDisabled.map((_x) => {

          //   if (value == '233') {
          //     _x.isDisabled = false
          //   } else {
          //     (value != '39' && value != '142') && (_isTip = true)
          //     _x.id == 'tc_ship_2' ? _x.isDisabled = true : _x.isDisabled = false;
          //   }
          //   return _x;
          // })


          if (value == '233') {
            _shippingDisabled = [
              { id: 'tc_ship_1', title: 'tc5_21', price: 9.95, isDisabled: false, description: 'tc5_22' },
              { id: 'tc_ship_2', title: 'tc5_23', price: 0, isDisabled: false, description: 'tc5_24' },
            ];
          } else if (value == '39') {
            _shippingDisabled = [
              { id: 'tc_ship_1', title: 'tc5_21', price: 19.95, isDisabled: false, description: 'tc5_22' },
              { id: 'tc_ship_2', title: 'tc5_26', price: 9.95, isDisabled: false, description: 'tc5_24' },
            ];
          } else {
            _shippingDisabled = [
              { id: 'tc_ship_1', title: 'tc5_21', price: 39.95, isDisabled: false, description: 'tc5_22' },
              { id: 'tc_ship_2', title: 'tc5_26', price: 29.95, isDisabled: false, description: 'tc5_24' },
            ];
          }

          (value != '39' && value != '142') && (_isTip = true)
          _isThinkcar = this.state.productList.some((_item) => _item.type == '0');

          _isTip && _isThinkcar && Modal.info({
            title: formatMessage({ id: 'tc5_19' }),
            content: (
              <div>{formatMessage({ id: 'tc5_20' })} </div>
            ),
            onOk () { },
          });

          // this.setState({ shippingprice: _find.price });
          this.setState({
            stateRegionBillList: _l,
            shippingData: _shippingDisabled,
            shippingprice: _shippingDisabled[value == '233' ? 1 : 0].price
          });
          this.props.form.setFieldsValue({
            // tcOFStateRegionBill: _l.length ? _l[0].id : '',
            shippingRadio: _shippingDisabled.length ? _shippingDisabled[value == '233' ? 1 : 0].id : '',
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

  // 根据 国家获取州 信息
  getStateListByCountryId (_id) {
    var _url = config.getStateList;
    var _pr = { // 接口参数
      "lang": this.props.intl.locale,
      "cid": _id
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

  handleProvinceChange (value) {
    const { intl: { formatMessage } } = this.props;
    var _find = this.state.regionData.find(_item => _item.id == value) || null;
    // var _l = _find.stateList || [];
    console.log('===this.state.productList====', this.state.productList);
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
          if (this.state.address_is_same) {
            // var _shippingDisabled = this.state.shippingData;
            var _shippingDisabled = [];
            var _isTip = false, _isThinkcar = false;
            // _shippingDisabled.map((_x) => {

            //   if (value == '233') {
            //     _x.isDisabled = false
            //   } else {
            //     (value != '39' && value != '142') && (_isTip = true)
            //     _x.id == 'tc_ship_2' ? _x.isDisabled = true : _x.isDisabled = false;
            //   }

            //   return _x;
            // })

            if (value == '233') {
              _shippingDisabled = [
                { id: 'tc_ship_1', title: 'tc5_21', price: 9.95, isDisabled: false, description: 'tc5_22' },
                { id: 'tc_ship_2', title: 'tc5_23', price: 0, isDisabled: false, description: 'tc5_24' },
              ];
            } else if (value == '39') {
              _shippingDisabled = [
                { id: 'tc_ship_1', title: 'tc5_21', price: 19.95, isDisabled: false, description: 'tc5_22' },
                { id: 'tc_ship_2', title: 'tc5_26', price: 9.95, isDisabled: false, description: 'tc5_24' },
              ];
            } else {
              _shippingDisabled = [
                { id: 'tc_ship_1', title: 'tc5_21', price: 39.95, isDisabled: false, description: 'tc5_22' },
                { id: 'tc_ship_2', title: 'tc5_26', price: 29.95, isDisabled: false, description: 'tc5_24' },
              ];
            }

            (value != '39' && value != '142') && (_isTip = true)
            _isThinkcar = this.state.productList.some((_item) => _item.type == '0');

            _isTip && _isThinkcar && Modal.info({
              title: formatMessage({ id: 'tc5_19' }),
              content: (
                <div>{formatMessage({ id: 'tc5_20' })} </div>
              ),
              onOk () { },
            });
            // this.setState({ shippingprice: _find.price });
            console.log('===_shippingDisabled====', _shippingDisabled);
            this.setState({
              stateRegionList: _l,
              shippingData: _shippingDisabled,
              shippingprice: _shippingDisabled[value == '233' ? 1 : 0].price
            });
            this.props.form.setFieldsValue({
              // tcOFStateRegion: _l.length ? _l[0].id : '',
              // tcOFStateRegion: '',
              shippingRadio: _shippingDisabled.length ? _shippingDisabled[value == '233' ? 1 : 0].id : '',
            });
            this.props.form.resetFields(['tcOFStateRegion']);
          } else {
            this.setState({
              stateRegionList: _l
            });
            // this.props.form.setFieldsValue({
            //   tcOFStateRegion: _l.length ? _l[0].id : ''
            // });
            this.props.form.resetFields(['tcOFStateRegion']);

          }

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

  onSecondCityChange (value) {
    this.setState({
      selectState: value,
    });
  };
  // 选择支付方式
  onChangePaymentMehtod (e) {
    this.setState({ paymentMehtodIsCC: e.target.value == 'tc_payment_2' });
  };
  // 选择快递方式
  onChangeShippingRadio (e) {
    console.log(this.state.shippingData);
    var _find = this.state.shippingData.find(_item => _item.id == e.target.value) || null;
    this.setState({ shippingprice: _find.price });
  };

  // 接口： 校验 优惠码
  onBlurGetWebRebate () {
    const { intl: { formatMessage } } = this.props;
    const { getFieldValue } = this.props.form;
    // console.log('============优惠码==========', getFieldValue('tcOFCouponCode'));
    var _code = getFieldValue('tcOFCouponCode');
    // console.log('============优惠码==========', _code.length);
    if (_code) {
      let _total = 0;
      if (this.state.productList.length) {
        this.state.productList.map((ob, idx) => {
          _total += ob.number * ob.price;
          _total = parseFloat(_total * 100) / 100;
        })
      }
      // if (_code.length <= 8 && _total < 50) {
      if (_total < 50) {
        this.setState({
          ishaveCode: false,
          codePrice: 0,
        });
        message.error(formatMessage({ id: 'tc5_8Tip' }));
        this.props.form.resetFields(['tcOFCouponCode']);
        return;

      }
      var _url = config.getWebRebate;
      var _pr = { // 接口参数
        "lang": this.props.intl.locale,
        "user_rcode": _code,
        // "user_ip": returnCitySN.cip
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
            console.log(this.state.productList);
            let _discount = data.data.rebate_num || 0;
            if (data.data.type == 1) {  //1:折扣优惠 2：减免优惠
              _discount = _total * data.data.rebate_num;
              _discount = (_total - parseFloat(_discount)).toFixed(2);
            }
            this.setState({
              isFetching: false,
              ishaveCode: true,
              codePrice: _discount,
            });
            return true
          } else {
            this.setState({
              isFetching: false,
              ishaveCode: false,
              codePrice: 0,
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
    } else {
      this.setState({
        ishaveCode: false,
        codePrice: 0,
      });
    }

  };

  // 收货地址是否和账单地址一致
  onChangeAddressIsSame (e) {
    // console.log(e.target.checked);
    // this.props.form.resetFields(['tcOFCountryOrRegion']);
    this.setState({ address_is_same: e.target.checked });
  }

  tcOrdercnvalidator (rule, val, callback) {
    const { intl: { formatMessage } } = this.props;
    if (val) {
      val == '5424000000000015' ? callback(formatMessage({ id: 'tc6_17' })) : callback();
    } else {
      callback();
    }
  }

  render () {
    let { isFetching, lang, current, address_is_same, codePrice, ishaveCode, regionData, stateRegionBillList, stateRegionList, shippingData, shippingprice, paymentMehtodData, paymentMehtodIsCC, productList } = this.state;
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

    let _total = 0, _serviceAllprice = 0, _buyAllNumber = 0, _amount = 0;
    let _shippNumber = 1;  // 快递费个数，已tool 2个一组 累计运费
    let _isReserve = false, _isdiagCable = true, _shippingClear = false;
    if (productList.length) {
      productList.map((ob, idx) => {
        if (ob.id != '5') {
          _isReserve = true;
        }
        if (ob.id != '7') {
          _isdiagCable = false;
        } else {
          if (productList.length == 1 && parseFloat(ob.number) <= 1) {
            _isdiagCable = true;
          } else {
            _isdiagCable = false;
          }
        }

        // 判断活动，免运费 ： diag 
        // if (ob.id == '3') {
        //   productList.length == 1 ? _shippingClear = true : _shippingClear = false;
        // }
        // 判断odb 的运费个数
        // if (ob.id == '4') {
        //   if (productList.length == 1 && parseInt(ob.number) <= 2) {
        //     _shippNumber = 1;
        //   } else {
        //     _shippNumber = parseInt(parseInt(ob.number) / 2);
        //     parseInt(parseInt(ob.number) % 2) == 1 && (_shippNumber = _shippNumber + 1)
        //   }
        // }

        _buyAllNumber += parseFloat(ob.number);
        if (ob.service) {
          var _d = getProductByLang(this.props.intl.locale, InitData) || [];
          _d = _d.find(_item => _item.id == ob.id);
          var _service = _d.serviceList.find(_item => _item.id == ob.serviceType);
          _serviceAllprice += ob.number * _service.price;
          _serviceAllprice = parseFloat((_serviceAllprice) * 100) / 100;
        }
        _amount += ob.number * ob.price;
        _amount = parseFloat(_amount * 100) / 100;
      })

      // _shippingClear ? _total = (_amount + _serviceAllprice).toFixed(2) : _total = (_amount + (shippingprice * _shippNumber) + _serviceAllprice).toFixed(2);
      _total = (_amount + (shippingprice * _shippNumber) + _serviceAllprice).toFixed(2);
      _serviceAllprice = _serviceAllprice.toFixed(2);
      ishaveCode && (_total = (parseFloat(_total) - parseFloat(codePrice)).toFixed(2))
    }

    console.log('===_isdiagCable====', _isdiagCable);
    return (
      <div className="tc-order-page">

        <h1 className="text-center tc-title">
          <FormattedMessage id="tc5_1" />
        </h1>
        {
          productList.length > 0 ?
            <Form onSubmit={this.handleSubmit} className="tc-order-form">
              <Row gutter={[_row_span]} >
                <Col className="tc-mobile-col-widthmax" span={16}>
                  <Row>
                    <h2><FormattedMessage id="tc5_2" /></h2>
                  </Row>
                  {/* 国家 ， 邮箱 */}
                  <Row gutter={[_row_span]}>
                    <Col className="tc-mobile-col-widthmax" span={12}>
                      <Form.Item >
                        {getFieldDecorator('tcOFCountryOrRegion', {
                          rules: [{ required: true, message: <FormattedMessage id="tc6_1" /> }],
                        })(
                          <Select
                            showSearch
                            placeholder={formatMessage({ id: "tc5_7" }) + " *"}
                            onChange={this.handleProvinceChange}
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {regionData.map(_item => (
                              <Option key={_item.id} value={_item.id}>{_item.name}</Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col className="tc-mobile-col-widthmax" span={12}>
                      <Form.Item >
                        {getFieldDecorator('tcOrderEmail', {
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
                        {getFieldDecorator('tcOFFirstName', {
                          rules: [{ required: true, message: <FormattedMessage id="tc6_3" /> }],
                        })(
                          <Input placeholder={formatMessage({ id: "tc5_10" }) + " *"} />
                        )}
                      </Form.Item>
                    </Col>
                    <Col className="tc-mobile-col-widthmax" span={12}>
                      <Form.Item >
                        {getFieldDecorator('tcOFLastName', {
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
                        {getFieldDecorator('tcOFStreetAddress', {
                          rules: [{ required: true, message: <FormattedMessage id="tc6_7" /> }],
                        })(
                          <Input placeholder={formatMessage({ id: "tc5_14" }) + " *"} />
                        )}
                      </Form.Item>
                    </Col>
                    <Col className="tc-mobile-col-widthmax" span={12}>
                      <Form.Item>
                        {getFieldDecorator('tcOFStreetAddress2', {
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
                        {getFieldDecorator('tcOFCity', {
                          rules: [{ required: true, message: <FormattedMessage id="tc6_5" /> }],
                        })(
                          <Input placeholder={formatMessage({ id: "tc5_12" }) + " *"} />
                        )}
                      </Form.Item>
                    </Col>
                    <Col className="tc-mobile-col-widthmax" span={12}>

                      <Form.Item >
                        {getFieldDecorator('tcOFStateRegion', {
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
                            {stateRegionList.map(_item => (
                              <Option key={_item.id} value={_item.id}>{_item.name}</Option>
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
                        {getFieldDecorator('tcOFZipCode', {
                          rules: [{ required: true, message: <FormattedMessage id="tc6_8" /> }],
                        })(
                          <Input placeholder={formatMessage({ id: "tc5_16" }) + " *"} />
                        )}
                      </Form.Item>
                    </Col>
                    <Col className="tc-mobile-col-widthmax" span={12}>
                      <Form.Item>
                        {getFieldDecorator('tcOFPhoneNumber', {
                          rules: [{ required: true, message: <FormattedMessage id="tc6_9" /> }],
                        })(
                          <Input placeholder={formatMessage({ id: "tc5_17" }) + " *"} />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row className="tc-text-align-right" style={{ marginBottom: '2%' }}>
                    {/* <span>Billing address</span> */}
                    <FormattedMessage id="tc6_14" />
                    {/* <Icon type="check-circle" style={_ioceStyle} theme="filled" /> */}
                    <Checkbox checked={address_is_same} onChange={this.onChangeAddressIsSame} className="tc_order_address_is_same" />
                    <span style={{ color: '#1C1F86' }}><FormattedMessage id="tc6_15" /></span>
                  </Row>
                  {
                    !address_is_same &&
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
                  }

                  <Row>
                    <h2><FormattedMessage id="tc5_3" /></h2>
                  </Row>
                  {/* 优惠码 */}
                  <Row>
                    {
                      !ishaveCode && <span style={{ color: '#AF0005' }}> * <FormattedMessage id="tc5_8Tip" /></span>
                    }
                    <Form.Item>
                      {getFieldDecorator('tcOFCouponCode', {
                        rules: [{ required: false }],
                      })(
                        <Input
                          onBlur={this.onBlurGetWebRebate}
                          placeholder={formatMessage({ id: "tc5_8" })}
                          suffix={!ishaveCode ?
                            <Tooltip title={formatMessage({ id: "tc5_9" })}>
                              <Icon type="question-circle" style={_ioceStyle} theme="filled" />
                            </Tooltip>
                            : < Tooltip title={formatMessage({ id: "tc5_8" })}>
                              <Icon type="check-circle" style={{ color: '#52c41a' }} theme="filled" />
                            </Tooltip>
                          }
                        />
                      )}
                    </Form.Item>
                  </Row>

                  <Row>
                    <h2><FormattedMessage id="tc5_4" /></h2>
                  </Row>
                  {/* 快递方式 */}
                  <Row className="tc-order-shipping-info">
                    <Form.Item >
                      {shippingData.length && getFieldDecorator('shippingRadio', {
                        initialValue: shippingData[0].id
                      })(
                        <Radio.Group onChange={this.onChangeShippingRadio} style={{ fontSize: '16px', width: '100%', paddingTop: '3%' }}>
                          {
                            shippingData.map((ob) => {
                              // if (_shippingClear && ob.id == "tc_ship_1") return;
                              return <Radio key={'radioList' + ob.id} style={_radioStyle} value={ob.id} disabled={ob.isDisabled ? true : ((ob.id == 'tc_ship_2' && _isdiagCable) ? true : false)}>
                                {/* <span className="tc-shipping-title">{formatMessage({ id: ob.title }) + '' + ((_shippingClear && ob.id == "tc_ship_2") ? ' Shipping Worldwide (2/26-3/30) ' : '')}</span> */}
                                <span className="tc-shipping-title">{formatMessage({ id: ob.title })}</span>
                                <span className="tc-shipping-tc-price " >{"$ " + ob.price}</span>
                                <span className="tc-shipping-tc-dec tc-mobile-shipping-tc-price">{formatMessage({ id: ob.description })}</span>
                              </Radio>
                            })
                          }
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Row>

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
                        productList.length > 0 ?
                          productList.map((ob, idx) => {
                            let _is = InitData._homeApiImgPath + (ob.smimg || 'Application/Api/Public/images/thinkcar1s.png');
                            let _service = null;
                            if (ob.service) {
                              var _d = getProductByLang(this.props.lang, InitData) || [];
                              _d = _d.find(_item => _item.id == ob.id);
                              _service = _d.serviceList.find(_item => _item.id == ob.serviceType);

                            }

                            return <div key={"buyCarList" + ob.id + "and" + ob.serviceType} className="tc-buy-car-list-div">
                              <Row gutter={[10]}>
                                <Col span={4} className="tc-buy-car-img">
                                  <img alt={ob.name} className="think-car-home-price-img" src={_is} />
                                </Col>
                                <Col span={12} style={{ paddingLeft: '15px' }}>
                                  <p className="tc-bc-info-title">{ob.name}</p>
                                  <Row >
                                    X&nbsp;&nbsp;{ob.number}
                                  </Row>
                                  {/* {
                                    ob.id == "3" && <Row className="tc_bcld_diagTip1"><FormattedMessage id="tc5_25" /></Row>
                                  } */}

                                </Col>
                                <Col span={8}>
                                  <p className="tc-bc-info-title2">{"$ " + ob.price}</p>
                                </Col>
                              </Row>
                              {
                                ob.service &&
                                <Row gutter={[10]} className="tc-service-info" style={{ marginTop: '2%' }} >
                                  <span className="tc-bc-info-title"><FormattedMessage id="tcService" /></span>
                                  <span className="tc-bc-info-title2 tc-float-right">{_service.name}&nbsp;&nbsp;&nbsp;${_service.price}</span>
                                </Row>
                              }

                            </div>
                            // <p key={"listCar" + ob.name + idx}>{ob.name + ' ' + ob.number + ' = ' + ob.price}</p>
                          })
                          : <Empty />
                      }

                      {
                        productList.length > 0 &&
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
                            <Col span={12} ><FormattedMessage id="tcShipping" /></Col>
                            {/* <Col span={12} className="tc-title2 tc-text-align-right">+${_shippingClear ? 0 : shippingprice * _shippNumber}</Col> */}
                            <Col span={12} className="tc-title2 tc-text-align-right">+${shippingprice * _shippNumber}</Col>
                          </Row>
                          {/* <Row className="tc-row-5">
                        <Col span={12} ><FormattedMessage id="tcAmount" /></Col>
                        <Col span={12} className="tc-title2 tc-text-align-right">+${_serviceAllprice}</Col>
                      </Row> */}
                          {
                            ishaveCode && <Row className="tc-row-5">
                              <Col span={12} ><FormattedMessage id="tcDiscount" /></Col>
                              <Col span={12} className="tc-title2 tc-text-align-right">-${codePrice}</Col>
                            </Row>
                          }
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
const Order = Form.create({ name: 'order' })(OrderForm);
export default injectIntl(Order)