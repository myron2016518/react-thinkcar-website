import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Card } from 'antd';
// import config from '../../public/config'
import { _requestWebUrlOrBtnClick, browserRedirect, getProductByLang } from '../../public/common'
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
    // if (_id == '3') {
    //   _requestWebUrlOrBtnClick({ "body": { "tab": `/thinkstore_kickstarter`, "button": `productbuy3` } });
    //   window.open('https://www.kickstarter.com/projects/ericwang/thinkdiag-your-professional-car-technician-diagnostic-tool?ref=4isoa7')
    //   // window.location.href = 'https://www.kickstarter.com/projects/ericwang/thinkdiag-your-professional-car-technician-diagnostic-tool?ref=4isoa7';
    // } else if (_id == '5') {
    if (_id == '5') {
      _requestWebUrlOrBtnClick({ "body": { "tab": `/product/${_id}/t1`, "button": `product${_id}` } });
      this.props.history.push(`/product/${_id}/t1`);
      // } else if (_id == '8') {
      //   window.open('https://www.kickstarter.com/projects/ericwang/thinkdriver-intelligent-vehicle-scanner?ref=8w2adq')
    } else {
      _requestWebUrlOrBtnClick({ "body": { "tab": `/productbuy/${_id}`, "button": `productbuy${_id}` } });
      this.props.history.push(`/productbuy/${_id}`);
    }
    // _id != '3' && this.props.history.push(`/productbuy/${_id}`)
  }
  onCickPoint () {
    // _requestWebUrlOrBtnClick({ "body": { "tab": "/pointdetail", "button": "pointdetail" } });
    this.props.history.push(`/pointdetail`);
  }

  render () {
    let { isFetching, productObj } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
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
              let _isReserve = [<h4 key={"index_thinkstore_Meta_" + _item.id} >{(_item.status == '2' && _item.id != '8') ? <FormattedMessage id="tcDiagTip1" /> : "$" + _item.price}</h4>];
              if (_item.status == '0' || _item.id == '10' || _item.id == '11') return;
              switch (_item.id) {
                case '1':
                  _is = InitData._homeImgPath + "/Home/img/product_2.png";
                  break;
                case '2':
                  _is = InitData._homeImgPath + "/Home/img/product_3.png";
                  break;
                case '3':
                  _is = InitData._homeImgPath + "/Home/img/product_1.png";
                  _isReserve = [<h4 key={"index_thinkstore_Meta_" + _item.id}  >
                    <span className="tc_hot_c"><FormattedMessage id="tcHot" /></span>
                    {" $" + _item.price}</h4>];
                  break;
                case '4':
                  _is = InitData._homeImgPath + "/Home/img/product_4.png";
                  // RESERVE 样式
                  // _isReserve = [<h4 key={"index_thinkstore_Meta_" + _item.id} style={{ color: "#B90000" }} ><FormattedMessage id="tcRESERVE" /> {" $" + _item.price}</h4>];
                  break;
                case '5':
                  _is = InitData._homeImgPath + "/Home/img/product_5.png";
                  // _isReserve = [<h4 key={"index_thinkstore_Meta_" + _item.id} style={{ color: "#B90000" }}><FormattedMessage id="tcDeposit" /> {" $" + _item.price}</h4>];
                  break;
                case '6':
                  _is = InitData._homeImgPath + "/Home/img/product_6.png";
                  break;
                case '7':
                  _is = InitData._homeImgPath + "/Home/img/product_7.png";
                  break;
                case '8':
                  _is = InitData._homeImgPath + "/Home/img/product_8.png";
                  _isReserve = [<h4 key={"index_thinkstore_Meta_" + _item.id}  > {" $" + _item.price}</h4>];
                  break;
                default:
                  _is = InitData._homeImgPath + "/Home/img/product_2.png";
              }
              let _imgl = [<img key={"index_thinkstore_cover_Img_" + _item.id} alt={_item.name} className='think-car-home-img' src={_is} />];
              (_item.status == '2' && _item.id != '8') && _imgl.push(<img key={"index_thinkstore_cover_Img_jiao_" + _item.id} alt={_item.name} className='think-car-home-img-presale' src={InitData._homeImgPath + "/Home/img/presale.png"} />)
              // let _is = InitData._homeApiImgPath + (_item.smimg || '/Application/Api/Public/images/thinkcar1s.png');
              return <Col key={"index_thinkstore_" + _item.id} className="think-car-home-padding-lef5 tc-mobile-col-widthmax tc-mobile-store-page-product tc-store-card-col" span={6}>
                <Card
                  hoverable
                  bordered={false}
                  onClick={() => { this.onClickStoreProduct(_item.id) }}
                  className="tc-thinkstore-card"
                  cover={_imgl}
                >
                  <Meta title={_item.name} description={_isReserve}
                  />
                </Card>
              </Col>
            })
          }


        </Row>

        <Row className="thinkCar-price1" onClick={this.onCickPoint} style={{ cursor: 'pointer' }}>
          <img alt="" className="think-car-home-price-img"
            src={InitData._homeImgPath + "/Home/img" + (_isMob ? '' : '/mobile') + "/point.jpg"}
          />
        </Row>
        <ThinkcarTransportPage />
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(ThinkStorePage)
