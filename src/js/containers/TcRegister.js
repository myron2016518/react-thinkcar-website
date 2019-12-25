import React from 'react'
import { Link } from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Icon, Input, Button, Row, Checkbox, Col, message, } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request, { getSign, transformParas, getQueryStringArgs } from '../../public/common'
import Loading from '../components/Loading'
import PrivacyPolicy from '../components/PrivacyPolicy'

class TcRegisterForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      remainingTime: 0,
    }
    this.timer = null//获取验证码计时器
    this.verificationcaodeSatus = false
    this.handleSubmit = this.handleSubmit.bind(this)//点击提交表单
    this.getRegister = this.getRegister.bind(this)//
    this.sendVerificationCode = this.sendVerificationCode.bind(this) // 获取验证码
    this.runTimer = this.runTimer.bind(this)//获取验证码倒计时
    this.openPrivacyPolicy = this.openPrivacyPolicy.bind(this)//打开隐私政策
    this.goToPageMethod = this.goToPageMethod.bind(this)

  }

  componentDidMount () {
    this.verificationcaodeSatus = true
  }
  componentWillUnmount () {
    this.verificationcaodeSatus = false
  }
  handleSubmit (e) {
    e.preventDefault();
    const { getFieldValue } = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (getFieldValue('tcregisteragreement')) {
          this.getRegister().then(data => {
            if (data) {
              setTimeout(() => {
                this.props.history.push('/')
              }, 3000)

            }
          })
        } else {
          message.warning(this.props.intl.formatMessage({ id: 'tcRegisterCheckedAgreement' }))
        }

      }
    });
  }
  getRegister () {
    let url = config.tcRegister;
    const { getFieldValue } = this.props.form;
    this.setState({
      isFetching: true
    })
    return request(url, {
      method: 'post',
      body: {
        verifiable_type: 'mail',
        verifiable_code: getFieldValue('tcregisterverificationcode'),
        name: getFieldValue('tcregisterusername'),
        email: getFieldValue('tcregisteremail'),
        password: getFieldValue('tcregisterpasswordpw')
      },
    })
      .then(data => {
        message.success(this.props.intl.formatMessage({ id: 'tcRegisterSucess' }), 3);
        sessionStorage.tc_access_token_token = data.token;
        return true
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tcRegisterFailed' }), 10))
        return false
      })
  }

  sendVerificationCode () {
    const { getFieldValue } = this.props.form;
    this.props.form.validateFields(['tcregisteremail'], (err, values) => {
      if (!err) {

        let url = config.tcverifycodesregister;
        this.setState({
          isFetching: true
        })
        return request(url, {
          method: 'post',
          body: {
            'email': getFieldValue('tcregisteremail') || ''
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
            }, () => message.error(this.props.intl.formatMessage({ id: 'tcRegisterSendVCError' })))
            return false
          })
      }
    });

  }
  openPrivacyPolicy () {
    this.refs.privacyPolicy.showModal()
  }
  goToPageMethod (_path) {
    this.props.history.push(_path)
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 18,
        },

      },
    };
    return (
      <div className="tc-tcregister-page">
        <Row className="tc-register-title-left"><FormattedMessage id="tcThinckcar" /> </Row>
        <Row className="tc-register-title-right">
          <span><FormattedMessage id="tcRegisterTitleRight1" />  </span>
          <span className="tc-rtr-btn" onClick={() => { this.goToPageMethod('/login') }} ><FormattedMessage id="tcRegisterTitleRight2" /></span>
          <span >  |  </span>
          <span className="tc-rtr-btn" onClick={() => { this.goToPageMethod('/') }}><FormattedMessage id="tcRegisterTitleRight3" /></span>
        </Row>
        <Row className="tc-register-title2"><FormattedMessage id="tcRegisterTitle1" /> </Row>
        <Form onSubmit={this.handleSubmit} className="tc-register-form" >
          <Form.Item >
            {getFieldDecorator('tcregisterusername', {
              rules: [
                { required: true, message: <FormattedMessage id="tcregisterusernameTip" /> },
                { min: 4, message: <FormattedMessage id="tcregisterusernameTip" /> },
                { max: 20, message: <FormattedMessage id="tcregisterusernameTip" /> },
              ],

            })(<Input
              placeholder={this.props.intl.formatMessage({ id: 'tcregisterusernamePh' })}
              prefix={<img style={_imgStyle} className="think-car-home-price-img" src={`${_path}/Home/img/login/6.png`} />}
            />)}
          </Form.Item>
          <Form.Item >
            <Row gutter={8}>
              <Col span={14}>
                {getFieldDecorator('tcregisteremail', {
                  rules: [{ required: true, message: <FormattedMessage id="tcLoginEmailInputTip" /> }],
                })(<Input
                  placeholder={this.props.intl.formatMessage({ id: 'tcForgotPasswordFormEmailPh' })}
                  prefix={<img style={_imgStyle} className="think-car-home-price-img" src={`${_path}/Home/img/login/1.png`} />}
                />)}
              </Col>
              <Col span={10} style={{ overflow: 'hidden' }}>

                {
                  remainingTime > 0
                    ? <Button className="btn-block disabled " htmlType="button">
                      {remainingTime} S
											</Button>
                    : <Button className="btn-block tc-register-vc-btn" htmlType="button" onClick={this.sendVerificationCode}><FormattedMessage id="tcForgotPasswordFormBtnVC" /></Button>
                }

              </Col>
            </Row>
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('tcregisterverificationcode', {
              rules: [
                { required: true, message: <FormattedMessage id="tcForgotPasswordFormVCTip" /> },
                { min: 4, message: <FormattedMessage id="tcForgotPasswordFormVCTip" /> },
                { min: 6, message: <FormattedMessage id="tcForgotPasswordFormVCTip" /> },
              ],
            })(<Input
              placeholder={this.props.intl.formatMessage({ id: 'tcForgotPasswordFormVCPh' })}
              prefix={<img style={_imgStyle} className="think-car-home-price-img" src={`${_path}/Home/img/login/7.png`} />}
            />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('tcregisterpasswordpw', {
              rules: [
                { required: true, message: <FormattedMessage id="tcInputPasswordTip" /> },
                { min: 6, message: <FormattedMessage id="tcInputPasswordTip2" /> },

              ],
            })(<Input.Password
              placeholder={this.props.intl.formatMessage({ id: 'tcPassword' })}
              prefix={<img style={_imgStyle} className="think-car-home-price-img" src={`${_path}/Home/img/login/2.png`} />}
            />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('tcregisteragreement', {
              valuePropName: 'checked',
              rules: [
                { required: true, message: <FormattedMessage id="tcInputregisteragreementTip" /> },
              ],
            })(
              <Checkbox>
                <FormattedMessage id="tcregagreementTip" />{` `}
                <span style={{ color: '#1C1F86' }} onClick={this.openPrivacyPolicy}>
                  <FormattedMessage id="tcregagreement" />
                </span>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" className="btn-block">
              <FormattedMessage id="tcregister" />
            </Button>

          </Form.Item>
        </Form>
        <Row className="tc-register-footer">
          <FormattedMessage id="footerLastTip1" />
        </Row>
        <Loading loading={isFetching} />
        <PrivacyPolicy ref="privacyPolicy" lang={this.props.intl.locale} />
      </div>


    )

  }
}
const TcRegister = Form.create({ name: 'tcregister' })(TcRegisterForm);
export default injectIntl(TcRegister)