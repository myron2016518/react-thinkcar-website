import React from 'react'
import { Link } from 'react-router-dom'
import 'es6-promise';//fetch是基于Promise来实现的，所以还需要Promise的polyfillpromise的polyfill
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Input, Button, message, Row, Avatar } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../../public/config'
import { requestToken, set_session_cache, deepObjectMerge, getSign, browserRedirect } from '../../../public/common'
import Loading from '../../components/Loading'

class Activity1 extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      isok: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)//点击登录
    this.login = this.login.bind(this)//请求登录
    this.goToRegister = this.goToRegister.bind(this)

  }
  componentDidMount () {
    //sessionStorage.clear()
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login().then(data => {
          // console.log(data);
          // if (data) {
          //   // this.props.history.push('/')

          // }
        })
      }
    });
  }
  login () {
    let url = config.getTHINKTPMSG1;
    const { getFieldValue } = this.props.form;
    this.setState({
      isFetching: true,

    })
    var _pr = { // 接口参数
      lang: "en-us",
      user_email: getFieldValue('account'),
    };

    let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    return requestToken(url, {
      method: 'POST',
      body: _param,
    })
      .then(data => {
        this.setState({
          isFetching: false
        });
        var _d = Promise.resolve(data.res)
        if (data.datacm.status == 200) {

          _d.then((result) => {
            this.setState({ isok: true })
            return true;
          })

        } else {
          _d.then(function (result) {
            message.error(result.message || "Failure")
          })

          return false;
        }

      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error("Failure"))
        return false
      })
  }


  goToRegister () {
    this.props.history.push('/forgotpassword');
  }

  render () {
    let { isFetching, lang, isok } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { intl: { formatMessage } } = this.props;
    let _isMob = browserRedirect();
    const _path = 'https://www.mythinkcar.com';
    const _loginBanner = {
      background: `url(${_path}/Home/img/activity/ac1bg${_isMob ? '' : 'app'}.jpg) no-repeat center`,
      backgroundSize: '100% 100%',
      padding: _isMob ? "1%" : "4%",
      height: "auto",
      minHeight: "100%",
    }
    isok && (_loginBanner.padding = "0");
    return (
      <div className="tc-login-page" style={_loginBanner}>

        {
          isok ? <div className="tc_a1_1 tc_a1_7" >
            <div className="tc_a1_9"></div>
            <Row className="tc_a1_2" style={{ paddingTop: "4%" }}>THINKCAR</Row>
            <Row className="tc_a1_8 tc_a1_4">
              <img alt="THINKCAR" style={{ width: _isMob ? "4%" : "22%" }} className="think-car-home-price-img" src={`${_path}/Home/img/activity/icon.png`} />
            </Row>
            <Row className="tc_a1_3 tc_a1_8">Thank you for signing up!</Row>
            <Row className="tc_a1_4">We'll be giving away an additional THINKTPMS G1  </Row>
            <Row className="tc_a1_4 tc_a1_8">to a few lucky Kickstarter backers after the campaign. </Row>
            <Row className="tc_a1_8 tc_a1_4">
              <a href="https://www.messenger.com/t/thinkcar.official" >
                <img alt="THINKCAR" style={{ width: _isMob ? "4%" : "22%" }} className="think-car-home-price-img" src={`${_path}/Home/img/activity/icon2.png`} />
              </a>
            </Row>
            <Row className="tc_a1_4 tc_a1_8" style={{ paddingBottom: "4%" }}>Click the blue button below to Chat with us! </Row>
          </div>
            :
            <div className="tc_a1_1" style={{ width: _isMob ? "30%" : "100%", height: _isMob ? "100%" : "auto", }}>
              <Row className="tc_a1_2">THINKCAR</Row>
              <Row className="tc_a1_3">THINKTPMS G1</Row>
              <Row className="tc_a1_4">Bring Professional Tire Pressure </Row>
              <Row className="tc_a1_4">Diagnostic Services In Your Phone!</Row>
              <Row className="tc_a1_5">
                <img alt="THINKCAR" className="think-car-home-price-img" src={`${_path}/Home/img/activity/p1.png`} />
              </Row>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>

                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: "Please enter your Email" }],
                  })(
                    <Input className="tc_a1_i1" placeholder="Enter your Email here:" />
                  )}
                  <Button htmlType="submit" className="btn-block tc_a1_b1">Signup Now!
              </Button>
                </Form.Item>

              </Form>
              <Row className="tc_a1_4">Sign Up To Get Notified & Exclusive Discount Upon Launch.</Row>
              <Row className="tc_a1_6">
                <img alt="THINKCAR" style={{ width: "18%" }} className="think-car-home-price-img" src={`${_path}/Home/img/activity/icon.png`} />
              </Row>
              <Row className="tc_a1_4">√ Sign up to win a free THINKTPMS G1, limited quantity.</Row>
              <Row className="tc_a1_4">√ Get your TPMS ( Tire Pressure Monitor System) Solution. </Row>


            </div>
        }
        <Loading loading={isFetching} />
      </div>


    )

  }
}
const Login = Form.create({ name: 'login' })(Activity1);
export default injectIntl(Login)