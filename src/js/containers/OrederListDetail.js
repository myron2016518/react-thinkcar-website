import React from 'react'
import { Button, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import request, { formatTime } from '../../public/common'
import choosethinkcar1 from '../../img/choosethinkcar1.png'
import choosethinkcar1s from '../../img/choosethinkcar1s.png'


export default class OrederListDetail extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      moreStatus: false,

    }
    this.onChangeMoreStatus = this.onChangeMoreStatus.bind(this)
  }
  componentDidMount () {

  }
  onChangeMoreStatus () {
    this.setState({ moreStatus: !this.state.moreStatus });
  }

  render () {
    let { moreStatus } = this.state;
    let { itemdata, InitData } = this.props;
    const _row_span = 24;
    const _time_type = 'Y-M-D h:m';
    // console.log(itemdata);
    let _servicePrice = '0.00';
    let _orderTime = (itemdata.pay_time && itemdata.pay_time != '0') ? formatTime(itemdata.pay_time, _time_type) : '--';
    let _deliveryTime = (itemdata.send_time && itemdata.send_time != '0') ? formatTime(itemdata.send_time, _time_type) : '--';
    if (itemdata.cartList.length) {
      itemdata.cartList.map((_x) => {
        _servicePrice = (parseFloat(_servicePrice) + parseFloat(_x.service_price)).toFixed(2);
      });
    }
    return <Row>

      <Row>
        <Row className={`tc-orderdetail-info`}>
          {
            itemdata.cartList.length > 0 && itemdata.cartList.map((_item, _idx) => {
              let _is = InitData._homeApiImgPath + (_item.goods_smimg || 'Application/Api/Public/images/thinkcar1s.png');
              let _service_smimg = InitData._homeApiImgPath + (_item.service_smimg || 'Application/Api/Public/images/1car.jpg');
              // switch (_item.goods_id) {
              //   case '1':
              //     _is = choosethinkcar1s;
              //     break;
              //   case '2':
              //     _is = choosethinkcar1;
              //     break;
              //   case '3':
              //     _is = choosethinkcar1s;
              //     break;
              //   default:
              //     _is = choosethinkcar1s;
              // }
              let _moreStatusShow = 'tc-order-more-status';
              (moreStatus || _idx == 0) && (_moreStatusShow = '');
              return <Row key={"tc_orderitem_cartlist_" + _item.id} className={_moreStatusShow}>
                <Row className="tc-order-cartl-row" >
                  <Col className="tc-mobile-col-widthmax tx-orderdetail-cartlist" span={10}>
                    <Row gutter={[_row_span]}>
                      <Col span={6} className="tc-cartlist-img"><img alt={_item.goods_name} className="think-car-home-price-img" src={_is} /></Col>
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
                  </Col>
                  <Col className="tc-mobile-col-widthmax tx-orderdetail-cartlist" span={14}>
                    <Row style={{ textAlign: 'left', paddingBottom: '1%' }}><FormattedMessage id="tcOrderListTip2" />: {_item.order_no}</Row>
                    <Row >
                      <Col span={5} >
                        <Row ><FormattedMessage id="tcOrderListTip3" /></Row>
                        <Row >
                          {_orderTime}
                        </Row>
                      </Col>
                      <Col span={2} className="tc-order-cart-line"></Col>
                      <Col span={5} >
                        <Row ><FormattedMessage id="tcOrderListTip4" /></Row>
                        <Row >
                          {itemdata.status}
                        </Row>
                      </Col>
                      <Col span={2} className="tc-order-cart-line"></Col>
                      <Col span={5} >
                        <Row ><FormattedMessage id="tcOrderListTip5" /></Row>
                        <Row >
                          {_deliveryTime}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {
                  _item.service_id != '0' && <Row className="tc-order-cartl-row" style={{ paddingBottom: '1%' }} >
                    <Col className="tc-mobile-col-widthmax tx-orderdetail-cartlist" span={10}>
                      <Row gutter={[_row_span]}>
                        <Col span={6} className="tc-cartlist-img">
                          <img alt={_item.service_name} className="think-car-home-price-img" src={_service_smimg} />
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
                    </Col>
                    <Col className="tc-mobile-col-widthmax tx-orderdetail-cartlist" span={14}>
                      <Row style={{ textAlign: 'left', paddingBottom: '1%' }}><FormattedMessage id="tcOrderListTip2" />: {_item.order_no}</Row>
                      <Row >
                        <Col span={5} >
                          <Row ><FormattedMessage id="tcOrderListTip3" /></Row>
                          <Row >
                            {_orderTime}
                          </Row>
                        </Col>
                        <Col span={2} className="tc-order-cart-line"></Col>
                        <Col span={5} >
                          <Row ><FormattedMessage id="tcOrderListTip4" /></Row>
                          <Row >
                            {itemdata.status}
                          </Row>
                        </Col>
                        <Col span={2} className="tc-order-cart-line"></Col>
                        <Col span={5} >
                          <Row ><FormattedMessage id="tcOrderListTip5" /></Row>
                          <Row >
                            {_deliveryTime}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                }

              </Row>
            })
          }
          {
            moreStatus ?
              <Row style={{ borderBottom: '1px solid #eee' }}>
                <Row className="tc-orderdetail-row" gutter={[_row_span]}>
                  <Col span={4}><FormattedMessage id="tcOrderTitle5" />: </Col>
                  <Col span={14} style={{ textAlign: 'left' }}>{itemdata.payment_type}</Col>
                  <Col span={4} className="tc-order-txt1"><FormattedMessage id="tcService" />: </Col>
                  <Col span={2} className="tc-order-txt2">+${_servicePrice}</Col>
                </Row>
                <Row className="tc-orderdetail-row" gutter={[_row_span]}>
                  <Col span={4}><FormattedMessage id="tcOrderTitle2" />: </Col>
                  <Col span={14} style={{ textAlign: 'left' }}>
                    {`${itemdata.street1},${itemdata.street2 ? itemdata.street2 + ',' : ''}${itemdata.city},${itemdata.province},${itemdata.country}  ${itemdata.postal_code}`}
                  </Col>
                  <Col span={4} className="tc-order-txt1"><FormattedMessage id="tcOrderTitle4" />: </Col>
                  <Col span={2} className="tc-order-txt2">+${itemdata.shipping}</Col>
                </Row>
                <Row className="tc-orderdetail-row" gutter={[_row_span]}>
                  <Col span={18} ></Col>
                  <Col span={4} className="tc-order-txt1"><FormattedMessage id="tcOrderListTip1" />: </Col>
                  <Col span={2} className="tc-order-txt2 tc-order-txt-amount">${itemdata.amount}</Col>
                </Row>
              </Row>
              : <Row style={{ borderBottom: '1px solid #eee' }} className="tc-orderdetail-row" gutter={[_row_span]}>
                <Col span={4}><FormattedMessage id="tcOrderTitle5" />: </Col>
                <Col span={14} style={{ textAlign: 'left' }}>{itemdata.payment_type}</Col>
                <Col span={4} className="tc-order-txt1"><FormattedMessage id="tcOrderListTip1" />: </Col>
                <Col span={2} className="tc-order-txt2 tc-order-txt-amount">${itemdata.amount}</Col>
              </Row>
          }
        </Row>
        <Row>
          <Button className="tc-roderdetail-btn-more" onClick={this.onChangeMoreStatus}>
            {moreStatus ? <FormattedMessage id="tcOrderListBtnCOLLAPSE" /> : <FormattedMessage id="tcOrderListBtnMore" />}
          </Button>
        </Row>
      </Row>
    </Row >
  }
}
