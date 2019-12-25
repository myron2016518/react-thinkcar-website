import React from 'react'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Empty, message, Pagination } from 'antd';
import config from '../../public/config'
import request, { transformStatus, transformTime, browserRedirect, getProductByLang, getSign, deepObjectMerge, get_session_cache } from '../../public/common'
import Loading from '../components/Loading'
import ThinkcarTransportPage from './ThinkcarTransportPage'
import OrederListDetail from './OrederListDetail'


const PAGE_SIZE = 5

class OrderListPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      orderList: [],
      page: 1,
      total: 0,
    }

    this.initFun = this.initFun.bind(this)
    this.getOrderList = this.getOrderList.bind(this)
    this.onPageChange = this.onPageChange.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)
  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    this.getOrderList()
  }

  getOrderList () {
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (_getSeuserInfo) {
      let _us = JSON.parse(_getSeuserInfo);
      this.setState({
        isFetching: true
      })
      let url = config.getUserOrderList,
        { page } = this.state;
      let _pr = { // 接口参数
        "lang": this.props.intl.locale,
        "user_token": 'Bearer' + sessionStorage.tc_access_token_token,
        "user_id": _us.id,
        "page": page,
        "num": PAGE_SIZE,
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
              total: parseInt(data.data.count),
              orderList: data.data.list
            })
            return true

          } else if (data.code == -2) {
            this.setState({
              isFetching: false
            }, () => {
              message.error(data.message)
              setTimeout(() => {
                this.props.history.push('/login');
              }, 2000)
            })
            return false
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

  onPageChange (pageNumber) {
    this.setState({
      page: pageNumber
    }, () => {
      this.getOrderList()
    })
  }
  render () {
    let { isFetching, orderList, page, total } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    let _bannerImg = _isMob ? InitData._homeImgPath + '/Home/img/order_banner.jpg' : InitData._homeImgPath + '/Home/img/mobile/order_banner.jpg'
    return (
      <div className="tc-orderlist-page">
        <Row className="thinkCar-price1"  >
          <img alt="order" className="think-car-home-price-img" src={_bannerImg} />
        </Row>
        <Row className={_isMob ? "thinkCar-price1 think-car-padding10 think-car-home-tip2 tc-order-list-info" : "thinkCar-price1 think-car-home-tip2 tc-order-list-info tc-orderlist-mobile"}  >
          <Row>
            <h2 className="tc-order-title"><FormattedMessage id="tcOrderListTitle" /></h2>
          </Row>
          <Row >
            {
              orderList.length > 0 && orderList.map((_item, _idx) => {
                return <OrederListDetail
                  key={'orderListItem_' + _item.id}
                  history={this.props.history}
                  InitData={InitData} itemdata={_item}
                />
              })
            }
            {orderList.length > 0 &&
              <Pagination
                style={{ paddingTop: '1%' }}
                // className="tc-padding-top-1"
                // showQuickJumper
                pageSize={PAGE_SIZE}
                current={page}
                total={total}
                onChange={this.onPageChange} />}

            {!orderList.length && <Empty />}
          </Row>

        </Row>

        <ThinkcarTransportPage />
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(OrderListPage)
