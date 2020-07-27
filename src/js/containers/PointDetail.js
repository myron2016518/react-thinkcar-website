import React from 'react'
import { injectIntl } from 'react-intl';
import { Row, Col, Button } from 'antd';
import { browserRedirect } from '../../public/common'
import Loading from '../components/Loading'


class PointDetail extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
    }

    this.initFun = this.initFun.bind(this)//购买
    this.goToH5highpraise = this.goToH5highpraise.bind(this)


  }
  componentDidMount () {
    // this.initFun(this.props)
  }

  initFun (props) {

  }
  goToH5highpraise () {

  }

  render () {
    let { isFetching } = this.state;
    let { InitData } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    // !_isMob && (_url = _url.slice(0, 9) + '/mobile' + _url.slice(9))
    let _style = _isMob ? { padding: '1% 10%' } : { padding: '1%' };
    let _styleCol1 = _isMob ? { paddingRight: '1%' } : { width: '100%' };
    let _styleCol2 = _isMob ? { paddingLeft: '1%' } : { width: '100%' };
    return (
      <div className="tc-about-page" style={_style}>
        <Row className="think-car-home-price-img" >
          <Col span={12} className="tc_point_d_1" style={_styleCol1} >
            <div className="tc_point_d_yy">
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + '/Home/img/point/1.png'} />
              <div className="tc_point_d_2">
                <p><span className="tc_point_d_3">Step1</span>  Share your Thinkcar invitation code with your friends. </p>
                <p>( The invitation code is in your APP Reward page)</p>
                <p><span className="tc_point_d_3">Step2</span>  Your friends redeem your invitation code in ThinkStore checkout to enjoy $10 OFF.</p>
                <p><span className="tc_point_d_3">Step3</span>  You will get 2 points for each referral. </p>
              </div>
            </div>

          </Col>
          <Col span={12} className="tc_point_d_1" style={_styleCol2}>
            <div className="tc_point_d_yy">
              <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + '/Home/img/point/2.png'} />
              <div className="tc_point_d_2">
                <p className="tc_point_d_3">Remarks:</p>
                <p> Once making a review of Thinkcar, please click the Link to apply up to 20$ right in your account.</p>
                <div className="tc_point_d_4">
                  <a className="tc_point_d_5" target="_blank" href="https://h5.mythinkcar.com/highpraise">Apply now</a>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="tc_point_d_6 " >
          <div className="tc_point_d_7 tc_point_d_yy">
            <p className="tc_point_d_8">Points are earned by accomplishing tasks related to Thinkcar.</p>
            <p className="tc_point_d_9">In ThinkMoment, different interesting activities will lauch regularly, users will have opportunity to win points award by participate in.</p>
            <p className="tc_point_d_10">Customer service:</p>
            <p className="tc_point_d_9">Support@thinkcarus.com <span className="tc_point_d_11">Follow us</span>
              <a target="_blank" href="https://www.facebook.com/thinkcar.official/">
                <img alt="THINKCAR" className="think-car-home-price-img" style={{ width: '30px', marginRight: '10px' }} src={InitData._homeImgPath + '/Home/img/point/facebook.png'} />
              </a>
              <a target="_blank" href="https://www.youtube.com/channel/UCZhYy-zfcLiViy2fCQgWOow">
                <img alt="THINKCAR" className="think-car-home-price-img" style={{ width: '30px' }} src={InitData._homeImgPath + '/Home/img/point/YouTobe.png'} />
              </a>
            </p>
            <p className="tc_point_d_8">All of the savings. None of the effort.</p>
          </div>
        </Row>

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(PointDetail)
