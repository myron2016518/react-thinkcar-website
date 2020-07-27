import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Modal, Button, Row, Col, Form, Input, message } from 'antd';
import request, { deepObjectMerge, getSign, transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'
import config from '../../public/config'

class RedemptionPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
    }

    this.initFun = this.initFun.bind(this)//购买
    this.handleSubmit = this.handleSubmit.bind(this)//点击
    this.onClickRewardsCode = this.onClickRewardsCode.bind(this)//接口

  }
  componentDidMount () {
    // this.initFun(this.props)
  }

  initFun (props) {

  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onClickRewardsCode().then(data => {
          if (data) {
            // this.props.history.push('/')
          }
        })
      }
    });
  }

  onClickRewardsCode () {

    const { getFieldValue } = this.props.form;
    let _url = config.rewardsCode;
    var _pr = { // 接口参数
      "lang": this.props.intl.locale,
      "user_email": getFieldValue("tcRedemptionInputEmail") || "",
      "rcode": getFieldValue("tcRedemptionInputRewardsCode") || "",
    };
    this.setState({
      isFetching: true
    });
    let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
    // console.log('=======', _param);
    return request(_url, {
      method: 'POST',
      body: _param,

    })
      .then(data => {
        if (data.code == 0) {
          this.setState({
            isFetching: false,
          })
          Modal.success({
            content: 'Redeem success',
          });
          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.msg))
          return false

        }
      })
      .catch(err => {
        // console.log('===err====', err);
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  }

  render () {
    let { isFetching } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { intl: { formatMessage }, InitData } = this.props;
    const gutter = 16;

    return (
      <div className="tc-redemption-page">

        <Row className="tc-redemption-info">
          <Row className="tc-redemption-img1 think-car-home-price-img">
            <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + '/Home/img/bar_code.png'} />
          </Row>
          <Row className="tc-redemption-title1">
            <h4><FormattedMessage id="tcRedemptionTitle1" /></h4>
          </Row>
          <Row className="tc-redemption-title2">

            <span className="tc-redemption-dotted-left"></span>
            <hr className="tc-redemption-dotted-center" />
            <span className="tc-redemption-dotted-right"></span>
          </Row>
          <Row className="tc-redemption-form-info">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('tcRedemptionInputEmail', {
                  rules: [{
                    type: 'email', message: <FormattedMessage id="tc1" />,
                  }, {
                    required: true, message: <FormattedMessage id="tcRedemptionInputEmail" />,
                  }],
                })(
                  <Input placeholder={this.props.intl.formatMessage({ id: 'tcRedemptionInputEmail' })} />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('tcRedemptionInputRewardsCode', {
                  rules: [
                    { required: true, message: <FormattedMessage id="tcRedemptionInputRewardsCode" /> },
                  ],
                })(
                  <Input placeholder={this.props.intl.formatMessage({ id: 'tcRedemptionInputRewardsCode' })} />
                )}
              </Form.Item>
              <Row style={{ textAlign: "center" }}>
                <h4><FormattedMessage id="tcRedemptionTitle2" /></h4>
              </Row>
              <Form.Item style={{ marginBottom: 0, marginTop: '10%' }}>
                <Button type="primary" htmlType="submit" className="btn-block">
                  <FormattedMessage
                    id="tcRedemptionBtnRedeemPoints"
                  />
                </Button>

              </Form.Item>
            </Form>
          </Row>
        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

const Redemption = Form.create({ name: 'redemption' })(RedemptionPage);
export default injectIntl(Redemption)
