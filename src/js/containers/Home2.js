import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Carousel, Button, Flex, PickerView, WhiteSpace } from 'antd-mobile';
import { browserRedirect, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'

class Home2Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      bannerList: [
        { label: 'b-2013', value: '2013', },
        { label: 'b-2014', value: '2014', },
        { label: 'b-2015', value: '2015', },
      ],
      curBan: ['2014'],

    }
    this.initFun = this.initFun.bind(this)
    this.onChangeBanner = this.onChangeBanner.bind(this)

  }
  componentDidMount () {
    //let qryArgs = getQueryStringArgs();
    // this.initFun(this.props)
  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (_pr) {

  }

  onChangeBanner (_v) {
    this.setState({
      curBan: _v
    })
  }

  render () {
    let { isFetching, bannerList } = this.state;
    let { InitData, intl } = this.props;
    let _isMo = browserRedirect();
    return <div className="tc_hp_m">


      <div className="tc_hc_1" >
        <img className='tc_img tc_c_p'
          src={`${InitData._homeImgPath}/Home/img2${_isMo ? '' : '/mobile'}/tc_b1_2.jpg`}
        />
        <div className="tc_h_1_1">
          <img className='tc_img tc_c_p animated fadeInUp slow'
            src={`${InitData._homeImgPath}/Home/img2${_isMo ? '' : '/mobile'}/tc_b1_1.png`}
          />
        </div>
        <div className="tc_h_1_2 animated fadeInDown slow">
          <h1> {"PROTECT CARS, PREVENT VIRUS, PROTECT FAMILIES"}</h1>
          <p> {"BUY THINKDIAG, GET FREE SQFTWARE!"}</p>
          <p> {"EXTRA FREE FACIAL MASK!"}</p>
          <Button className="tc_h_121" type="primary">Buy noew!</Button>
        </div>
        {/* <div>
          <PickerView
            onChange={this.onChangeBanner}
            // onScrollChange={this.onScrollChange}
            value={this.state.curBan}
            data={bannerList}
            cascade={false}
          />
        </div> */}
      </div>


      <Flex className="tc_h_2">
        <Flex.Item>
          <div className="tc_h_2_1">
            <img className='tc_img tc_c_p'
              src={`${InitData._homeImgPath}/Home/img2${_isMo ? '' : '/mobile'}/tc_1.jpg`}
            />
            <div className="tc_h_2_3">
              {"Change the way you diagnose your vehicle.".toLocaleUpperCase()}
            </div>
          </div></Flex.Item>
        <Flex.Item>
          <div className="tc_h_2_2">
            <img className='tc_img tc_c_p'
              src={`${InitData._homeImgPath}/Home/img2${_isMo ? '' : '/mobile'}/tc_2.jpg`}
            />
            <div className="tc_h_2_3">
              <h3>THINKTOOL</h3>
              <p>{"Change the way you diagnose your vehicle.".toLocaleUpperCase()}</p>
            </div>
          </div>
          <WhiteSpace />
          <div className="tc_h_2_2 ">
            <img className='tc_img tc_c_p'
              src={`${InitData._homeImgPath}/Home/img2${_isMo ? '' : '/mobile'}/tc_2.jpg`}
            />
            <div className="tc_h_2_3">
              <h3>THINKTOOL</h3>
              <p>{"Change the way you diagnose your vehicle.".toLocaleUpperCase()}</p>
            </div>
          </div>
        </Flex.Item>
      </Flex>


      <Loading loading={isFetching} />
    </div >
  }
}
export default injectIntl(Home2Page)