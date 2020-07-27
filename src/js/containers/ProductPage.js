import React from 'react'
//import {Link} from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Card, Empty, Collapse, Button, Affix } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
// import config from '../../public/config'
import Lazyload from 'react-lazyload';
import Loadable from '../components/loadable'
import request, { _requestWebUrlOrBtnClick, _assessClick, browserRedirect, transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'
// import HistoryTask from './HistoryTask'
// import InitData from '../components/InitData'
// import ThinkcarProblemPage from './ThinkcarProblemPage'
// import ThinkDiagProblemPage from './ThinkDiagProblemPage'
// import ThinkcarTransportPage from './ThinkcarTransportPage'
// import TcPDBPage from './TcPDBPage'
// import TcPopUpLayer from '../components/TcPopUpLayer'

const ThinkcarProblemPage = Loadable(() => import('./ThinkcarProblemPage'));
const ThinkDiagProblemPage = Loadable(() => import('./ThinkDiagProblemPage'));
const ThinkcarTransportPage = Loadable(() => import('./ThinkcarTransportPage'));
const ScanS0 = Loadable(() => import('./thinkscanSeries/ScanS0'));
const TcPDBPage = Loadable(() => import('./TcPDBPage'));
const TcPopUpLayer = Loadable(() => import('../components/TcPopUpLayer'));


const { Meta } = Card;
const { Panel } = Collapse;

class ProductPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      productObj: { 'imgList': [], 'parameter': [] },
      currTab: this.props.match.params.tabs || 't1',
      videoBannerPath: 'https://www.youtube.com/embed/CCJR1pGoQ2Q',
      videoTitle: 'OBD Using',
      toolTab: 'tooli2tab001',  // tool 产品功能选择
      toolCollapseCurrent: '1',
      toolCollapseCurrentImages: '',
      _diagRandom: 'origin', // diag 进入随机页
    }

    this.productBuyBtn = this.productBuyBtn.bind(this)//购买
    this.initFun = this.initFun.bind(this)
    this.onClickProductTab = this.onClickProductTab.bind(this)//点击导航
    this.onCickPoint = this.onCickPoint.bind(this)
    this.openTcPopUpLayer = this.openTcPopUpLayer.bind(this)
    this.productImgBuyBtn = this.productImgBuyBtn.bind(this)
    this.getPlusImgTxtByIndex = this.getPlusImgTxtByIndex.bind(this)
    this.getToolImgTxtByIndex = this.getToolImgTxtByIndex.bind(this)
    this.tcPitiToolIndx4Collapse = this.tcPitiToolIndx4Collapse.bind(this)
    this.tcPitiToolDetail = this.tcPitiToolDetail.bind(this)  // tool banner click detail
    this._getImg = this._getImg.bind(this)
    this.buyNowBtn = this.buyNowBtn.bind(this)

  }
  componentDidMount () {
    // this.initFun(this.props)		
    // console.log('==============================', this.props);
    this.initFun(this.props)
  }
  componentWillReceiveProps (newProps) {
    // console.log('=====newProps========', newProps, this.props);
    let _d = newProps.location.pathname !== this.props.location.pathname ? {
      productObj: { 'imgList': [], 'parameter': [] }, currTab: 't1'
    } : {
        productObj: { 'imgList': [], 'parameter': [] }
      }
    this.setState(_d, () => {
      this.initFun(newProps)
    })
  }
  initFun (props) {
    // (this.props.match.params.id == '2') && this.props.history.push('/');  //下架thinkcar 1
    console.log("===props.randompage===", props.randompage);
    this.setState({
      _diagRandom: props.randompage || ""
      // _diagRandom: "gogo"
    })
    if (props.match.params.id) {
      var _d = getProductByLang(props.intl.locale, props.InitData) || [];
      let _find = _d.find(_item => _item.id == props.match.params.id);
      if (_find) {
        this.setState({ productObj: _find })
        // _find.status == '0' ? this.props.history.push('/') : this.setState({ productObj: _find });
      }
      // props.match.params.id == '3' && this.setState({ currTab: 't1' })
      _assessClick("product/" + props.match.params.id);
    }
  }

  productBuyBtn () {
    // console.log(this.props.match.params.id);
    // this.props.match.params.id != '3' && this.props.history.push('/productbuy/' + this.props.match.params.id)

    // if (this.props.match.params.id == '8') {
    //   _requestWebUrlOrBtnClick({ "body": { "tab": `/ProductBuy_kickstarter_driver`, "button": `productbuy` } });
    //   window.open('https://www.kickstarter.com/projects/ericwang/thinkdriver-intelligent-vehicle-scanner?ref=8w2adq')
    //   // window.location.href = 'https://www.kickstarter.com/projects/ericwang/thinkdiag-your-professional-car-technician-diagnostic-tool?ref=4isoa7';
    // } else {
    _requestWebUrlOrBtnClick({ "body": { "tab": this.state._diagRandom + "Buy", "button": this.state._diagRandom + "Buy" } });
    this.props.history.push('/productbuy/' + this.props.match.params.id)
    // }
  }
  productImgBuyBtn (_path) {

    if (_path == 'default') {
      // _requestWebUrlOrBtnClick({ "body": { "tab": '/productbuy/' + this.props.match.params.id, "button": 'productbuy' + this.props.match.params.id } });
      this.props.history.push('/productbuy/' + this.props.match.params.id)
    } else if (_path == 'video_id7' || _path == 'video_id8') {
      this.props.history.push('/video/' + _path)
    } else {

    }
  }
  onClickProductTab (_type) {
    _type === 'home' ? this.props.history.push('/') : this.setState({ currTab: _type });
  }
  onCickPoint () {
    // _requestWebUrlOrBtnClick({ "body": { "tab": "/pointdetail", "button": "pointdetail" } });
    this.props.history.push(`/pointdetail`)
  }

  openTcPopUpLayer () {
    this.refs.tcPopUpLayer.showModal()
  }
  tcPitiToolDetail () {
    let { toolTab } = this.state;
    console.log(toolTab);
    this.props.history.push(`/somethingpicture/${toolTab}`)
    // go tool detail page 
    //this.props.history.push(`/pointdetail`)
  }
  getPlusImgTxtByIndex (_index) {
    const { intl: { formatMessage }, InitData } = this.props;
    let _htmltxt = '';
    switch (_index) {
      case 0:
        _htmltxt = <Row className="tc_piti_row tc_piti_1">
          <Row className="tc_piti_1_1">{formatMessage({ id: 'tcPITIndex1_1' })}</Row>
          <Row className="tc_piti_1_2">{formatMessage({ id: 'tcpDec5' })}</Row>
        </Row>
        break;
      case 1:
        _htmltxt = <Row className="tc_piti_row tc_piti_2">
          <Row className="tc_piti_2_1">{formatMessage({ id: 'tcPITIndex2_1' })}</Row>
          <Row className="tc_piti_2_2">{formatMessage({ id: 'tcPITIndex2_2' })}</Row>
        </Row>
        break;
      case 2:
        _htmltxt = <Row className="tc_piti_3_main">
          <Col span={12} className="tc_piti_3_main_col">
            <Row className=" tc_piti_3">
              <Row className="tc_piti_3_1">{formatMessage({ id: 'tcPITIndex3_1' })}</Row>
              <Row className="tc_piti_3_2">{formatMessage({ id: 'tcPITIndex3_2' })}</Row>
              <Row className="tc_piti_3_3">
                <img alt="THINKCAR" className="think-car-home-price-img" style={{ width: '20%' }} src={InitData._homeImgPath + '/Home/img/thinkplus/4-1.png'} />
              </Row>
              <Row className="tc_piti_3_3">{formatMessage({ id: 'tcPITIndex3_3' })}</Row>
            </Row>
          </Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <img alt="THINKCAR" className="think-car-home-price-img tc_piti_3_main_img" src={InitData._homeImgPath + '/Home/img/thinkplus/x1.jpg'} />
          </Col>

        </Row>

        break;
      case 3:
        _htmltxt = <Row className="tc_piti_row tc_piti_4">
          <Row className="tc_piti_4_1">{formatMessage({ id: 'tcPITIndex4_1' })}</Row>
          <Row className="tc_piti_4_1">{formatMessage({ id: 'tcPITIndex4_2' })}</Row>
          <Row className="tc_piti_4_1">{formatMessage({ id: 'tcPITIndex4_3' })}</Row>
          <Row className="tc_piti_4_2">{formatMessage({ id: 'tcPITIndex4_4' })}</Row>
        </Row>
        break;
      case 4:
        _htmltxt = <Row className="tc_piti_row tc_piti_5">
          <Row className="tc_piti_5_1">{formatMessage({ id: 'tcPITIndex5_1' })}</Row>
          <Row className="tc_piti_5_2">{formatMessage({ id: 'tcPITIndex5_2' })}</Row>
        </Row>
        break;
      case 5:
        _htmltxt = '';
        break;
      case 6:
        _htmltxt = <Row className="tc_piti_row tc_piti_7">
          <Row className="tc_piti_7_1">{formatMessage({ id: 'tcPITIndex7_1' })}</Row>
          <Row className="tc_piti_7_2">{formatMessage({ id: 'tcPITIndex7_2' })}</Row>
        </Row>
        break;
      case 7:
        // _htmltxt = <Row className="tc_piti_row tc_piti_8">
        //   <Row className="tc_piti_8_1">{formatMessage({ id: 'tcPITIndex8_1' })}</Row>
        //   <Row className="tc_piti_8_2">{formatMessage({ id: 'tcPITIndex8_2' })}</Row>
        //   <Row className="tc_piti_8_3">
        //     <span style={{ paddingRight: '4%' }} >{formatMessage({ id: 'tcPITIndex8_3' })}</span>
        //     <span >{formatMessage({ id: 'tcPITIndex8_4' })}</span>
        //   </Row>
        // </Row>

        _htmltxt = <Row className="tc_piti_8_main">
          <Col span={12} className="tc_piti_8_main_col">
            <Row className=" tc_piti_8">
              <Row className="tc_piti_8_1">{formatMessage({ id: 'tcPITIndex8_1' })}</Row>
              <Row className="tc_piti_8_2">{formatMessage({ id: 'tcPITIndex8_2' })}</Row>
              <Row className="tc_piti_8_3_main">
                <Col span={12}>
                  <Row className="tc_piti_8_3">
                    <img alt="THINKCAR" className="think-car-home-price-img" style={{ width: '25%' }} src={InitData._homeImgPath + '/Home/img/thinkplus/s.png'} />
                  </Row>
                  <Row className="tc_piti_8_3">{formatMessage({ id: 'tcPITIndex8_3' })}</Row>
                </Col>
                <Col span={12}>
                  <Row className="tc_piti_8_3">
                    <img alt="THINKCAR" className="think-car-home-price-img" style={{ width: '25%' }} src={InitData._homeImgPath + '/Home/img/thinkplus/s1.png'} />
                  </Row>
                  <Row className="tc_piti_8_3">{formatMessage({ id: 'tcPITIndex8_4' })}</Row>
                </Col>
              </Row>
            </Row>

          </Col>
          <Col span={12} >
            <img alt="THINKCAR" className="think-car-home-price-img tc_piti_8_main_img" src={InitData._homeImgPath + '/Home/img/thinkplus/x3.png'} />
          </Col>

        </Row>
        break;
      case 8:
        _htmltxt = <Row className="tc_piti_row tc_piti_9">
          <Row className="tc_piti_9_1">{formatMessage({ id: 'tcPITIndex9_1' })}</Row>
          <Row className="tc_piti_9_2_main">
            <Row className="tc_piti_9_2">
              <Row>{formatMessage({ id: 'tcPITIndex9_2' })}</Row>
              <Row className="tc_piti_9_2_1">{formatMessage({ id: 'tcPITIndex9_3' })}</Row>
            </Row>
            <Row className="tc_piti_9_2">
              <Row>{formatMessage({ id: 'tcPITIndex9_4' })}</Row>
              <Row className="tc_piti_9_2_1">{formatMessage({ id: 'tcPITIndex9_5' })}</Row>
            </Row>
            <Row className="tc_piti_9_2">
              <Row>{formatMessage({ id: 'tcPITIndex9_6' })}</Row>
              <Row className="tc_piti_9_2_1">{formatMessage({ id: 'tcPITIndex9_7' })}</Row>
            </Row>
            <Row className="tc_piti_9_2">
              <Row>{formatMessage({ id: 'tcPITIndex9_8' })}</Row>
              <Row className="tc_piti_9_2_1">{formatMessage({ id: 'tcPITIndex9_9' })}</Row>
            </Row>
            <Row className="tc_piti_9_2">
              <Row>{formatMessage({ id: 'tcPITIndex9_10' })}</Row>
              <Row className="tc_piti_9_2_1">{formatMessage({ id: 'tcPITIndex9_11' })}</Row>
            </Row>
          </Row>
        </Row>
        break;
      default:
        _htmltxt = '';
    }
    return _htmltxt;
  }
  getToolImgTxtByIndex (_index, _isMob) {
    const { intl: { formatMessage }, InitData } = this.props;
    let { toolTab, toolCollapseCurrent, toolCollapseCurrentImages } = this.state;
    let _htmltxt = '';
    switch (_index) {
      case 3:
        let _indx2List = [
          { 'tabid': 'tooli2tab001', 'img': '1.png', 'bannerList': [{ 'id': 'ti211', 'img': 'b4-1.jpg' }] },
          { 'tabid': 'tooli2tab002', 'img': '2.png', 'bannerList': [{ 'id': 'ti221', 'img': 'b4-6.jpg' }] },
          { 'tabid': 'tooli2tab003', 'img': '3.png', 'bannerList': [{ 'id': 'ti231', 'img': 'b4-3.jpg' }] },
          { 'tabid': 'tooli2tab004', 'img': '4.png', 'bannerList': [{ 'id': 'ti241', 'img': 'b4-8.jpg' }] },
          { 'tabid': 'tooli2tab005', 'img': '5.png', 'bannerList': [{ 'id': 'ti251', 'img': 'b4-2.jpg' }] },
          { 'tabid': 'tooli2tab006', 'img': '6.png', 'bannerList': [{ 'id': 'ti261', 'img': 'b4-4.jpg' }] },
          { 'tabid': 'tooli2tab007', 'img': '7.png', 'bannerList': [{ 'id': 'ti271', 'img': 'b4-7.jpg' }] },
          { 'tabid': 'tooli2tab008', 'img': '8.png', 'bannerList': [{ 'id': 'ti281', 'img': 'b4-5.jpg' }] },
        ];
        let _tibannerli = _indx2List.find(_d => _d.tabid == toolTab);

        let _tabspan = _isMob ? 3 : 3;
        _htmltxt = <Row className="tc_piti_tool_indx2_main" key={'tc_piti_tool_indx2_main'}>
          <Row className="tc_pititi2m_h">
            <Row className="tc_pititi2m_h_1">{formatMessage({ id: 'tcPITToolIndex3_1' })}</Row>
            <Row className="tc_pititi2m_h_2">{formatMessage({ id: 'tcPITToolIndex3_2' })}</Row>
            <Row className="tc_pititi2m_h_3">
              {
                _indx2List.map((_itb, _ti) => {
                  let _img = toolTab == _itb.tabid ? 's' + _itb.img : _itb.img;
                  _img = InitData._homeImgPath + '/Home/img/thinktool/' + _img;
                  return <Col
                    key={_itb.tabid}
                    span={_tabspan}
                    className="tc_pititi2m_h_c"
                    onClick={() => { this.setState({ toolTab: _itb.tabid }) }}
                  >
                    <img style={{ display: 'none' }}
                      src={`${InitData._homeImgPath}/Home/img/thinktool/${_itb.bannerList[0].img}`}
                    />
                    <img style={{ display: 'none' }}
                      src={`${InitData._homeImgPath}/Home/img/thinktool/s${_itb.img}`}
                    />

                    <img alt="THINKCAR" className="think-car-home-price-img tc_pititi2m_h_c_img" src={_img} />
                  </Col>
                })
              }
            </Row>
          </Row>
          <Row>
            {/* <Carousel autoplay > */}
            {
              _tibannerli.bannerList.map((_tibItem, _tibIdx) => {
                console.log(_tibItem, _tibannerli);
                return <img key={_tibItem.id}
                  className='think-car-home-price-img'
                  src={`${InitData._homeImgPath}/Home/img/thinktool/${_tibItem.img}`}
                />
              })
            }
            {/* </Carousel> */}
          </Row>

          {
            _tibannerli.bannerList.length > 0 && <Row className="tc_piti_tool_indx2_banner_info">
              <Row>
                <Button type="danger" onClick={this.tcPitiToolDetail} style={{ padding: '0% 3%', height: _isMob ? '' : '30px' }}>
                  {formatMessage({ id: 'tcDetail' })}
                </Button>
              </Row>
              {/* <Row style={{ paddingTop: '1%' }}>{formatMessage({ id: 'tcPToolBannerTip1' })}</Row> */}
            </Row>
          }

        </Row >
        break;
      case 4:
        let _img = toolCollapseCurrentImages || InitData._homeImgPath + "/Home/img/thinktool/b5-1.jpg";
        // const _bgStyle = {
        //   background: `url(${_img}) no-repeat center`,
        //   backgroundSize: 'cover'
        // }
        _htmltxt = <Row className="tc_piti_row tc_piti_tool_indx4_main" key={'tc_piti_tool_indx4_main'} >
          <img alt="THINKCAR" className="think-car-home-price-img" src={_img} />
          <img style={{ display: 'none' }} src={InitData._homeImgPath + "/Home/img/thinktool/b5-1.jpg"} />
          <img style={{ display: 'none' }} src={InitData._homeImgPath + "/Home/img/thinktool/b5-2a3.jpg"} />
          <img style={{ display: 'none' }} src={InitData._homeImgPath + "/Home/img/thinktool/b5-4.jpg"} />
          <img style={{ display: 'none' }} src={InitData._homeImgPath + "/Home/img/thinktool/b5-5.jpg"} />
          <img style={{ display: 'none' }} src={InitData._homeImgPath + "/Home/img/thinktool/b5-6.jpg"} />
          <Col className="tc_pititi4_left" span={12}>
            <Collapse onChange={this.tcPitiToolIndx4Collapse} accordion bordered={false} defaultActiveKey={[toolCollapseCurrent]} className="tc_pititi4l_collapse">
              <Panel showArrow={false} header={formatMessage({ id: 'tcPTDTitle1' })} key="1">
                <p>{formatMessage({ id: 'tcPTDTxt1' })}</p>
              </Panel>
              <Panel showArrow={false} header={formatMessage({ id: 'tcPTDTitle2' })} key="2">
                <p>{formatMessage({ id: 'tcPTDTxt2' })}</p>
              </Panel>
              <Panel showArrow={false} header={formatMessage({ id: 'tcPTDTitle3' })} key="3">
                <p>{formatMessage({ id: 'tcPTDTxt3' })}</p>
              </Panel>
              <Panel showArrow={false} header={formatMessage({ id: 'tcPTDTitle4' })} key="4">
                <p>{formatMessage({ id: 'tcPTDTxt4' })}</p>
              </Panel>
              <Panel showArrow={false} header={formatMessage({ id: 'tcPTDTitle5' })} key="5">
                <p>{formatMessage({ id: 'tcPTDTxt5' })}</p>
              </Panel>
              <Panel showArrow={false} header={formatMessage({ id: 'tcPTDTitle6' })} key="6">
                <p>{formatMessage({ id: 'tcPTDTxt6' })}</p>
              </Panel>
            </Collapse>
          </Col>
          {/* <Col className="tc_pititi4_right" span={12}>
            <img alt="THINKCAR" className="think-car-home-price-img" src={toolCollapseCurrentImages || InitData._homeImgPath + "/Home/img/thinktool/b5-1.jpg"} />
          </Col> */}

        </Row>
        break;
      default:
        _htmltxt = '';
    }
    return _htmltxt;
  }
  tcPitiToolIndx4Collapse (_key) {
    console.log(_key);
    const { InitData } = this.props;
    let _img = InitData._homeImgPath + "/Home/img/thinktool/";
    switch (_key) {
      case '1':
        _img = _img + "b5-1.jpg";
        break;
      case '2':
        _img = _img + "b5-2a3.jpg";
        break;
      case '3':
        _img = _img + "b5-2a3.jpg";
        break;
      case '4':
        _img = _img + "b5-4.jpg";
        break;
      case '5':
        _img = _img + "b5-5.jpg";
        break;
      default:
        _img = _img + "b5-6.jpg";
    }
    this.setState({ tcPitiToolIndx4Collapse: _key, toolCollapseCurrentImages: _img })
  }

  _getImg (_url, _css, _style = {}) {
    let { intl: { formatMessage }, InitData } = this.props;
    return <figure className="tc_figure" >
      <img
        style={_style}
        alt={formatMessage({ id: 'tcThinckcar' })}
        className={"think-car-home-price-img " + _css}
        src={InitData._homeImgPath + _url}
      />
    </figure>
  }
  buyNowBtn () {
    var _g = {
      id: '3',
      number: 1,
      service: false,
      serviceType: '0',
    };
    _requestWebUrlOrBtnClick({ "body": { "tab": "gogoBuyNow", "button": "gogoBuyNow" } });
    this.props.history.push('/order/buynow/' + JSON.stringify(_g))
  }
  render () {
    let { isFetching, productObj, currTab, videoBannerPath, videoTitle, _diagRandom } = this.state;
    let { InitData } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    let _videoList = [], _driverImg = '/Home/img/thinkdriver/random2/';
    (productObj.id == "1" || productObj.id == "2") && (_videoList = InitData.videoThinkcar);
    productObj.id == "3" && (_videoList = InitData.videoDiagList);
    productObj.id == "4" && (_videoList = InitData.videoOBD100List);
    productObj.id == "5" && (_videoList = InitData.tool_video);
    productObj.id == "6" && (_videoList = InitData.videoPlusList);
    productObj.id == "8" && (_videoList = InitData.driver_video);

    return (
      <div className="tc-product-page" >
        <Affix offsetTop={_isMob ? 90 : 0}>
          <div className="tc-product-buy-title tc-mobile-product-buy-title" >

            <Row>
              <Col span={13} className="tc-product-buy-title-tip1 tc-mobile-col-widthmax" >{productObj.name}</Col>
              <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 't1' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t1')}><FormattedMessage id="tcProductTabs1" /></Col>
              <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 't2' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t2')}><FormattedMessage id="tcProductTabs2" /></Col>
              {/* {
                (this.props.match.params.id == '11') &&
                <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 'scan_so' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('scan_so')}>ThinkScan S99</Col>
              } */}
              {
                (this.props.match.params.id != '11') &&
                <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 't3' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t3')}><FormattedMessage id="tcProductTabs3" /></Col>
              }
              {
                (this.props.match.params.id != '4' && this.props.match.params.id != '5' && this.props.match.params.id != '6' && this.props.match.params.id != '10' && this.props.match.params.id != '11') ?
                  <Col span={3} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 't5' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t5')}><FormattedMessage id="tcProductTabs5" /></Col>
                  :
                  <Col span={3} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 `} ></Col>
              }
              {/* {
                (this.props.match.params.id == '5') &&
                <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 `} ></Col>
              } */}

              {
                (this.props.match.params.id != '10' && this.props.match.params.id != '11') &&
                (
                  _isMob ? <Col span={2} className="text-center tc-mobile-col-width3" >
                    {/* <Button type="primary" onClick={this.productBuyBtn} className="tc-product-btn-one" >
                <FormattedMessage id="tcProductBtnBuy" />
              </Button> */}
                    <img
                      alt="buy"
                      style={{ cursor: 'pointer' }}
                      onClick={this.productBuyBtn}
                      className="think-car-home-price-img"
                      src={InitData._homeImgPath + '/Home/img/buy_btn.png'}
                    />
                  </Col>
                    :
                    <img
                      alt="buy"
                      style={{ cursor: 'pointer', width: '25%' }}
                      onClick={this.productBuyBtn}
                      className="think-car-home-price-img"
                      src={InitData._homeImgPath + '/Home/img/buy_btn.png'}
                    />
                )

              }

            </Row>
          </div>
        </Affix>
        {
          currTab == 't1' && productObj.imgList.length > 0 && ((_diagRandom == "gogo" && this.props.match.params.id == '3') ?
            <Row className="tc_diagRandom_page2" >
              <Col span={7} className="tc_dgp2_right" onClick={this.buyNowBtn}>
                <h3>Select a perk</h3>
                <Lazyload height={300}>
                  <Row>
                    {this._getImg("/Home/img/thinkdiag/random2/R_1.png")}
                  </Row>
                </Lazyload>
                <Row className="tc_dgp2_r_txt">
                  <h2> {productObj.name}</h2>
                  <p><span className="tc_dgp2_rt_txt1" >${productObj.price}</span></p>
                  <p>Delivery time: 1-5 days</p>
                </Row>

              </Col>
              <Col span={17} className="tc_dgp2_left">
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_1.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Row className="tc_dgp2_li">
                  <ul>
                    <li>&nbsp;<span>Palm-sized,</span> <span>portable</span>, and powerful diagnostic tool that fits in your pocket.</li>
                    <li>&nbsp;<span>Enhanced tests</span> for full electronic control system (such as ABS and SRS).</li>
                    <li>&nbsp;<span>Actuation tests </span>that allow you to test each system actuator such as doors, windows or windscreen wipers to identify malfunction causes.</li>
                    <li>&nbsp;<span>Special functions</span> of 115 car brands that are specific to each car model or series so you don't need multiple expensive special equipments.</li>
                    <li>&nbsp;<span>Full OBD II and EOBD functions</span> for full system scans to help you make informed car maintenance decisions and avoid spending unnecessary service fees.</li>
                    <li>&nbsp;<span>Live data stream graphing</span> gives you a visual comparison of multiple real-time data to better understand your car.</li>
                    <li>&nbsp;<span>Bidirectional functions</span> let you send and receive commands from the ECU.</li>
                  </ul>
                </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_2.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_3.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}>
                  <Row>
                    <iframe src={_videoList[0].url} width="100%" style={{ minHeight: '400px' }} frameBorder="0" allowFullScreen ></iframe>
                  </Row>
                </Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <p>THINKDIAG is an automobile diagnostic tool with professional-grade functions. In the past, mechanics and car tuners have to use bulky diagnostic tools with large screens and connector cables, or laptops plugging into the OBD II port.&nbsp;</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_4.gif")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <p>THINKDIAG changes that. Plug the THINKDIAG dongle into your car, connect it to your smartphone via Bluetooth, and your smartphone becomes a professional diagnostic tool.</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_5.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_6.jpg")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                {/* <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_7.gif")}</Row></Lazyload> */}
                {/* <Row className="tc_dgp2_line"> </Row> */}
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_8.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                {/* <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_9.gif")}</Row></Lazyload> */}
                <h1>Manufacturer software</h1>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_10.jpg")}</Row></Lazyload>
                <p>Each THINKDIAG you purchase comes with one free 1-year manufacturer software subscriptions. Each manufacturer's software has a retail price of $39.95 per year.</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_11.png")}</Row></Lazyload>
                <p>Each manufacturer software subscription gives you access to ALL diagnostic functions, including read/clear codes, live data streaming, actuation tests, and ALL maintenance functions of the manufacturer you picked.&nbsp;</p>
                <p>You'll have access to the car models from the same manufacturer! For example, if you purchase the Lexus software, you will be able to use it for Lexus AND Toyota since they are both under the same manufacturer!</p>
                <p><strong><span>Why did we choose to offer subscriptions?</span></strong></p>
                <p>This decision is made after careful thought and review of user feedback. Instead of charging you high one-time fees, we give you the flexibility and choice of renewing your subscription after one year. Users who change cars after one or two years can choose to switch to a subscription to another car manufacturer.</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_12.png")}</Row></Lazyload>
                <p>After activating the device, depending on your pledge, you may select any two or more manufacturer software at your choice in ThinkStore.</p>
                <Lazyload height={300}>
                  <Row>
                    <iframe src={_videoList[4].url} width="100%" style={{ minHeight: '400px' }} frameBorder="0" allowFullScreen ></iframe>
                  </Row>
                </Lazyload>
                <p>Check out our <a target="_blank" rel="noopener nofollow" href="https://www.youtube.com/channel/UCZhYy-zfcLiViy2fCQgWOow">YouTube channel</a> for more functions presentations and tutorials!</p>
                <h1>Maintenance functions software</h1>
                <p>Each manufacturer software subscription comes with all 16 maintenance functions for car models from the manufacturer.&nbsp;</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_13.jpg")}</Row></Lazyload>
                <p>Do you need more maintenance functions for multiple car manufacturers? You can purchase the ABS bleeding function software, and you will be able to use it for all 115 car manufacturers we support.</p>
                <p>For example, a repair shop needs to use the ABS bleeding function on all car manufacturers since their customers will have all sorts of car brands. Maintenance function software has a retail price of &nbsp;$49.95 per year.</p>
                <h1>Supports 115 brands</h1>
                <p>&nbsp;That's 95% of car models available in the market!</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_14.png")}</Row></Lazyload>
                <h1><span>OBD II functions</span></h1>
                <p>All OBD II functions come free with each THINKDIAG.&nbsp;</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_15.jpg")}</Row></Lazyload>
                <h1> <span>Remote diagnostics function</span>&nbsp;</h1>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_16.png")}</Row></Lazyload>
                <p>&nbsp;When car owners are unable to resolve a problem, mechanics can perform diagnostics remotely with THINKDIAG.</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_17.gif")}</Row></Lazyload>
                <h1>Supports iOS and Android&nbsp;&nbsp;</h1>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_18.png")}</Row></Lazyload>
                <h1>ThinkMoments Community</h1>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_19.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <p>The THINKDIAG app goes beyond diagnostic functions. Our ThinkMoments community is where our users share their experiences with Thinkcar products and their rides. Engage like-minded car lovers who share the love of DIY car repairs.</p>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_20.jpg")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_21.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <p><span>Smooth and curved design isn't just for good looks!</span></p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_22.gif")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <p>We designed THINKDIAG with a curvy, egg-shaped casing for improved durability while keeping the size small for great portability. Don't worry about tossing it into your toolbox because it won't get banged up. It is built to last.</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_23.jpg")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_24.gif")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_25.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_26.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_27.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_28.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_29.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                {/* <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_30.png")}</Row></Lazyload> */}
                {/* <Row className="tc_dgp2_line"> </Row> */}
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/R_1.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                {/* <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_32.png")}</Row></Lazyload> */}
                {/* <Row className="tc_dgp2_line"> </Row> */}
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_33.jpg")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_34.jpg")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                {/* <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_35.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row> 
                 <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_36.jpg")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row> */}
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_37.png")}</Row></Lazyload>
                <Row className="tc_dgp2_line"> </Row>
                <p>Thinkcar believes that trust is the top priority, be it towards customers, partners, teammates, and society. &nbsp;Hence, we value and respect the trust you have in us by being an early supporter. &nbsp;We will work hard to maintain your trust through timely communication and transparency.</p>
                <p><span>We Grow with Our Community</span></p>
                <p>We created the ThinkMoments community because we believe in bringing like-minded car lovers together to share their passion for DIY repairs and taking good care of their rides.&nbsp;</p>
                <p>The ThinkMoments Community provides us with valuable feedback that will help us to improve our products and come up with better innovations and ideas for new products. We don't make products just for the sake of making them. We create products that help our users solve their problems.</p>
                <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_38.png")}</Row></Lazyload>
                {/* <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_39.png")}</Row></Lazyload> */}
                {/* <Lazyload height={300}><Row>{this._getImg("/Home/img/thinkdiag/random2/L_40.png")}</Row></Lazyload> */}
                <Row className="tc_dgp2_line"> </Row>

              </Col>


            </Row>
            :
            productObj.imgList.map((ob, idx) => {
              let _html = '';
              let _url = ob.url, _imgStyle = {}, _goPath = ob.path || '';
              if (idx == 0 && this.props.match.params.id != '3' && this.props.match.params.id != '4' && this.props.match.params.id != '10') {
                _imgStyle = { cursor: 'pointer' };
                _goPath = 'default'
              }

              if ((idx == 7 || idx == 9) && this.props.match.params.id == '3') {
                _imgStyle = { cursor: 'pointer' };
                _goPath = idx == 7 ? 'video_id7' : 'video_id8';
              }

              !_isMob && (_url = _url.slice(0, 9) + '/mobile' + _url.slice(9));

              if (this.props.match.params.id == '5' && (idx == 3 || idx == 4)) {
                _html = <Lazyload key={"pdimgList" + idx} height={300}>{this.getToolImgTxtByIndex(idx, _isMob)} </Lazyload>
              } else {
                _html = <Lazyload key={"pdimgList" + idx} height={300}>
                  {
                    //  driver 视频
                    this.props.match.params.id == '8' && (idx == 4) && <iframe
                      src={_videoList[0].url}
                      width="100%"
                      style={{ minHeight: '700px', marginBottom: '-5px' }}
                      frameBorder="0"
                      scrolling="no"
                      allowFullScreen
                    >
                    </iframe>
                  }
                  <Row className="thinkCar-price1 tc_piti_main" onClick={() => { this.productImgBuyBtn(_goPath) }} style={_imgStyle}>
                    {
                      this.props.match.params.id == '6' ?
                        idx != 2 && idx != 7 && <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + _url} />
                        :
                        <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + _url} />
                    }

                    {
                      this.props.match.params.id == '3' && idx == 2 && <img
                        alt="THINKCAR"
                        style={_isMob ? { width: '20%', position: 'absolute', top: '5%', right: '10%' } : {}}
                        className="think-car-home-price-img"
                        src={InitData._homeImgPath + '/Home/img/thinkdiag/3_1.gif'}
                      />
                    }

                    {/* {
                  // this.props.match.params.id == '5' && <Row className="tc_piti_main_tool">{this.getToolImgTxtByIndex(idx)}</Row>
                  this.props.match.params.id == '5' && this.getToolImgTxtByIndex(idx)
                } */}
                    {
                      this.props.match.params.id == '6' && this.getPlusImgTxtByIndex(idx)
                    }

                  </Row>
                </Lazyload>
              }

              return _html;
            })
          )
        }
        {
          // currTab == 't1' && this.props.match.params.id == '8' &&
          // <Row className="tc_diagRandom_page2" >
          //   <Col span={7} className="tc_dgp2_right" onClick={this.productBuyBtn}>
          //     <h3>Select a perk</h3>
          //     <Lazyload height={300}>
          //       <Row>
          //         {this._getImg(_driverImg + "R_1.jpg")}
          //       </Row>
          //     </Lazyload>
          //     <Row className="tc_dgp2_r_txt">
          //       <h2> {productObj.name}</h2>
          //       <p><span className="tc_dgp2_rt_txt1" >${productObj.price}</span></p>
          //       <p>Delivery time: At the end of June</p>
          //     </Row>

          //   </Col>
          //   <Col span={17} className="tc_dgp2_left">
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload ><Row>{this._getImg(_driverImg + "L_0.png")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>THINKDRIVER is a smart Bluetooth diagnostic tool for DIYers and car owners, which is extremely close to professional diagnostic tools. Besides the full OBDII function, THINKDRIVER supports the vehicle's full system diagnostics to help you know every module in the car. Goodbye to normal OBDII dongle!</p>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_1.jpg")}</Row></Lazyload>
          //     <p>Now, THINKDRIVER will be the best helper for every car owner! This is the ultimate car diagnostic connector that allows you to easily and immediately know whether you should be aware of any issues with your car.</p>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_2.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_3.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>THINKCAR is the earliest OBDII Bluetooth diagnostic tool for full vehicle systems in the market full of basic tools with few functions.</p>
          //     <p>THINKDIAG, with the same functions but lower price than the professional diagnostic tools which always cost thousands of dollars. The whole system is diagnosed through the mobile app. Users can choose the car brand they need. Then THINKDIAG successfully got the reputation.</p>
          //     <p>THINKDRIVER is based on THIKDIAG, but we optimize the cost and reduce functions for professional mechanics. We strive to minimize the price of THINKDRIVER to let all car owners test the full system of the vehicle, much more than the OBDII.</p>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_4.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_5.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_6.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_7.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_8.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_9.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>There are no requirements of diagnostic knowledge. THINKDRIVER’s professional features allow anyone to easily use it without any technical training. THINKDRIVER is extremely smart with its outstanding performance.</p>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_10.gif")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_11.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_12.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_13.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_14.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_15.gif")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>THINKDRIVE offers a comprehensive, efficient and reliable full vehicle code reading and clearing process. From THINKDRIVER App, you have access to view live data flow of the entire vehicle system, which will be combined to create an easy-to-understand chart that presents data and conclusions about anything your car needs.</p>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_16.gif")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>This is one of the most important tests that most similar products don’t offer. Well, THINKDRIVER offers this as one of its features. It’s true, THINKDRIVER provides a 0-100 km/h (62.24mile) acceleration test. It is one of the most important data points that its ‘Full System Diagnosis’ offers. When the speed is greater than 0km/h, the timing starts, and when the speed reaches 100km/h, the timing ends, and you can customize the timing speed. After completing the acceleration timing test, the device can rank the results, and you can even compare them with THINKDRIVER’s own network. Yep, convenient and cool!</p>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_17.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_18.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_19.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>THINKDRIVER supports OBD II (on-board diagnostics) protocols. It works with any vehicles after 1996.</p>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_20.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_21.gif")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_22.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_23.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_24.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_25.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_26.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_27.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_28.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_29.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_30.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_31.gif")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>In order to deliver on its vehicle diagnosis features, THINKDRIVER requires the purchase by your vehicle’s VIN code through the app. If you have more than one vehicle, you’ll need to purchase by each vehicle’s VIN code, even if they are both from the same vehicle brand. Each VIN code purchase can be used for 1 year. </p>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_32.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_33.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_34.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <p>The same comprehensive functions as thousands of dollars valued diagnostic tool, but ina much lower priceDiagnostic Functions</p>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_35.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_36.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_37.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_38.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_39.jpg")}</Row></Lazyload>
          //     <Row className="tc_dgp2_line"> </Row>
          //     {/* <Lazyload height={300}><Row>{this._getImg(_driverImg + "L_40.jpg")}</Row></Lazyload> */}
          //     {/* <Row className="tc_dgp2_line"> </Row> */}
          //   </Col>
          // </Row>

        }

        {
          currTab == 't1' && this.props.match.params.id == '3' && _diagRandom == "page1" &&
          <Lazyload height={300}>
            <Row className="tc-product-ti-id3-pb" >
              <h1 className="tc-product-ti-id3-pb-title" ><FormattedMessage id="tcProductFAQ" /></h1>
              <ThinkDiagProblemPage />
            </Row>
          </Lazyload>
        }
        {
          currTab == 't2' && <Row>
            <Lazyload height={300}><TcPDBPage imgpath={InitData._homeImgPath} /></Lazyload>

          </Row>
        }
        {
          currTab == 't3' && _videoList.length > 0 && <Row>
            <Lazyload height={300}>
              {(productObj.id == "1" || productObj.id == "2") && <Row>
                {/* <iframe
                  src="https://www.youtube.com/embed/CCJR1pGoQ2Q"
                  width="100%"
                  style={{ minHeight: '400px' }}
                  frameBorder="0"
                  allowFullScreen
                >
                </iframe> */}
                <img
                  alt="THINKCAR"
                  className="think-car-home-price-img"
                  src={InitData._homeImgPath + '/Home/img/video_banner.jpg'}
                // onClick={this.openTcPopUpLayer}
                />
              </Row>
              }
              <Row className="tc-product-page-tab-comm" >
                {
                  _videoList.map((_x, _d) => {

                    return <Col className="tc-mobile-col-widthmax" style={{ marginBottom: '2%', padding: '0 10px' }} span={6} key={"_video_item_id_" + _x.id}>
                      <Card
                        hoverable
                        cover={
                          <iframe
                            src={_x.url}
                            width="100%"
                            style={{ minHeight: '200px' }}
                            frameBorder="0"
                            allowFullScreen
                          >
                          </iframe>
                        }
                      >
                        <Meta
                          title={_x.title}
                        // description={[<span><FormattedMessage id="tcAuthor" />{":  " + _x.author}</span>]} 
                        />
                      </Card>
                    </Col>
                  })
                }

              </Row>
            </Lazyload>
          </Row>
        }
        {
          currTab == 't4' && <Row className="tc-product-page-tab-comm"><Empty /></Row>
        }
        {
          currTab == 't5' && <Row className="tc-product-page-tab-comm" >
            {/* {(productObj.id == "1" || productObj.id == "2") && <ThinkcarProblemPage />}
            {productObj.id == "3" && <ThinkDiagProblemPage />} */}
            <Lazyload height={300}>
              <Row style={(productObj.id != "1" && productObj.id != "2") ? { display: "none" } : {}}>
                <ThinkcarProblemPage />
              </Row>
              <Row style={(productObj.id != "3") ? { display: "none" } : {}}>
                {
                  _diagRandom == "gogo" ? <Row style={_isMob ? { padding: "0 20%" } : ""} >
                    <h2>Frequently Asked Questions</h2>
                    <h3>Does THINKDIAG require an internet connection? </h3>
                    <p>THINKDIAG device required Bluetooth connection with your smartphone. If you need to update your vehicle diagnostic software, your smartphone needs an internet connection.</p>
                    <h3>Can I share my test reports with others? </h3>
                    <p>Yes, you can share your reports on Facebook, Twitter, or in the THINKDIAG app's community ThinkMoments.</p>
                    <h3>What format are the reports saved or exported in?</h3>
                    <p>The reports can be exported as PDF so you can easily share or print it.</p>
                    <h3>Does THINKDIAG need charging?</h3>
                    <p>Thinkdiag is powered directly by the vehicle's OBD II port.</p>
                    <h3>Can THINKDIAG be used on more than one car?</h3>
                    <p>Yes, it can be used with different vehicles as long as you download the corresponding diagnostic software.</p>
                    <h3>How much power does THINKDIAG use?</h3>
                    <p>Power consumption is minimal, thus making it energy efficient and safe to use.</p>
                    <h3>Can my Thinkdiag device connect to multiple smartphones?</h3>
                    <p>Yes, simply use the same account to log into a new smartphone. You can restore the previously purchased software by downloading it on the new phone.</p>
                    <h3>Does THIKNDIAG use my car's Bluetooth?</h3>
                    <p>No, it connects directly to your phone's Bluetooth.</p>
                    <h3>Do I need to pay extra to use THINKDIAG?</h3>
                    <p>Each THINKDIAG you purchase comes with free manufacturer software for one year free. You'll pick up the free manufacturer software from ThinkStore and enjoy a FREE first year subscription that costs $39.95 per manufacturer. You only need to pay after your subscription ends.</p>
                    <h3>Why did you offer subscriptions instead of one-time fees?</h3>
                    <p>This decision is made after careful thought and review of user feedback. Instead of charging you high one-time fees, we give you the flexibility and choice of renewing your subscription after a year. Users who change cars after one or two years can choose to switch to a subscription to another car manufacturer, instead of being stuck with a tool that only works for one manufacturer.</p>
                    <h3>What is a Manufacturer Software subscription?</h3>
                    <p>Each manufacturer software subscription gives you access to ALL diagnostic functions, including read/clear codes, live data streaming, actuation tests, and ALL maintenance functions of the manufacturer you picked.</p>
                    <h3>What is a Maintenance Functions Software subscription?</h3>
                    <p>All 16 maintenance functions are INCLUDED in your manufacturer subscription for the car manufacturer you picked. Each maintenance function software subscription costs $49.95 per year.</p>
                    <h3>Who would need to get maintenance functions subscriptions?</h3>
                    <p>Do you need to use the maintenance functions for multiple car manufacturers? Getting the maintenance function subscriptions will help you to save! You can purchase a maintenance function subscription, and use it for ALL 115 car manufacturers we support.</p>
                    <h3>Do I need to pay for maintenance functions?</h3>
                    <p>It depends on your situation. All 16 maintenance functions are INCLUDED in your manufacturer subscription for the car manufacturer you picked. If you want to use maintenance functions for ALL 115 supported car manufacturers, you will need to purchase a $49.95 subscription for each maintenance function. Each subscription is for one year and allows you to use the function on ALL supported car models.</p>
                    <h3>Do I need to pay for OBD II functions?</h3>
                    <p>No. All OBD II functions come FREE with each THINKDIAG.</p>

                  </Row> : <ThinkDiagProblemPage />
                }

              </Row>
              <Row style={(productObj.id != "8") ? { display: "none" } : {}}>
                <Row style={_isMob ? { padding: "0 20%" } : ""} >
                  <h2>Frequently Asked Questions</h2>
                  <h3>I want to know whether my vehicle is supported.</h3>
                  <p>Compatible with all vehicles supporting the OBD II / EOBD protocol since 1996, which can perform diagnostic services for more than 100 vehicle brands.
You can query through this link: https://www.mythinkcar.com/coverage/checklist</p>
                  <h3>Where can I download the App?</h3>
                  <p>For IOS you can find THINKDRIVER on Apple Store, and you can also update the IOS version on Apple Store.
For Android system, you can download it here: http://apkdown.mythinkcar.cn/apk/index.php?mod=down&code=latest_app&pid=5</p>
                  <h3>What’s the difference between Thinkcar1s, Thinkdiag and Thinkdriver?</h3>
                  <p>THINKCAR is the earliest OBDII Bluetooth diagnostic tool for full vehicle systems in the market full of basic tools with few functions. Compatible with all vehicles after 2005.THINKDIAG do not have the 0-60miles acceleration test function.THINKDRIVER is based on THIKDIAG, but we optimize the cost and reduce functions for professional mechanics. We strive to minimize the price of THINKDRIVER to let all car owners test the full system of the vehicle, much more than the OBDII.</p>
                  <h3>Does THINKDRIVER require an internet connection?</h3>
                  <p>The ThinkDriver device doesn’t connect to the Internet. The ThinkDriver app will connect to the device via Bluetooth. The ThinkDriver app will need internet connection when using the diagnostic functions.</p>
                  <h3>How to connect the equipment with my phone?</h3>
                  <p>Once your scanner tool is inserted into the OBD port, simply search for the THINKDRIVER using your Bluetooth settings and connect. The tool supports both Android and IOS systems.</p>
                  <h3>Will my tablet be compatible?</h3>
                  <p>We support almost all mobile and tablet devices, but we prefer to use mobile phones, which are more adaptable.</p>
                  <h3>Does THINKDRIVER need charging?</h3>
                  <p>THINKDRIVER is powered directly by the vehicle's OBD II port.</p>
                  <h3>What is the OBD-II port?</h3>
                  <p>The On-Board Diagnostics port (OBD-II) grants the driver access to information on their car's electronic engine control system, as well as other functioning modules in the vehicle. An OBD scanner tool is needed to actually extract the information, which can then be connected with a mobile device so that the information can be read via an app. Once acquired, the information can be used to assess the working status of an automobile. Data is collected in real-time so that a fault can be detected as soon as it appears. This information is convenient for knowing when and how a car must be repaired, and for developing the car's functions and equipment to avoid damage in the future.</p>
                  <h3>Can THINKDRIVER be used on more than one car?</h3>
                  <p>Yes, it can be used with different vehicles as long as you download the corresponding diagnostic software and purchase manufacturer software subscriptions.</p>
                  <h3>Can my ThinkDriver device be used on more than one car?</h3>
                  <p>Yes, the device can be plugged into different vehicles for "Full OBD II Functions". The "Full Vehicle Modules Scan" need to identify and bind the VIN number of the vehicle, which can only be used for one vehicle each VIN."Full Vehicle Modules Scan" cost an additional $9.95 per year per vehicle. One device can bind up to 9 VIN numbers.</p>
                  <h3>How do I activate the function of a full-system check?</h3>
                  <p>We support OBD full functions and full system check, the OBD check is totally free. The whole system detection is for the purchase of a single-vehicle. The App connects the device and clicks the whole system diagnosis function in the diagnosis page to purchase the function.</p>
                  <h3>Can I share my test reports with others?</h3>
                  <p>Yes, you can share your reports on Facebook, Twitter, or in the THINKDRIVER app's community.</p>
                  <h3>Does THINKDRIVER use my car's Bluetooth?</h3>
                  <p>No, it connects directly to your phone's Bluetooth.</p>
                  <h3>Why did you offer subscriptions instead of one-time fees?</h3>
                  <p>This decision is made after careful thought and review of user feedback. Instead of charging you high one-time fees, we give you the flexibility and choice of renewing your subscription after a year. Users who change cars after one or two years can choose to switch to a subscription to another car manufacturer, instead of being stuck with a tool that only works for one manufacturer.</p>
                  <h3>What guarantees and warranties am I covered with?</h3>
                  <p>We can provide an exchange or full-money return of the product within 30 days of purchase, provided the product is returned in the same condition in which it was sold, with the original packaging and accessories. All of Thinkcar's products cover a 1-year warranty period, during which we will offer to repair and, if need be, replace the product should there be any manufacturing faults that arise during this period.</p>
                  <h3>Are pickup trucks compatible?</h3>
                  <p>Yes, ThinkDriver can be used on pickup trucks sold in North America after 1996.</p>
                  <h3>How does ThinkDriver connect to my Phone?</h3>
                  <p>The ThinkDriver APP will only connect via Bluetooth. Please pair the phone with the device via Bluetooth USING the ThinkDriver App.If the device is not connecting correctly, please make sure you turn on location permission. Without location permission, the scans won't return any results. Any smartphone with Android 6.0 or above will ask for location permission to scan for Bluetooth devices with low energy according to Google Policy on Android. We, the ThinkDriver team declare here that we are NOT using your data for any purpose other than scanning for Bluetooth devices.</p>
                  <h3>Do I need to update the Bluetooth firmware?</h3>
                  <p>When there is a new version, the Bluetooth firmware will need to be updated manually. You can do this by Opening the APP, then select “Bluetooth firmware fix” on the “My page” page, and follow the prompts to update.</p>
                  <h3>Is there any additional cost for using the ThinkDriver service?</h3>
                  <p>If you already have a ThinkDriver device, you can use the OBD diagnostics without restrictions, and you can use it on multiple cars without paying. Full Vehicle Modules Scan require an additional purchase. If you purchased the ThinkDriver these functions are free for one year for one VIN, Both the trial and one year start on first use of service, not purchase date. For each additional car or to renew your current offer the price is $9.95 per year. All model subscriptions can be used for 7 days free of charge, after which you will need to add 9.95 $ / VIN.</p>
                  <h3>What is THINKDRIVER VIN subscription？</h3>
                  <p>In order to deliver on its vehicle diagnosis features, THINKDRIVER requires the purchase by your vehicle’s VIN code through the app. If you have more than one vehicle, you’ll need to purchase by each vehicle’s VIN code, even if they are both from the same vehicle brand. Each VIN code purchase can be used for 1 year.</p>
                  <h3>What if I have added nine VIN's to a device?</h3>
                  <p>If you have already add 9 vins, you can contact customer service to get a new device for free.</p>
                  <h3>How much does the 15 Maintenance RESET Function charge？</h3>
                  <p>It is $ 9.95/a Reset/year</p>
                </Row>

              </Row>
            </Lazyload>
          </Row>
        }


        {
          currTab == 'scan_so' && <Row className="tc-product-page-tab-comm">
            <Lazyload >
              <ScanS0 history={this.props.history} />
            </Lazyload>
          </Row>
        }

        <Row className="thinkCar-price1" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
          <Lazyload height={300}>
            <img alt="" className="think-car-home-price-img" src={InitData._homeImgPath + "/Home/img" + (_isMob ? '' : '/mobile') + "/point.jpg"} />
          </Lazyload>
        </Row>

        <Lazyload height={300}>
          <ThinkcarTransportPage />
        </Lazyload>
        <TcPopUpLayer ref="tcPopUpLayer" tcpath={videoBannerPath} tctitle={videoTitle} />
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(ProductPage)
