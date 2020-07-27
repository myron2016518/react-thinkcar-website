import React from 'react'
import { Button, Row, Col, message } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import request, { formatTime, get_session_cache, deepObjectMerge, getSign } from '../../public/common';
import config from '../../public/config';
import Loading from '../components/Loading'


class OrederListDetailPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      itemdata: { 'cartlist': [] }

    }
    this.getOneOrderDetails = this.getOneOrderDetails.bind(this)
  }
  componentDidMount () {
    this.getOneOrderDetails();
  }

  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  getOneOrderDetails () {

    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (_getSeuserInfo) {
      let _us = JSON.parse(_getSeuserInfo);
      this.setState({
        isFetching: true
      })
      let url = config.getOneOrderDetails;
      let _pr = { // 接口参数
        "lang": this.props.intl.locale,
        "order_id": this.props.match.params.orderid,
      };
      let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });

      return request(url, {
        method: 'POST',
        body: _param,
      })
        .then(data => {
          if (data.code == 0) {
            this.setState({
              isFetching: false,
              itemdata: data.data || { 'cartlist': [] },
            })
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
        })
    } else {
      this.props.history.push('/');
    }


  }


  render () {
    let { itemdata, isFetching } = this.state;
    let { InitData } = this.props;
    const _row_span = 24;
    // console.log(itemdata.cartlist);
    const _time_type = 'Y-M-D h:m';
    // let _servicePrice = '0.00';
    let _orderTime = (itemdata.pay_time && itemdata.pay_time != '0') ? formatTime(itemdata.pay_time, _time_type) : '--';
    let _deliveryTime = (itemdata.send_time && itemdata.send_time != '0') ? formatTime(itemdata.send_time, _time_type) : '--';
    // if (itemdata.cartlist && itemdata.cartlist.length) {
    //   itemdata.cartlist.map((_x) => {
    //     _servicePrice = (parseFloat(_servicePrice) + parseFloat(_x.service_price)).toFixed(2);
    //   });
    // }
    return (<Row className={`tc-orderdetail-page-info`}>
      <Row className="tc-orderdetail-title1">
        <FormattedMessage id="tc4_12" />
        <span style={{ paddingLeft: '3%' }} >{_orderTime}</span>
      </Row>

      <Row className="tc-orderdetail-title2">
        <Col span={10} >
          <Row ><FormattedMessage id="tc4_13" /></Row>
          <Row >
            {itemdata.status_name}
          </Row>
        </Col>
        <Col span={4} className="tc-order-cart-line"></Col>
        <Col span={10} >
          <Row ><FormattedMessage id="tc4_14" /></Row>
          <Row >
            {_deliveryTime}
          </Row>
        </Col>
      </Row>

      <Row className="tc-orderdetail-title3">
        <FormattedMessage id="tc5_2" />
        <span>
          {`: ${itemdata.street1},${itemdata.street2 ? itemdata.street2 + ',' : ''}${itemdata.city},${itemdata.province},${itemdata.country}  ${itemdata.postal_code}`}
        </span>
      </Row>
      <Row>
        {
          itemdata.cartlist.length > 0 && itemdata.cartlist.map((_item, _idx) => {
            let _is = InitData._homeApiImgPath + (_item.goods_smimg || 'Application/Api/Public/images/thinkcar1s.png');
            let _service_smimg = InitData._homeApiImgPath + (_item.service_smimg || 'Application/Api/Public/images/1car.jpg');

            return <Row key={"tc_orderdetailitem_cartlist_" + _item.id} >
              <Row className="tc-order-cartl-row tc-order-item-boder-bottom" >
                <Col span={6} className="tc-cartlist-img"><img alt={_item.goods_name} className="think-car-home-price-img tc-order-item-img" src={_is} /></Col>
                <Col span={12} className="tc-order-info-txt">
                  <p className="tc-bc-info-title">{_item.goods_name}</p>
                  <Row >
                    X {_item.quantity}
                  </Row>
                </Col>
                <Col span={6}>
                  <p className="tc-bc-info-title2">{"$ " + _item.goods_price}</p>

                </Col>

              </Row>
              {
                _item.service_id != '0' && <Row className="tc-order-cartl-row tc-order-item-boder-bottom" style={{ paddingBottom: '1%' }} >

                  <Col span={6} className="tc-cartlist-img">
                    <img alt={_item.service_name} style={{ width: '70%' }} className="think-car-home-price-img " src={_service_smimg} />
                  </Col>
                  <Col span={12} className="tc-order-info-txt">
                    <p className="tc-bc-info-title">{_item.service_name}</p>
                    <Row >
                      X {_item.quantity}
                    </Row>

                  </Col>
                  <Col span={6}>
                    <p className="tc-bc-info-title2">{"$ " + _item.service_price}</p>

                  </Col>
                </Row>
              }

            </Row>
          })
        }
      </Row>
      <Row className="tc-orderdetail-title3 tc-order-item-boder-bottom" >
        <Row className="tc-orderdetail-row">
          <Col className=" tc-order-txt1" span={16} ><FormattedMessage id="tc5_4" />: </Col>
          <Col className=" tc-order-txt2" span={8} >+${itemdata.shipping}</Col>
        </Row>
        <Row className="tc-orderdetail-row">
          <Col className=" tc-order-txt1" span={16} ><FormattedMessage id="tc4_10" />: </Col>
          <Col className=" tc-order-txt2 tc-order-txt-amount" span={8} >${itemdata.amount}</Col>
        </Row>
      </Row>

      <Row className="tc-orderdetail-title3">
        <Row>
          <Col span={10}><FormattedMessage id="tc5_5" />: </Col>
          <Col span={14} >{itemdata.payment_type}</Col>
        </Row>
        <Row >
          <Col span={10}><FormattedMessage id="tc4_11" />: </Col>
          <Col span={14} >{itemdata.order_no}</Col>
        </Row>
      </Row>
      <Loading loading={isFetching} />
    </Row>
    )
  }
}
export default injectIntl(OrederListDetailPage)
