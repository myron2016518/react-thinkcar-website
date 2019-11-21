import React from 'react'
import { Button, message, Table, Drawer, Empty, Row, Col, Icon, Modal, InputNumber } from 'antd';
import { FormattedMessage } from 'react-intl';
import config from '../../public/config'
import request, { transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'
import Task from '../components/Task'
import InitData from '../components/InitData'

const { confirm } = Modal;
const PAGE_SIZE = 10
export default class HistoryTask extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      visible: this.props.buyDrawerVisible || false,
      page: 1,
      total: 20,
      buyCarList: [],
    }
    // this.getHistoryTaskList = this.getHistoryTaskList.bind(this)//获取历史任务
    this.initList = this.initList.bind(this)
    this.onClose = this.onClose.bind(this)
    this.openTask = this.openTask.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.deleteChooseProduct = this.deleteChooseProduct.bind(this)// 删除选择商品
    this.buyCarShowNow = this.buyCarShowNow.bind(this)// 去选商品

  }
  componentDidMount () {
    this.initList(this.props);

  }
  componentWillReceiveProps (newProps) {
    this.initList(newProps);
  }
  initList (da) {
    // if (da.buyDrawerList.buyDrawerVisible && da.buyDrawerList) {
    this.setState({
      buyCarList: da.buyDrawerList.list
    })
    // }
  }
  getHistoryTaskList () {
    this.setState({
      isFetching: true
    })
    let url = config.getHistoryTaskList,
      { page } = this.state,
      param = {
        user_id: sessionStorage.userId,
        serial_number: this.props.serialNo,
        page: page,
        size: PAGE_SIZE
      };

    return request(url, {
      method: 'POST',
      body: param,
    })
      .then(data => {
        if (data.code == 0) {
          let res = data.data
          this.setState({
            isFetching: false,
            taskList: res.task_list,
            total: parseFloat(res.total)
          })

          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.msg))
          return false
        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  }
  showDrawer () {
    this.setState({
      visible: true,
    }, () => this.getHistoryTaskList());
  };
  onClose () {
    this.setState({
      visible: false,
    });
  };
  openTask (taskId) {
    this.taskDrawer.showDrawer(taskId)

  }
  onPageChange (pageNumber) {
    this.setState({
      page: pageNumber
    }, () => {
      this.getHistoryTaskList()
    })
  }
  deleteChooseProduct (type) {
    var _that = this;
    confirm({
      title: 'Do you want to delete ?',
      content: 'When clicked the OK button, this dialog will be closed.',
      onOk () {
        // return new Promise((resolve, reject) => {
        // }).catch(() => console.log('Oops errors!'));
        _that.props.buyCarListDeletItem(type);
      },
      onCancel () { },
    });
  }
  buyCarShowNow () {
    this.props.history.push('/order/buyCarList/null');
    this.props.headerCloseBuy();
  }

  render () {
    let { isFetching, visible, page, total, buyCarList } = this.state
    let _total = 0, _serviceAllprice = 0, _buyAllNumber = 0;
    if (buyCarList.length) {
      buyCarList.map((ob, idx) => {
        _buyAllNumber += parseFloat(ob.number);
        if (ob.service) {
          var _d = getProductByLang(this.props.lang, InitData) || [];
          _d = _d.find(_item => _item.id == ob.id);
          var _service = _d.serviceList.find(_item => _item.id == ob.serviceType);
          _serviceAllprice += ob.number * _service.price;
          _serviceAllprice = parseFloat((_serviceAllprice) * 100) / 100;
        }
        _total = (parseFloat(_total) + (ob.number * ob.price));
      })
      _total = (parseFloat(_total) + _serviceAllprice).toFixed(2);
      _serviceAllprice = _serviceAllprice.toFixed(2);
    }


    return <div className="history-task-page think-car-buycar-page">
      <Drawer
        key="HeaderThinkCarKey"
        title={[
          <Icon key="HeaderThinkCarTitleKeyOne" type="shopping-cart" style={{ fontSize: '20px', width: '10%' }} />,
          <FormattedMessage key="HeaderThinkCarTitleKeyTwo" id="tcHTPMyshoppingCar" />
        ]}
        className="tc-history-task-page"
        placement="right"
        closable={true}
        headerStyle={{ backgroundColor: '#1C1F86', padding: '5%' }}
        onClose={this.props.headerCloseBuy}
        visible={this.props.buyDrawerList.buyDrawerVisible}
        maskClosable={true}
        width={'375px'}

      >
        {
          buyCarList.length ?
            buyCarList.map((ob, idx) => {
              let _is = InitData._homeApiImgPath + (ob.smimg || 'Application/Api/Public/images/thinkcar1s.png');
              // switch (ob.id) {
              //   case '1':
              //     _is = thinkcar1Img;
              //     break;
              //   case '2':
              //     _is = thinkcar1sImg;
              //     break;
              //   case '3':
              //     _is = thinkdiagImg;
              //     break;
              //   default:
              //     _is = thinkcar1Img;
              // }
              let _service = null;
              if (ob.service) {
                var _d = getProductByLang(this.props.lang, InitData) || [];
                _d = _d.find(_item => _item.id == ob.id);
                _service = _d.serviceList.find(_item => _item.id == ob.serviceType);

              }

              return <div key={`buyCarList_${ob._suijiId}`} className="tc-buy-car-list-div">
                <Row gutter={[10]}>
                  <Col span={6} className="tc-buy-car-img"><img alt={ob.name} className="think-car-home-price-img" src={_is} /></Col>
                  <Col span={12}>
                    <p className="tc-bc-info-title">{ob.name}</p>
                    <Row gutter={[5]}>
                      <Col span={6}>
                        <Button className="tc-buyNumberInfoStyle" icon="plus" onClick={() => this.props.onChangeBuyNumberInList(ob.number, ob, 'add')} />
                      </Col>
                      <Col span={10}>
                        <InputNumber className="tc-buyNumberInfoStyle" min={1} value={ob.number} onPressEnter={(e) => this.props.onChangeBuyNumberInList(e, ob, 'select')} />
                      </Col>
                      <Col span={6}>
                        <Button className="tc-buyNumberInfoStyle" icon="minus" onClick={() => this.props.onChangeBuyNumberInList(ob.number, ob, 'minus')} />
                      </Col>
                    </Row>

                  </Col>
                  <Col span={6}>
                    <p className="tc-bc-info-title2">{"$ " + ob.price}</p>
                    <p className="tc-text-align-right">
                      <Button
                        className="tc-buy-cart-list-delete-tiem"
                        style={{ border: "0px", textAlign: 'right' }}
                        shape="circle" icon="delete"
                        onClick={() => this.deleteChooseProduct(ob._suijiId)}
                      />
                    </p>
                  </Col>
                </Row>
                {
                  ob.service &&
                  <Row gutter={[10]} className="tc-service-info" >
                    <span className="tc-bc-info-title"><FormattedMessage id="tcService" /></span>
                    <span className="tc-bc-info-title2 tc-float-right">{_service.name}&nbsp;&nbsp;&nbsp;${_service.price}</span>
                  </Row>
                }

              </div>
              // <p key={"listCar" + ob.name + idx}>{ob.name + ' ' + ob.number + ' = ' + ob.price}</p>
            })
            : <Empty />
        }
        {
          buyCarList.length ?
            <div className="tc-buy-car-product-all-info">
              <Row className="tc-row-5">
                <Col span={18} className="tc-title1"><FormattedMessage id="tcQuantity" /></Col>
                <Col span={6} className="tc-title2 tc-text-align-right">{_buyAllNumber}</Col>
              </Row>
              <Row className="tc-row-5">
                <Col span={18} className="tc-title1"><FormattedMessage id="tcService" /></Col>
                <Col span={6} className="tc-title2 tc-text-align-right">${_serviceAllprice}</Col>
              </Row>
              <Row className="tc-row-5">
                <Col span={16} className="tc-title1 tc-text-align-right"><FormattedMessage id="tcTotal" /></Col>
                <Col span={8} className="tc-title2 tc-text-align-right">${_total}</Col>
              </Row>
              {/* <Button type="primary" onClick={this.buyCarShowNow} >CHECK OUT</Button> */}
              <Row className="tc-row-5" gutter={[14]}>
                <Col span={24}>
                  <Button className="tc-buy-btn tc-buy-btn-addBuy" onClick={this.buyCarShowNow} >
                    <FormattedMessage id="tcHTPSettleNowr" />
                  </Button>
                </Col>
                {/* <Col span={16}>
                  <Button className="tc-buy-btn tc-buy-btn-addBuy" onClick={this.buyCarShowNow} >
                    <FormattedMessage id="tcHTPSettleNowr" />
                  </Button>
                </Col>
                <Col span={8}>
                  <Button className="tc-buy-btn tc-buy-btn-nowBuy" onClick={this.buyCarShowNow} >
                    <FormattedMessage id="tcHTPMyOrder" />
                  </Button>
                </Col> */}
              </Row>
            </div>
            : ''
          // <Button type="primary" onClick={this.buyCarShowNow} >Show Now</Button>
        }

      </Drawer>
      <Loading loading={isFetching} />
    </div >


  }
}
