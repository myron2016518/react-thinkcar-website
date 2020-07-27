import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Card, Button } from 'antd';
import { Carousel } from 'antd-mobile';
import Lazyload from 'react-lazyload';
import Loadable from '../components/loadable'
import { _requestWebUrlOrBtnClick, _assessClick, browserRedirect, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'
// import ThinkcarTransportPage from './ThinkcarTransportPage'
const ThinkcarTransportPage = Loadable(() => import('./ThinkcarTransportPage'));

const { Meta } = Card;
//const operations = ;
//const Option = Select.Option;

class HomePage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      addDeviceModalVisible: false,
      deviceList: [],
      productList: [],
      activeKey: '1'

    }
    this.initFun = this.initFun.bind(this)
    this.onClickStoreProduct = this.onClickStoreProduct.bind(this)
    this.onCickPoint = this.onCickPoint.bind(this)
    this.onCickGoVideo = this.onCickGoVideo.bind(this)
    this.goToKickstarterGuidlinePath = this.goToKickstarterGuidlinePath.bind(this)

  }
  componentDidMount () {
    //let qryArgs = getQueryStringArgs();
    // this.initFun(this.props)
    _assessClick('index');
  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (_pr) {
    var _list = getProductByLang(_pr.intl.locale, _pr.InitData) || [];
    _list && this.setState({ productList: _list });
  }

  onClickStoreProduct (_id, _type) {
    // if (_id == '3') {
    //   let _tab = _type == 'banner' ? '/banner_kickstarter' : 'index_productlist_kickstarter';
    //   window.open('https://www.kickstarter.com/projects/ericwang/thinkdiag-your-professional-car-technician-diagnostic-tool?ref=4isoa7')
    //   // window.location.href = 'https://www.kickstarter.com/projects/ericwang/thinkdiag-your-professional-car-technician-diagnostic-tool?ref=4isoa7';
    // } else {
    _requestWebUrlOrBtnClick({ "body": { "tab": `/product/${_id}/t1`, "button": `product${_id}` } });
    this.props.history.push(`/product/${_id}/t1`)
    // }
  }
  onCickPoint () {
    // _requestWebUrlOrBtnClick({ "body": { "tab": "/pointdetail", "button": "pointdetail" } });
    this.props.history.push(`/pointdetail`)
  }
  onCickGoVideo (_ty) {
    // _requestWebUrlOrBtnClick({ "body": { "tab": `/video/${_ty}`, "button": `video${_ty}` } });
    this.props.history.push(`/video/${_ty}`)
  }
  goToKickstarterGuidlinePath () {
    // window.open('https://www.kickstarter.com/projects/ericwang/thinktpms-g1-your-smarttire-pressure-diagnostic-tool')
    _assessClick('index/banner');
    this.props.history.push(`/thinktpms`);
  }
  render () {
    let { isFetching, addDeviceModalVisible, deviceList, activeKey, productList } = this.state;
    let { InitData, intl } = this.props;
    var _dl = getProductByLang(intl.locale, InitData) || [];
    let _isMo = browserRedirect();
    return <div className="main-content ">

      <Carousel autoplay infinite className="binnerList" >
        {/* <Row key="tc-Carousel-1" onClick={this.goToKickstarterGuidlinePath}>
          <img
            alt="thinkcar" className='think-car-home-price-img tc_cursor_pointer'
            src={`${InitData._homeImgPath}/Home/img${_isMo ? '' : '/mobile'}/binner1-4.jpg`}
          />
          <Row className="tc-home-banner-btn-row">
            <Button type="primary" size={"large"} className="tc_home_bt2" >{this.props.intl.formatMessage({ id: 'tc4_6' }).toLocaleUpperCase()}</Button>
          </Row>
        </Row> */}
        <img key="tc-Carousel-2" onClick={() => { this.goToKickstarterGuidlinePath() }} alt="example" className='think-car-home-price-img' src={`${InitData._homeImgPath}/Home/img${_isMo ? '' : '/mobile'}/binner1.jpg`} />
      </Carousel>

      {/* <Row onClick={this.goToKickstarterGuidlinePath}>
        <Lazyload throttle={200} height={300}>
          <img
            alt="thinkcar"
            className='think-car-home-price-img tc_cursor_pointer'
            // className='think-car-home-price-img '
            src={`${InitData._homeImgPath}/Home/img${_isMo ? '' : '/mobile'}/binner1-4.jpg`}
          />
        </Lazyload>
        <Row className="tc-home-banner-btn-row">
          <Button type="primary" size={"large"} className="tc_home_bt2" >{this.props.intl.formatMessage({ id: 'tc4_6' }).toLocaleUpperCase()}</Button>
        </Row>
      </Row> */}


      <Row className="thinkCar-price1 think-car-padding10 think-car-home-tip1-h1"><h1><FormattedMessage id="tc4_1" /></h1></Row>
      <Row className="thinkCar-price1 think-car-padding10 think-car-home-tip2" >

        {
          _dl.length && _dl.map((_item, _idx) => {
            if (_item.status == '0' || _item.id == '1' || _item.id == '6' || _item.id == '7' || _item.id == '10' || _item.id == '11') return;
            let _is;
            let _listHt = [
              <span key={"tc-card-meta-1" + _idx} className="tc-home-description" style={_isMo ? { height: '60px' } : {}}><FormattedMessage id={_item.description} /> </span>,
              <p key={"tc-card-meta-2" + _idx} className="think-car-home-money-tip">
                {(_item.status == '2' && _item.id != '8') ? <FormattedMessage id="tcDiagTip1" /> : "$" + _item.price}
              </p>];
            switch (_item.id) {
              case '1':
                _is = InitData._homeImgPath + "/Home/img/product_2.png";
                break;
              case '2':
                _is = InitData._homeImgPath + "/Home/img/product_3.png";
                break;
              case '3':
                _is = InitData._homeImgPath + "/Home/img/product_1.png";
                _listHt = [
                  <span key={"tc-card-meta-1" + _idx} className="tc-home-description" style={_isMo ? { height: '60px' } : {}}><FormattedMessage id={_item.description} /> </span>,
                  <p key={"tc-card-meta-2" + _idx} className="think-car-home-money-tip">
                    <span className="tc_hot_c"><FormattedMessage id="tcHot" />
                    </span> {"  $" + _item.price} </p>]
                break;
              case '4':
                _is = InitData._homeImgPath + "/Home/img/product_4.png";
                // RESERVE 样式
                // _listHt = [
                //   <span key={"tc-card-meta-1" + _idx} className="tc-home-description" style={_isMo ? { height: '60px' } : {}} > <FormattedMessage id={_item.description} /> </span>,
                //   <p key={"tc-card-meta-2" + _idx} style={{ color: "#B90000" }} className="think-car-home-money-tip"> <FormattedMessage id="tcRESERVE" />{"  $" + _item.price} </p>]
                break;
              case '5':
                _is = InitData._homeImgPath + "/Home/img/product_5.png";
                // RESERVE 样式
                // _listHt = [
                //   <span key={"tc-card-meta-1" + _idx} className="tc-home-description" style={_isMo ? { height: '60px' } : {}} > <FormattedMessage id={_item.description} /> </span>,
                //   <p key={"tc-card-meta-2" + _idx} style={{ color: "#B90000" }} className="think-car-home-money-tip"> <FormattedMessage id="tcDeposit" />{"  $" + _item.price} </p>]
                break;
              case '6':
                _is = InitData._homeImgPath + "/Home/img/product_6.png";
                break;
              case '8':
                _is = InitData._homeImgPath + "/Home/img/product_8.png";
                _listHt = [
                  <span key={"tc-card-meta-1" + _idx} className="tc-home-description" style={_isMo ? { height: '60px' } : {}} > <FormattedMessage id={_item.description} /> </span>,
                  <p key={"tc-card-meta-2" + _idx} className="think-car-home-money-tip">{"  $" + _item.price} </p>]
                break;
              default:
                _is = InitData._homeImgPath + "/Home/img/product_2.png";
            }
            // let _is = InitData._homeApiImgPath + (_item.smimg || '/Application/Api/Public/images/thinkcar1s.png');
            return <Col key={"index_product_" + _item.id} className="think-car-home-padding-lef5 tc-mobile-col-widthmax" span={6}>
              <Card
                hoverable
                bordered={false}
                className="think-car-home-img-bk"
                onClick={() => { this.onClickStoreProduct(_item.id) }}
                cover={
                  <Lazyload throttle={200} height={300} key="tc-card-cover-1">
                    <img alt={_item.name} className='think-car-home-img' src={_is} />
                  </Lazyload>
                }
              >
                <Meta style={{ minHeight: '180px' }} title={_item.name} description={_listHt} />
              </Card>
            </Col>
          })
        }



      </Row>
      {
        _isMo ?
          <Row>
            <Row className=" think-car-home-price-img" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
              <Lazyload throttle={200} height={300}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img1} />
              </Lazyload>
            </Row>
            <Row className="thinkCar-price1 think-car-padding10 think-car-margin-top-20" >
              <Col className="think-car-home-padding-lef5 tc-mobile-col-widthmax" span={12} onClick={() => { this.onCickGoVideo('video_id1') }} style={{ cursor: 'pointer' }}>
                <Lazyload throttle={200} height={300}>
                  <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img2} />
                </Lazyload>
              </Col>
              <Col className="think-car-home-padding-lef5 tc-mobile-col-widthmax" span={12}>
                <Lazyload throttle={200} height={300}>
                  <img onClick={() => { this.onCickGoVideo('video_id3') }} style={{ cursor: 'pointer' }} alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img3} />
                </Lazyload>
                <Lazyload throttle={200} height={300}>
                  <img onClick={() => { this.onCickGoVideo('video_id2') }} style={{ cursor: 'pointer' }} alt="THINKCAR" className="think-car-home-price-img think-car-margin-top-3" src={InitData._homeImgPath + InitData._indexImgAll.img4} />
                </Lazyload>
              </Col>
            </Row>
            <Row className=" think-car-margin-top-20 think-car-home-price-img" onClick={() => { this.onCickGoVideo('video_id4') }} style={{ cursor: 'pointer' }} >
              <Lazyload throttle={200} height={300}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img5} />
              </Lazyload>
            </Row>
          </Row>
          :
          <Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
              <Lazyload throttle={200} height={300}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img1} />
              </Lazyload>
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id1') }} style={{ cursor: 'pointer' }}>
              <Lazyload throttle={200} height={300}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img2} />
              </Lazyload>
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id3') }} style={{ cursor: 'pointer' }}>
              <Lazyload throttle={200} height={300}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img3} />
              </Lazyload>
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id2') }} style={{ cursor: 'pointer' }}>
              <Lazyload throttle={200} height={300}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img4} />
              </Lazyload>
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id4') }} style={{ cursor: 'pointer' }}>
              <Lazyload throttle={200} height={300}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img5} />
              </Lazyload>
            </Row>

          </Row>
      }
      <Lazyload throttle={200} height={300}>
        <ThinkcarTransportPage />
      </Lazyload>

      <Loading loading={isFetching} />
    </div >
    // : <Redirect to="/login" />
  }
}

export default injectIntl(HomePage)