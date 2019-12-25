import React from 'react'
import { Link } from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import 'es6-promise';//fetch是基于Promise来实现的，所以还需要Promise的polyfillpromise的polyfill
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Icon, Input, Button, Checkbox, message, Select, Row, Avatar } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request, { requestToken, set_session_cache, getSign, transformParas, getQueryStringArgs } from '../../public/common'
import Loading from '../components/Loading'

import mobilelogoImg from '../../img/logo.png'

const Option = Select.Option;
class LoginForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)//点击登录
    this.login = this.login.bind(this)//请求登录
    this.getUserInfo = this.getUserInfo.bind(this)
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
    let url = config.tcLogin;
    const { getFieldValue } = this.props.form;
    this.setState({
      isFetching: true
    })
    return requestToken(url, {
      method: 'POST',
      body: {
        login: getFieldValue('account'),
        password: getFieldValue('password'),
        verifiable_code: ''
      },
    })
      .then(data => {
        this.setState({
          isFetching: false
        });
        var _d = Promise.resolve(data.res)
        if (data.datacm.status == 200) {

          _d.then((result) => {
            sessionStorage.tc_access_token_token = result.access_token;
            this.getUserInfo();
            return true;
          })
          // sessionStorage.userId = data.data.user.user_id
          // sessionStorage.userName = data.data.user.user_name

        } else {
          _d.then(function (result) {
            message.error(result.message || this.props.intl.formatMessage({ id: 'tcLoginError2' }))
          })

          return false;
        }

      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcLoginError' })))
        return false
      })
  }

  getUserInfo () {
    let url = config.tcGetUserInfo;
    this.setState({
      isFetching: true
    })

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + sessionStorage.tc_access_token_token
      }
    }).then(response => {
      return response.json();  // 先将结果转换为 JSON 对象
    })
      .then(data => {

        this.setState({
          isFetching: false
        }, () => {
          set_session_cache('tc_temporary_user_info', data);
          this.props.history.push('/');
          this.props.getLoginInfo();
        })


      }).catch(error => {
        message.error(this.props.intl.formatMessage({ id: 'tcLoginError' }))
      });

    // return requestToken(url, {
    //   method: 'OPTIONS',
    //   headers: {
    //     // 'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'authorization',
    //     'Authorization': 'Bearer' + sessionStorage.token
    //   }
    // })
    //   .then(data => {
    //     this.setState({
    //       isFetching: false,
    //     })
    //     // sessionStorage.token = data.access_token
    //     // sessionStorage.userId = data.data.user.user_id
    //     // sessionStorage.userName = data.data.user.user_name
    //     return true
    //   })
    //   .catch(err => {
    //     this.setState({
    //       isFetching: false
    //     }, () => message.error(this.props.intl.formatMessage({ id: 'tcLoginError' })))
    //     return false
    //   })
  }

  goToRegister () {
    this.props.history.push('/forgotpassword');

  }

  render () {
    let { isFetching, lang } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { intl: { formatMessage } } = this.props;
    const _path = 'https://www.mythinkcar.com';
    const _loginBanner = {
      background: `url(${_path}/Home/img/login/5.jpg) no-repeat center`,
      backgroundSize: 'cover'
    }
    return (
      <div className="tc-login-page" style={_loginBanner}>
        <Row className="tc-login-title">
          <img alt="THINKCAR" className="think-car-home-price-img" src={mobilelogoImg} />
        </Row>
        <div className="tc-login-form">
          <Row className="tc-login-form-title"><FormattedMessage id="tcLoginWelcome" /></Row>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: <FormattedMessage id="tcLoginEmailInputTip" /> }],
              })(
                <Input prefix={<img style={{ width: '42%' }} className="think-car-home-price-img" src={`${_path}/Home/img/login/1.png`} />} placeholder={this.props.intl.formatMessage({ id: 'tcLoginEmail' })} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: <FormattedMessage id="tcInputPasswordTip" /> },
                  { min: 6, message: <FormattedMessage id="tcInputPasswordTip2" /> },
                  // { max: 20, message: <FormattedMessage id="maxPasswordTip"/>},
                ],
              })(
                <Input prefix={<img style={{ width: '42%' }} className="think-car-home-price-img" src={`${_path}/Home/img/login/2.png`} />} type="password" placeholder={this.props.intl.formatMessage({ id: 'tcPassword' })} />
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" className="btn-block">
                <FormattedMessage
                  id="tclogin"
                />
              </Button>

              <Link to="/tcregister" style={{ float: 'left' }} > <FormattedMessage id="tcRegisterNow" />  </Link>
              <a className="login-form-forgot pull-right" onClick={this.goToRegister}>
                <FormattedMessage id="tcForgotPassword" />
              </a>
            </Form.Item>
          </Form>
          <Row className="tc-login-fb-tw">
            <a href="https://www.facebook.com/Thinkcar-Tech-113879770027054/?modal=admin_todo_tour" >
              <Avatar src={`${_path}/Home/img/login/4.png`} />
            </a>
            <a style={{ marginLeft: '20px' }} href="https://twitter.com/ObdThinkcar" >
              <Avatar src={`${_path}/Home/img/login/3.png`} />
            </a>
          </Row>
        </div>
        <Row className="tc-login-footer">
          <FormattedMessage id="footerLastTip1" />
        </Row>
        <Loading loading={isFetching} />
      </div>


    )

  }
}
const Login = Form.create({ name: 'login' })(LoginForm);
export default injectIntl(Login)