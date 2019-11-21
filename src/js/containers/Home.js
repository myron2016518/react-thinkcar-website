import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Form, Icon, Input, Button, Checkbox, message, Select, Row, Col, List, Modal, Tabs, Carousel, Card } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request, { getSign, deepObjectMerge, getQueryStringArgs, getInitDataByLang, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'
import ThinkcarTransportPage from './ThinkcarTransportPage'

import '../../css/style.scss'

const { Meta } = Card;
const TabPane = Tabs.TabPane;
//const operations = ;
//const Option = Select.Option;

class HomeForm extends React.Component {
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

  }
  componentDidMount () {
    //let qryArgs = getQueryStringArgs();
    // this.initFun(this.props)
  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (_pr) {
    var _list = getProductByLang(_pr.intl.locale, _pr.InitData) || [];
    _list && this.setState({ productList: _list });
  }

  onClickStoreProduct (_id) {
    if (_id == '3') {
      window.location.href = 'https://ks.mythinkcar.com/';
    } else {
      this.props.history.push(`/ProductPage/${_id}/t1`)
    }
  }
  onCickPoint () {
    this.props.history.push(`/pointdetail`)
  }
  onCickGoVideo (_ty) {
    this.props.history.push(`/video/${_ty}`)
  }
  render () {
    let { isFetching, addDeviceModalVisible, deviceList, activeKey, productList } = this.state;
    let { InitData, intl } = this.props;
    var _dl = getProductByLang(intl.locale, InitData) || [];
    return <div className="main-content ">

      <Carousel className="binnerList" autoplay>
        <img key="tc-Carousel-1" onClick={() => { this.onClickStoreProduct('3') }} alt="example" className='think-car-home-price-img' src={`${InitData._homeImgPath}/Home/img${InitData._isPcOrMobile ? '' : '/mobile'}/binner1.jpg`} />
        <img key="tc-Carousel-2" onClick={() => { this.onClickStoreProduct('1') }} alt="example" className='think-car-home-price-img' src={`${InitData._homeImgPath}/Home/img${InitData._isPcOrMobile ? '' : '/mobile'}/binner2.jpg`} />
      </Carousel>
      <Row className="thinkCar-price1 think-car-padding10 think-car-home-tip1-h1"><h1><FormattedMessage id="thinkCarHomeTip1" /></h1></Row>
      <Row className="thinkCar-price1 think-car-padding10 think-car-home-tip2" >

        {
          _dl.length && _dl.map((_item, _idx) => {
            let _is;
            switch (_item.id) {
              case '1':
                _is = InitData._homeImgPath + "/Home/img/product_2.png";
                break;
              case '2':
                _is = InitData._homeImgPath + "/Home/img/product_3.png";
                break;
              case '3':
                _is = InitData._homeImgPath + "/Home/img/product_1.png";
                break;
              default:
                _is = InitData._homeImgPath + "/Home/img/product_2.png";
            }
            // let _is = InitData._homeApiImgPath + (_item.smimg || '/Application/Api/Public/images/thinkcar1s.png');
            return <Col key={"index_product_" + _item.id} className="think-car-home-padding-lef5 tc-mobile-col-widthmax" span={8}>
              <Card
                hoverable
                bordered={false}
                className="think-car-home-img-bk"
                onClick={() => { this.onClickStoreProduct(_item.id) }}
                cover={<img key="tc-card-cover-1" alt={_item.name} className='think-car-home-img' src={_is} />}
              >
                <Meta style={{ minHeight: '180px' }} title={_item.name} description={[
                  <span key="tc-card-meta-1" style={{ color: '#000' }}>{_item.description} </span>,
                  <p key="tc-card-meta-2" className="think-car-home-money-tip">
                    {_item.id == '3' ? 'Pre-order coming soon' : "$" + _item.price}
                  </p>]}
                />
              </Card>
            </Col>
          })
        }



      </Row>
      {
        InitData._isPcOrMobile ?
          <Row>
            <Row className=" think-car-home-price-img" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img1} />
            </Row>
            <Row className="thinkCar-price1 think-car-padding10 think-car-margin-top-20" >

              <Col className="think-car-home-padding-lef5 tc-mobile-col-widthmax" span={12} onClick={() => { this.onCickGoVideo('video_id1') }} style={{ cursor: 'pointer' }}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img2} />
              </Col>
              <Col className="think-car-home-padding-lef5 tc-mobile-col-widthmax" span={12}>
                <img onClick={() => { this.onCickGoVideo('video_id3') }} style={{ cursor: 'pointer' }} alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img3} />
                <img onClick={() => { this.onCickGoVideo('video_id2') }} style={{ cursor: 'pointer' }} alt="THINKCAR" className="think-car-home-price-img think-car-margin-top-3" src={InitData._homeImgPath + InitData._indexImgAll.img4} />
              </Col>
            </Row>
            <Row className=" think-car-margin-top-20 think-car-home-price-img" onClick={() => { this.onCickGoVideo('video_id4') }} style={{ cursor: 'pointer' }} >
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexImgAll.img5} />
            </Row>
          </Row>
          :
          <Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img1} />
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id1') }} style={{ cursor: 'pointer' }}>
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img2} />
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id3') }} style={{ cursor: 'pointer' }}>
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img3} />
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id2') }} style={{ cursor: 'pointer' }}>
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img4} />
            </Row>
            <Row className=" think-car-home-price-img tc-padding-top-1" onClick={() => { this.onCickGoVideo('video_id4') }} style={{ cursor: 'pointer' }}>
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._indexMobileImgAll.img5} />
            </Row>

          </Row>
      }

      <ThinkcarTransportPage />



      <Loading loading={isFetching} />
    </div >
    // : <Redirect to="/login" />
  }
}
const Home = Form.create({ name: 'home' })(HomeForm);
export default injectIntl(Home)