import React from 'react'
import { Link } from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Icon, Input, Button, Row, Col, message, } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request, { getSign, transformParas, getQueryStringArgs } from '../../public/common'
import Loading from '../components/Loading'

class ForgotPasswordForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      remainingTime: 0,
    }
    this.timer = null//获取验证码计时器
    this.verificationcaodeSatus = false
    this.handleSubmit = this.handleSubmit.bind(this)//点击提交表单
    this.getForgotpassword = this.getForgotpassword.bind(this)//
    this.sendVerificationCode = this.sendVerificationCode.bind(this) // 获取验证码
    this.runTimer = this.runTimer.bind(this)//获取验证码倒计时

  }

  componentDidMount () {
    this.verificationcaodeSatus = true
  }
  componentWillUnmount () {
    this.verificationcaodeSatus = false
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getForgotpassword().then(data => {
          if (data) {
            setTimeout(() => {
              this.props.history.push('/login')
            }, 2000)

          }
        })
      }
    });
  }
  getForgotpassword () {
    let url = config.tcForgotPasswordSubmit;
    const { getFieldValue } = this.props.form;
    this.setState({
      isFetching: true
    })
    return request(url, {
      method: 'put',
      body: {
        verifiable_type: 'mail',
        verifiable_code: getFieldValue('forgotverificationcode'),
        email: getFieldValue('forgotemail'),
        password: getFieldValue('forgotpasswordpw')
      },
    })
      .then(data => {
        message.success(this.props.intl.formatMessage({ id: 'tcForgotPasswordSuccess' }), 1.5);
        return true
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcOperationFailure' })))
        return false
      })
  }

  sendVerificationCode () {
    const { getFieldValue } = this.props.form;
    this.props.form.validateFields(['forgotemail'], (err, values) => {
      if (!err) {

        let url = config.tcForgotPasswordverifycodes;
        this.setState({
          isFetching: true
        })
        return request(url, {
          method: 'post',
          body: {
            'email': getFieldValue('forgotemail') || ''
          }
        })
          .then(data => {
            this.setState({
              isFetching: false,
              remainingTime: 60

            }, () => {
              message.success(this.props.intl.formatMessage({ id: 'tcForgotPasswordFormSendVCSuccess' }), 1.5);
              this.timer = setInterval(() => {
                if (this.state.remainingTime == 0) {
                  clearInterval(this.timer)
                } else {
                  this.runTimer()
                }
              }, 1000)

            })
            return true
          })
          .catch(err => {
            this.setState({
              isFetching: false
            }, () => message.error(this.props.intl.formatMessage({ id: 'tcForgotPasswordFormSendVCError' })))
            return false
          })
      }
    });

  }

  runTimer () {
    if (this.verificationcaodeSatus) {
      this.setState({
        remainingTime: this.state.remainingTime - 1
      })
    }

  }

  render () {
    let { isFetching, lang, remainingTime } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { intl: { formatMessage } } = this.props;
    const _path = 'https://www.mythinkcar.com';
    const _imgStyle = { width: '42%' };
    return (
      <div className="tc-forgotpassword-page">
        <Form onSubmit={this.handleSubmit} >

          <Form.Item >
            <Row gutter={8}>
              <Col span={14}>
                {getFieldDecorator('forgotemail', {
                  rules: [{ required: true, message: <FormattedMessage id="tcLoginEmailInputTip" /> }],
                })(<Input
                  placeholder={this.props.intl.formatMessage({ id: 'tcForgotPasswordFormEmailPh' })}
                  prefix={<img style={_imgStyle} className="think-car-home-price-img" src={`${_path}/Home/img/login/1.png`} />}
                />)}
              </Col>
              <Col span={10} style={{ overflow: 'hidden' }}>

                {
                  remainingTime > 0
                    ? <Button className="btn-block disabled" htmlType="button">
                      {remainingTime} S
											</Button>
                    : <Button className="btn-block tc-register-vc-btn" htmlType="button" onClick={this.sendVerificationCode}><FormattedMessage id="tcForgotPasswordFormBtnVC" /></Button>
                }

              </Col>
            </Row>
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('forgotverificationcode', {
              rules: [
                { required: true, message: <FormattedMessage id="tcForgotPasswordFormVCTip" /> },
                { min: 4, message: <FormattedMessage id="tcForgotPasswordFormVCTip" /> },
                { max: 6, message: <FormattedMessage id="tcForgotPasswordFormVCTip" /> },
              ],
            })(<Input
              placeholder={this.props.intl.formatMessage({ id: 'tcForgotPasswordFormVCPh' })}
              prefix={<img style={_imgStyle} className="think-car-home-price-img" src={`${_path}/Home/img/login/7.png`} />}
            />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('forgotpasswordpw', {
              rules: [
                { required: true, message: <FormattedMessage id="tcInputPasswordTip" /> },
                { min: 6, message: <FormattedMessage id="tcInputPasswordTip2" /> },

              ],
            })(<Input.Password
              placeholder={this.props.intl.formatMessage({ id: 'tcPassword' })}
              prefix={<img style={_imgStyle} className="think-car-home-price-img" src={`${_path}/Home/img/login/2.png`} />}
            />)}
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" className="btn-block">
              <FormattedMessage id="tcForgotPasswordFormBtnOK" />
            </Button>

          </Form.Item>
        </Form>

        <Loading loading={isFetching} />
      </div>


    )

  }
}
const ForgotPassword = Form.create({ name: 'forgotpassword' })(ForgotPasswordForm);
export default injectIntl(ForgotPassword)