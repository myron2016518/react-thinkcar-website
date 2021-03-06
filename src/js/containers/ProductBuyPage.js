import React from 'react'
//import {Link} from 'react-router-dom'
// import { connect } from "react-redux";
// import { getTodos } from "../redux/selectors";
// import { getTodosByVisibilityFilter } from "../redux/selectors";
// import { VISIBILITY_FILTERS } from "../constants";

import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Icon, Carousel, Radio, InputNumber, Checkbox } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
// import config from '../../public/config'
import Loadable from '../components/loadable'
import request, { _requestWebUrlOrBtnClick, _assessClick, browserRedirect, getProductByLang } from '../../public/common';

import Loading from '../components/Loading'
// import ThinkcarTransportPage from './ThinkcarTransportPage'
const ThinkcarTransportPage = Loadable(() => import('./ThinkcarTransportPage'));

class ProductBuyPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      productObj: { imgListP: [], serviceList: [] },
      buyNumber: 1,
      selectService: [],
      currTab: '',
    }

    this.productBuyBtn = this.productBuyBtn.bind(this)//购买
    this.onChangeType = this.onChangeType.bind(this)//
    this.onChangeServiceType = this.onChangeServiceType.bind(this)//
    this.onChangeBuyNumber = this.onChangeBuyNumber.bind(this)//
    this.onChangeServiceCheckbox = this.onChangeServiceCheckbox.bind(this)//
    this.productAddCart = this.productAddCart.bind(this)//加入购物车
    this.quantityBtnClick = this.quantityBtnClick.bind(this)//添加数量
    this.onClickProductTab = this.onClickProductTab.bind(this)//
    this.initFun = this.initFun.bind(this)
    this.onCickPoint = this.onCickPoint.bind(this)
    this.goToAmazon = this.goToAmazon.bind(this)

  }
  componentDidMount () {
    this.initFun()
    // console.log('=====productbuy=====', this.props);
    // const { visibilityFilter } = state;
    // const todos = getTodosByVisibilityFilter(state, visibilityFilter);

  }
  componentWillReceiveProps (newProps) {
    // console.log('=====newProps=====', newProps);
    // this.initFun(newProps)
  }
  initFun () {
    // (this.props.match.params.id == '5' || this.props.match.params.id == '2') && this.props.history.push('/'); //下架thinkcar 1
    if (this.props.match.params.id) {
      var _d = getProductByLang(this.props.intl.locale, this.props.InitData) || [];
      let _find = _d.find(_item => _item.id == this.props.match.params.id);
      // console.log('===============================', _find);
      _find && this.setState({ productObj: _find });
      // if (_find) {
      //   (_find.status == '1') ? this.setState({ productObj: _find }) : this.props.history.push('/');
      // }
      _assessClick(`product/${this.props.match.params.id}/buy`);
    }

  }

  productBuyBtn () {
    // console.log(this.props.match.params.id);
    var _g = {
      id: this.state.productObj.id,
      number: this.state.buyNumber,
      service: false,
      serviceType: '0',
    };
    if (this.state.selectService.length) {
      var _findo = this.state.productObj.serviceList.find(tl => tl.id == this.state.selectService[0]);
      _findo && (_g.service = true, _g.serviceType = _findo.id);
    }
    // _requestWebUrlOrBtnClick({ "body": { "tab": "/order/buynow/" + this.props.match.params.id, "button": "buynow" + this.props.match.params.id } });
    this.props.history.push('/order/buynow/' + JSON.stringify(_g))
  }
  onChangeType (e) {
    // console.log('radio checked', e.target.value);
    var _d = getProductByLang(this.props.intl.locale, this.props.InitData) || [];
    var _findo = _d.find(tl => tl.id == e.target.value);
    _findo && this.setState({ productObj: _findo, selectService: [], buyNumber: 1 });
  };
  onChangeServiceType (e) {
    // console.log('radio checked', e.target.value);
    var _findo = this.state.productObj.serviceList.find(tl => tl.id == e.target.value);
    // _findo && this.setState({ selectService: _findo, });
  };
  onChangeServiceCheckbox (e) {
    // console.log(`checked = `, e);
    var _l = e.length ? [e[e.length - 1]] : [];
    this.setState({ selectService: _l });
    // var _findo = this.state.productObj.service.find(tl => tl.id == e.target.value);
  }
  onChangeBuyNumber (val) {
    this.setState({ buyNumber: val });
  }
  quantityBtnClick (_type) {

    this.setState({ buyNumber: _type === 'add' ? this.state.buyNumber + 1 : this.state.buyNumber > 1 ? this.state.buyNumber - 1 : 1 });
  }
  productAddCart () {

    var _obj = objectAssign({}, this.state.productObj, { number: this.state.buyNumber, serviceType: '0', service: false });
    if (this.state.selectService.length) {
      var _findo = this.state.productObj.serviceList.find(tl => tl.id == this.state.selectService[0]);
      _findo && (_obj.service = true, _obj.serviceType = _findo.id);
    }
    this.props.headerShowBuy(_obj);
    _requestWebUrlOrBtnClick({ "body": { "tab": "addBuyCar", "button": "addbuycar" + this.props.match.params.id } });
  }

  onClickProductTab (_type) {
    _type === 'home' ? this.props.history.push('/') : this.props.history.push(`/product/${this.state.productObj.id}/${_type}`);
  }

  onCickPoint () {
    // _requestWebUrlOrBtnClick({ "body": { "tab": "/pointdetail", "button": "pointdetail" } });
    this.props.history.push(`/pointdetail`)
  }
  goToAmazon () {
    _requestWebUrlOrBtnClick({ "body": { "tab": "gotoAmazon", "button": "amazon" } });
    window.location.href = 'https://www.amazon.com/THINKDIAG-Professional-Automotive-Scanner-Diagnostic/dp/B08464JLWF/ref=sr_1_2?keywords=thinkdiag&qid=1582830686&sr=8-2';
  }

  render () {
    let { isFetching, productObj, buyNumber, selectService, currTab } = this.state;
    let { InitData } = this.props;
    let _isMob = browserRedirect();
    const radioStyle = {
      display: 'block',
      border: '1px solid #e8e8e8',
      padding: '3%',
      marginBottom: '2%',
      marginRight: '0px',
    };
    const _ioceStyle = {
      color: '#AF0005',
      fontSize: '16px',
      verticalAlign: 'middle',
      marginLeft: '2%',
    };
    // let _total = buyNumber * productObj.price || 0;
    // if (selectService.length) {
    //   var _findo = productObj.service.find(tl => tl.id == selectService[0]);
    //   _total = (productObj.price + _findo.price) * buyNumber;
    // }

    let _tabHtml = <Row>
      <Col span={13} className="tc-product-buy-title-tip1 tc-mobile-col-widthmax" >{productObj.name}</Col>
      <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t1')}><FormattedMessage id="tcProductTabs1" /></Col>
      <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t2')}><FormattedMessage id="tcProductTabs2" /></Col>
      <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t3')}><FormattedMessage id="tcProductTabs3" /></Col>
      <Col span={3} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t5')}><FormattedMessage id="tcProductTabs5" /></Col>
    </Row>;


    (productObj.id == '4' || productObj.id == '6' || productObj.id == '5') && (_tabHtml = <Row>
      <Col span={13} className="tc-product-buy-title-tip1 tc-mobile-col-widthmax" >{productObj.name}</Col>
      <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t1')}><FormattedMessage id="tcProductTabs1" /></Col>
      <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t2')}><FormattedMessage id="tcProductTabs2" /></Col>
      <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t3')}><FormattedMessage id="tcProductTabs3" /></Col>
    </Row>);

    (productObj.id == '7') && (_tabHtml = <Row>
      <Col span={13} className="tc-product-buy-title-tip1 tc-mobile-col-widthmax" >{productObj.name}</Col>
    </Row>);

    // console.log('========productObj======', productObj);

    return (
      <div className="tc-product-page tc-product-buy-page">
        <div className="tc-product-buy-title tc-mobile-product-buy-title">
          {_tabHtml}
          {/* <Row>
            <Col span={15} className="tc-product-buy-title-tip1 tc-mobile-col-widthmax" onClick={() => this.onClickProductTab('home')}>{productObj.name}</Col>
            <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t1')}><FormattedMessage id="tcProductTabs1" /></Col>
            <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t3')}><FormattedMessage id="tcProductTabs3" /></Col>
            <Col span={3} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3`} onClick={() => this.onClickProductTab('t5')}><FormattedMessage id="tcProductTabs5" /></Col>
          </Row> */}
        </div>
        <Row className="thinkCar-price1 think-car-padding10 tc-product-buy-info-main" >
          <Col className="think-car-home-padding-lef5 tc-mobile-col-widthmax" span={12}>
            <Carousel effect="fade" autoplay>
              {
                productObj.imgListP.length && productObj.imgListP.map((_x, _d) => {
                  return <div key={`imgListP_id_${_d}`}>
                    <img alt={productObj.name} style={{ width: '50%' }} className="think-car-home-price-img" src={InitData._homeImgPath + _x.url} />
                  </div>
                })
              }

            </Carousel>

          </Col>
          <Col className="think-car-home-padding-lef5 tc-product-buy-info tc-mobile-col-widthmax" span={12}>
            <Row>
              <h1 >{productObj.name}</h1>
            </Row>
            <Row>
              {/* <span>{productObj.description}</span> */}
              {productObj.description && <FormattedMessage id={productObj.description} />}

            </Row>
            {/* <Row className="tc-title2" >
              {
                productObj.id == '3' ?
                  <span style={{ color: '#000', fontWeight: '400' }}>
                    <FormattedMessage id="tcPresale" />
                    <Icon type="question-circle" style={_ioceStyle} theme="filled" />
                  </span>
                  : <FormattedMessage id="tcModel" />}
            </Row> */}
            <Row className="tc-title2" > <FormattedMessage id="tcModel" /></Row>
            <Row>
              {/* {
                productObj.id == '3' && <Row className="tc-product-buy-diag-presale">
                  <FormattedMessage id="tcProductBuyBuyDiagTip1" />
                  <span style={{ float: 'right' }}>$189.95</span>
                </Row>
              } */}
              <Radio.Group onChange={this.onChangeType} value={productObj.id} style={{ fontSize: '16px', width: '100%' }}>
                {

                  getProductByLang(this.props.intl.locale, InitData).map((ob) => {
                    let _item = null;
                    if (ob.id === '10' || ob.id === '11') return;
                    // if (productObj.id == '3') {
                    //   ob.id === '3' && (
                    //     _item = <Radio key={'radioList' + ob.name} style={radioStyle} value={ob.id}>
                    //       <span >{ob.name}</span>
                    //       <span style={{ float: 'right' }}>{"$ " + ob.price}</span>
                    //       <span style={{ float: 'right', paddingRight: '5%' }}><FormattedMessage id="tcProductBuyBuyPrepayments" /></span>
                    //     </Radio>
                    //   )
                    // } else {
                    (ob.status == '1') && (
                      _item = <Radio key={'radioList' + ob.name} style={radioStyle} value={ob.id}>
                        <span style={{ overflow: 'hidden', width: '50%', display: 'inline-grid', }} >{ob.name}</span>
                        <span style={{ float: 'right' }}>{"$ " + ob.price}</span>
                      </Radio>
                    )
                    // }
                    return _item;

                  })
                }
              </Radio.Group>
            </Row>

            {
              (productObj.serviceList.length > 0 || productObj.id == '3') && <Row className="tc-title3" > <FormattedMessage id="tcService" /></Row>
            }
            {
              (productObj.serviceList.length > 0 || productObj.id == '3') && <Row style={{ paddingBottom: '10px' }}>
                {productObj.serviceTip && <FormattedMessage id={productObj.serviceTip} />}
                {/* <Row className="tc_bcld_diagTip1"><FormattedMessage id="tc5_25" /></Row> */}
              </Row>
            }
            {
              productObj.serviceList.length > 0 && <Row className="tc-service-info"  >
                <Checkbox.Group style={{ fontSize: '16px', width: '100%', paddingTop: '3%' }} onChange={this.onChangeServiceCheckbox} value={selectService}>
                  {
                    productObj.serviceList.length > 0 && productObj.serviceList.map((ob) =>
                      <Checkbox checked={ob.ischeck} value={ob.id} style={radioStyle} key={ob.id + "pd" + new Date().getTime()}>
                        <span >{ob.name}</span>
                        <span style={{ paddingRight: '5px', float: 'right' }}>{"$ " + ob.price}</span>
                      </Checkbox>
                    )
                  }
                </Checkbox.Group>
              </Row>
            }
            {productObj.id == '5' && <Row style={{ color: '#B90000' }}>
              <p ><FormattedMessage id="tc4_4" /></p>
              <p >IncludingThinkTool,printer,printingpaper(2rolls),ThinkDiag,</p>
              <p >ThinkDiagbox,worklight,videoscope,diagnosticcable,</p>
              <p >ThinkToolmoduledock,andALL37softwareFREEforoneyear.</p>
            </Row>}
            {productObj.id == '8' && <Row >
              <p >Software Service. </p>
              <p >One Free Full Vehicle Diagnosis</p>
              <p >Two Free Maintenance Reset</p>
            </Row>}

            <Row className="tc-title3" >
              <FormattedMessage id="tcQuantity" />
            </Row>
            <Row gutter={[4]} className="think-car-margin-top-3">
              <Col span={3}>
                <Button className="tc-buyNumberInfoStyle" icon="plus" onClick={() => this.quantityBtnClick('add')} />
              </Col>
              <Col span={18}>
                <InputNumber className="tc-buyNumberInfoStyle" min={1} value={buyNumber} onChange={this.onChangeBuyNumber} />
              </Col>
              <Col span={3}>
                <Button className="tc-buyNumberInfoStyle" icon="minus" onClick={() => this.quantityBtnClick('minus')} />
              </Col>
            </Row>
            {/* <Row>
              {'运输方式'}
            </Row>
            <Row>
              <Radio.Group onChange={this.onChangeType} value={productObj.name}>
                <Radio key={'radioList1'} style={radioStyle} value={'radioList1'}>快运 <span>meeiguo</span></Radio>
                <Radio key={'radioList2'} style={radioStyle} value={'radioList2'}>免费</Radio>
              </Radio.Group>
            </Row> */}

            {/* <Row style={{ marginTop: '5%' }}>
              <span >总计</span>
              <span style={{ paddingLeft: '50%' }}>{"$" + _total}</span>
            </Row> */}

            <Row gutter={[16]} style={{ marginTop: '5%' }}>
              <Col span={12}><Button className="tc-buy-btn tc-buy-btn-addBuy" onClick={this.productBuyBtn} ><FormattedMessage id="tcProductBuyBuyNow" /></Button></Col>
              <Col span={12}><Button className="tc-buy-btn tc-buy-btn-nowBuy" onClick={this.productAddCart} ><FormattedMessage id="tcProductBuyAddCart" /></Button></Col>
            </Row>
            {
              productObj.id == '3' && <Row gutter={[16]} className="tc_pb_am" >
                <Button className="tc-buy-btn tc_pbam_btn" onClick={this.goToAmazon} >BUY ON AMAZON</Button>
              </Row>
            }

          </Col>
        </Row>
        <Row className="thinkCar-price1" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
          <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + "/Home/img" + (_isMob ? '' : '/mobile') + "/point.jpg"} />
        </Row>
        <ThinkcarTransportPage />

        <Loading loading={isFetching} />
      </div>
    )
  }
}

export default injectIntl(ProductBuyPage)
// export default connect()(injectIntl(ProductBuyPage));
