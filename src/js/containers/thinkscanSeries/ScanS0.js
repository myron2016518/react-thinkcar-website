import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Button, Checkbox, Input, message } from 'antd';
import request, { getSign, deepObjectMerge, browserRedirect, remove_session_cache, getInitDataByLang, getProductByLang, get_session_cache, set_session_cache } from '../../../public/common'
import config from '../../../public/config'
import Loading from '../../components/Loading'

const CheckboxGroup = Checkbox.Group;
const { Search } = Input;

class ScanS0 extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      checkedList: [],
      dataList: [],
      inputSN: '',
    }

    this.initFun = this.initFun.bind(this)
    this.onChange = this.onChange.bind(this)
    this.softwareBuyBtn = this.softwareBuyBtn.bind(this)
    this.getSoftWareList = this.getSoftWareList.bind(this)
    this.searchSN = this.searchSN.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)
  }
  initFun (props) {
    // let _getSW = get_session_cache('tc_SoftWare_list');
    // if (_getSW) {
    //   this.setState({
    //     dataList: JSON.parse(_getSW) || []
    //   }, () => {
    //   })
    // } else {
    //   this.getSoftWareList(props);
    // }
    this.getSoftWareList(props);
  }
  getSoftWareList (_props, _sn) {
    let _url = config.getSoftWareList;
    var _pr = { // 接口参数
      "lang": _props.intl.locale || "",
      // "serial_no": "974994002183",
    };
    _sn && (_pr.serial_no = _sn || '');
    this.setState({
      isFetching: true
    });
    let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    return request(_url, {
      method: 'POST',
      body: _param,

    })
      .then(data => {
        if (data.code == 0) {
          this.setState({
            isFetching: false,
            dataList: data.data || []
          }, () => {
            set_session_cache('tc_SoftWare_list', data.data || []);
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
  }
  onChange (checkedList) {
    this.setState({
      checkedList,
    });
  };
  softwareBuyBtn () {
    let { checkedList, inputSN } = this.state;
    if (checkedList.length === 0 && !inputSN) return;
    this.props.history.push(`/software/${inputSN}/${checkedList.toString()}`)
  }
  searchSN (_sn) {

    this.setState({
      inputSN: _sn,
      checkedList: [],
      dataList: [],
    }, () => {
      this.getSoftWareList(this.props, _sn);
    });
  }



  render () {
    let { isFetching, checkedList, dataList, inputSN } = this.state;
    let _isS = inputSN === '';
    return (
      <div className="tc_scans0_page" >
        <Row>
          <h1 >THINKSCAN S99</h1>
        </Row>
        <Row>
          <span>Please select the car software you want and you will also get thesse maintenance features for FREE:BRAKE/DPF/ETS/OIL/ASA.</span>
        </Row>

        <Row className="tc_scan_i1 ">
          <Search
            className="tc_scan_i2 "
            placeholder="Please enter the SN"
            enterButton={<FormattedMessage id="tcSearch" />}
            onSearch={value => this.searchSN(value)}
          />
        </Row>

        <Row className="tc_scan_0 " >
          <Checkbox.Group onChange={this.onChange} className="tc_scan_1">
            {
              dataList.map((ob) => {
                return <Checkbox key={'checkbox_' + ob.id} disabled={_isS} className="tc_scan_2" value={ob.id}>
                  <span className="tc_scan_3"  >{ob.soft_name + ' ' + ob.version_no}</span>
                  <span style={{ float: 'right' }}>{"$ " + ob.price}</span>
                </Checkbox >;

              })
            }
          </Checkbox.Group>
        </Row>
        <Row className="text-right">
          <FormattedMessage id="tcQuantity" />:{checkedList.length}
        </Row>
        <Row className="text-right">
          <Button className="tc-buy-btn" style={{ width: 'auto' }} disabled={_isS} onClick={this.softwareBuyBtn}  >
            <FormattedMessage id={"tcProductBuyBuyNow"} />
          </Button>
        </Row>

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(ScanS0)
