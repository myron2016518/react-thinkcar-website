import React from 'react'
//import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Tabs, Card, Empty } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request, { transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'
import HistoryTask from './HistoryTask'
// import InitData from '../components/InitData'
import ThinkcarProblemPage from './ThinkcarProblemPage'
import ThinkDiagProblemPage from './ThinkDiagProblemPage'
import ThinkcarTransportPage from './ThinkcarTransportPage'
import TcPopUpLayer from '../components/TcPopUpLayer'

const { Meta } = Card;
const { TabPane } = Tabs;

class ProductPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      productObj: { 'imgList': [], 'parameter': [] },
      currTab: this.props.match.params.tabs || 't1',
      videoBannerPath: 'https://www.youtube.com/embed/CCJR1pGoQ2Q',
      videoTitle: 'OBD Using',

    }

    this.productBuyBtn = this.productBuyBtn.bind(this)//购买
    this.initFun = this.initFun.bind(this)//购买
    this.onClickProductTab = this.onClickProductTab.bind(this)//点击导航
    this.onCickPoint = this.onCickPoint.bind(this)
    this.openTcPopUpLayer = this.openTcPopUpLayer.bind(this)

  }
  componentDidMount () {
    // this.initFun(this.props)		
    // console.log('==============================', this.props);
    this.initFun(this.props)
  }
  componentWillReceiveProps (newProps) {
    // console.log('=====newProps========', newProps);
    this.initFun(newProps)
  }
  initFun (props) {
    if (props.match.params.id) {
      var _d = getProductByLang(props.intl.locale, props.InitData) || [];
      let _find = _d.find(_item => _item.id == props.match.params.id);
      _find && this.setState({ productObj: _find });
    }
  }

  productBuyBtn () {
    // console.log(this.props.match.params.id);
    // this.props.match.params.id != '3' && this.props.history.push('/ProductBuyPage/' + this.props.match.params.id)

    if (this.props.match.params.id == '3') {
      window.location.href = 'https://ks.mythinkcar.com/';
    } else {
      this.props.history.push('/ProductBuyPage/' + this.props.match.params.id)
    }
  }
  onClickProductTab (_type) {
    _type === 'home' ? this.props.history.push('/') : this.setState({ currTab: _type });
  }
  onCickPoint () {
    this.props.history.push(`/pointdetail`)
  }

  openTcPopUpLayer () {
    this.refs.tcPopUpLayer.showModal()
  }

  render () {
    let { isFetching, productObj, currTab, videoBannerPath, videoTitle } = this.state;
    let { InitData } = this.props;
    const gutter = 16;
    const _gridStyle = {
      width: '50%',
      textAlign: 'center',
      fontSize: '12px',
      padding: '2%',
    };
    var _videoList = [
      { 'id': 'video_id1', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/CCJR1pGoQ2Q', 'title': 'OBD Using' },
      { 'id': 'video_id2', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/f7P1Z7I5byk', 'title': 'Full Vehicle Modules Scan' },
      { 'id': 'video_id3', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/H32bX8ufyV8', 'title': 'Real Time Diagnostics' },
      { 'id': 'video_id4', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/WbLMjTltK_Q', 'title': 'Black Box' },
      { 'id': 'video_id5', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/d-9viZk-oQQ', 'title': 'Bluetooth Firmware Updating Tutorial' },
      { 'id': 'video_id6', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/XpNz0B78llw', 'title': 'Bluetooth Pairing Tutorial' },
    ];
    return (
      <div className="tc-product-page">
        <div className="tc-product-buy-title tc-mobile-product-buy-title">
          <Row>
            <Col span={15} className="tc-product-buy-title-tip1 tc-mobile-col-widthmax" onClick={() => this.onClickProductTab('home')}>{productObj.name}</Col>
            <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 't1' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t1')}><FormattedMessage id="tcProductTabs1" /></Col>
            {/* <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-widthmax ${currTab == 't2' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t2')}><FormattedMessage id="tcProductTabs2" /></Col> */}
            {
              this.props.match.params.id != '3' &&
              <Col span={2} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 't3' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t3')}><FormattedMessage id="tcProductTabs3" /></Col>
            }
            {/* <Col span={3} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-widthmax ${currTab == 't4' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t4')}><FormattedMessage id="tcProductTabs4" /></Col> */}
            {
              this.props.match.params.id != '3' &&
              <Col span={3} className={`tc-product-buy-title-tip2 text-center tc-mobile-col-width3 ${currTab == 't5' ? 'tc-product-tab-select' : ''}`} onClick={() => this.onClickProductTab('t5')}><FormattedMessage id="tcProductTabs5" /></Col>
            }


            {
              this.props.match.params.id != '3' &&
              (
                InitData._isPcOrMobile ? <Col span={2} className="text-center tc-mobile-col-width3" >
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
        {
          currTab == 't1' && productObj.imgList.length &&
          productObj.imgList.map((ob, idx) => {
            let _url = ob.url;
            !InitData._isPcOrMobile && (_url = _url.slice(0, 9) + '/mobile' + _url.slice(9))
            return <Row className="thinkCar-price1" key={"pdimgList" + idx} onClick={this.productBuyBtn} style={{ cursor: 'pointer' }}>
              <img alt="example" className="think-car-home-price-img" src={InitData._homeImgPath + _url} />
            </Row>
          })

        }
        {
          currTab == 't2' && <Row>
            <Row className="thinkCar-price1" >
              <img alt="example" className="think-car-home-price-img" src={InitData._homeImgPath + "/Home/img" + (InitData._isPcOrMobile ? '' : '/mobile') + "/point.jpg"} />
            </Row>
            <Row style={{ padding: '3% 30%', backgroundColor: '#fff' }}>
              <Card bordered={false}>
                {
                  productObj.parameter.length &&
                  productObj.parameter.map((ob, idx) => {
                    return <div key={"pdparameter" + idx}>
                      <Card.Grid style={_gridStyle}>{ob.title}</Card.Grid>
                      <Card.Grid style={_gridStyle}>{ob.txt}</Card.Grid>
                    </div>
                  })
                }

              </Card>
            </Row>
          </Row>
        }
        {
          currTab == 't3' && <Row>
            {(productObj.id == "1" || productObj.id == "2") && <Row>
              <Row>
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
              <Row className="tc-product-page-tab-comm" gutter={[24]}>
                {
                  _videoList.map((_x, _d) => {

                    return <Col className="tc-mobile-col-widthmax" style={{ marginBottom: '2%' }} span={6} key={"_video_item_id_" + _x.id}>
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
            </Row>}
            {productObj.id == "3" && <Empty />}
          </Row>
        }
        {
          currTab == 't4' && <Row className="tc-product-page-tab-comm"><Empty /></Row>
        }
        {
          currTab == 't5' && <Row className="tc-product-page-tab-comm" >
            {(productObj.id == "1" || productObj.id == "2") && <ThinkcarProblemPage />}
            {productObj.id == "3" && <ThinkDiagProblemPage />}
          </Row>
        }

        {/* <Tabs
          className="tc-product-page-tabs"
          tabBarStyle={{ padding: "0px 10%", backgroundColor: "#eee" }}
          tabBarExtraContent={[
            <Button type="primary" onClick={this.productBuyBtn} >
              <FormattedMessage id="tcProductBtnBuy" />
            </Button>,
          ]}
        >
          <TabPane tab={productObj.name} disabled key="productTitle"></TabPane>
          <TabPane tab={<FormattedMessage id="tcProductTabs1" />} key="1">
            {
              productObj.imgList.length &&
              productObj.imgList.map((ob, idx) => {
                return <Row className="thinkCar-price1" >
                  <img alt="example" className="think-car-home-price-img" src={InitData._homeImgPath + ob.url} />
                </Row>
              })
            }
          </TabPane>
          <TabPane tab={<FormattedMessage id="tcProductTabs2" />} key="2">
            <Row className="thinkCar-price1" >
              <img alt="example" className="think-car-home-price-img"  src={InitData._homeImgPath + "/Home/img" + (InitData._isPcOrMobile ? '' : '/mobile') + "/point.jpg"} />
            </Row>
            <Row style={{ padding: '3% 30%', backgroundColor: '#fff' }}>
              <Card bordered={false}>
                {
                  productObj.parameter.length &&
                  productObj.parameter.map((ob, idx) => {
                    return <div>
                      <Card.Grid style={_gridStyle}>{ob.title}</Card.Grid>
                      <Card.Grid style={_gridStyle}>{ob.txt}</Card.Grid>
                    </div>
                  })
                }

              </Card>
            </Row>
          </TabPane>
          <TabPane tab={<FormattedMessage id="tcProductTabs3" />} key="3">
            视频
          </TabPane>
          <TabPane tab={<FormattedMessage id="tcProductTabs4" />} key="4">
            使用教学
          </TabPane>
          <TabPane tab={<FormattedMessage id="tcProductTabs5" />} key="5">
            常见问题
          </TabPane>

        </Tabs> */}
        <Row className="thinkCar-price1" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
          <img alt="" className="think-car-home-price-img" src={InitData._homeImgPath + "/Home/img" + (InitData._isPcOrMobile ? '' : '/mobile') + "/point.jpg"} />
        </Row>
        <ThinkcarTransportPage />
        <TcPopUpLayer ref="tcPopUpLayer" tcpath={videoBannerPath} tctitle={videoTitle} />
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(ProductPage)