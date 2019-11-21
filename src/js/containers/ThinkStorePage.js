import React from 'react'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Card, Empty } from 'antd';
import config from '../../public/config'
import request, { transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'
import ThinkcarTransportPage from './ThinkcarTransportPage'


const { Meta } = Card;

class ThinkStorePage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      productObj: { 'imgList': [], 'parameter': [] },

    }

    this.initFun = this.initFun.bind(this)
    this.onClickStoreProduct = this.onClickStoreProduct.bind(this)
    this.onCickPoint = this.onCickPoint.bind(this)

  }
  componentDidMount () {
    //this.initFun(this.props)
  }
  componentWillReceiveProps (newProps) {
    //this.initFun(newProps)
  }
  initFun (props) {
    if (props.match.params.id) {
      // var _d = getProductByLang(props.intl.locale, props.InitData) || [];
      // let _find = _d.find(_item => _item.id == props.match.params.id);
      // _find && this.setState({ productObj: _find });
    }
  }
  onClickStoreProduct (_id) {
    if (_id == '3') {
      window.location.href = 'https://ks.mythinkcar.com/';
    } else {
      this.props.history.push(`/ProductBuyPage/${_id}`)
    }
    // _id != '3' && this.props.history.push(`/ProductBuyPage/${_id}`)
  }
  onCickPoint () {
    this.props.history.push(`/pointdetail`)
  }

  render () {
    let { isFetching, productObj } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    var _dl = getProductByLang(intl.locale, InitData) || [];
    return (
      <div className="tc-thinkstore-page">
        {/* 三个分类  街头类   设备类  和配件 */}
        {/* <Row className="tc-thinkstore-tab-list">
          <span className="tcts-tab">Diagnostic Connecte</span>
          <span className="tcts-tab">Diagnostic Device</span>
          <span className="tcts-tab">Modules Fittings</span>
        </Row> */}

        <Row className="thinkCar-price1 think-car-padding10 think-car-home-tip2 tc-thinkstore-list" gutter={{ gutter }} >

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
              let _imgl = [<img key={"index_thinkstore_cover_Img_" + _item.id} alt={_item.name} className='think-car-home-img' src={_is} />];
              _item.id == '3' && _imgl.push(<img key={"index_thinkstore_cover_Img_jiao_" + _item.id} alt={_item.name} className='think-car-home-img-presale' src={InitData._homeImgPath + "/Home/img/presale.png"} />)
              // let _is = InitData._homeApiImgPath + (_item.smimg || '/Application/Api/Public/images/thinkcar1s.png');
              return <Col key={"index_thinkstore_" + _item.id} className="think-car-home-padding-lef5 tc-mobile-col-widthmax tc-mobile-store-page-product" span={5}>
                <Card
                  hoverable
                  bordered={false}
                  onClick={() => { this.onClickStoreProduct(_item.id) }}
                  className="tc-thinkstore-card"
                  cover={_imgl}
                >
                  <Meta title={_item.name} description={[
                    <h4 key={"index_thinkstore_Meta_" + _item.id} >{_item.id == '3' ? 'Pre-order coming soon' : "$" + _item.price}</h4>]}
                  />
                </Card>
              </Col>
            })
          }


        </Row>

        <Row className="thinkCar-price1" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
          <img alt="" className="think-car-home-price-img"
            src={InitData._homeImgPath + "/Home/img" + (InitData._isPcOrMobile ? '' : '/mobile') + "/point.jpg"}
          />
        </Row>
        <ThinkcarTransportPage />
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(ThinkStorePage)
