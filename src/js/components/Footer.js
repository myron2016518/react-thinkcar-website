import React from 'react'
import { Spin, Avatar } from 'antd';
import { FormattedMessage } from 'react-intl';
import Script from 'react-load-script';
import { PageHeader, Button, Descriptions, Row, Col, Tooltip } from 'antd';
import { browserRedirect, _requestWebUrlOrBtnClick } from '../../public/common'
import '../../css/style.scss'
import ficebook2 from '../../img/ficebook2.png'
import ut2 from '../../img/ut2.png'


export default class HeaderThinkCar extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isPcOrMobile: browserRedirect()
    }
    this.onClickTCbyFooterFe = this.onClickTCbyFooterFe.bind(this)
  }
  componentDidMount () {
    // setTimeout(function () {
    //   var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
    //   document.getElementById('cnzz_stat_icon_1277968549').innerHTML = unescape("%3Cspan id='cnzz_stat_icon_1277968549'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s9.cnzz.com/z_stat.php%3Fid%3D1277968549%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E")
    // }, 3000)
  }

  onClickTCbyFooterFe (_ty) {
    let _router = '/';
    switch (_ty) {
      case 'FAQ':
        _router = '/faq';
        break;
      case 'COVERAGE':  // 车型覆盖
        _router = '/coverage/default';
        break;
      case 'Viedo':   // 视频
        _router = '/video/all';
        break;
      case 'News':   // 新闻
        _router = '/news';
        break;
      case 'About': // 关于
        _router = '/about';
        break;
      case 'ThinkStore':  // 商城
        _router = '/thinkstore';
        break;
      case 'redemption':  // 兑奖码
        _router = '/redemption';
        break;
      default:
        _router = '/';
    }
    _requestWebUrlOrBtnClick({ "body": { "tab": _router, "button": _ty } });
    this.props.history.push(_router)
  }

  render () {
    let { isPcOrMobile } = this.state;
    var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
    var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
    let _isShowFooter = true;
    (this.props.history.location.pathname == "/community"
      || this.props.history.location.pathname.indexOf("/communityinfo") != -1
      || this.props.history.location.pathname.indexOf("/communitylikes") != -1
      || this.props.history.location.pathname.indexOf("/userinfo") != -1
      || this.props.history.location.pathname.indexOf("/userfollow") != -1
      || this.props.history.location.pathname.indexOf("/usertags") != -1
      || this.props.history.location.pathname.indexOf("/useredit") != -1
      || this.props.history.location.pathname.indexOf("/addfeed") != -1
      || this.props.history.location.pathname.indexOf("/communitytopic") != -1
    )
      && (_isShowFooter = false)
    let _main = <div></div>
    if (_isShowFooter) {
      _main = <div className="thinkCar-footer-main">
        <Row className="thinkCar-footer">
          <Col span={6} className="tc-mobile-footer-col">
            <ul className="thinkCar-footer-ul">
              <li className="tc-f-ul-title"><FormattedMessage id="footerCol1Tip1" /></li>
              <li className="tc-f-ul-line"></li>
              {/* <li onClick={() => { this.onClickTCbyFooterFe('About') }}><FormattedMessage id="footerCol1Tip2" /></li> */}
              <li style={{ cursor: 'pointer' }} onClick={() => { this.onClickTCbyFooterFe('Viedo') }}><FormattedMessage id="headerNavTip6_3" /></li>
              <li style={{ cursor: 'pointer' }} onClick={() => { this.onClickTCbyFooterFe('FAQ') }}><FormattedMessage id="footerCol1Tip4" /></li>
              <li style={{ cursor: 'pointer' }} onClick={() => { this.onClickTCbyFooterFe('COVERAGE') }}><FormattedMessage id="footerCol1Tip5" /></li>
            </ul>
          </Col>
          <Col span={12} className="tc-mobile-footer-col">
            <ul className="thinkCar-footer-ul">
              <li className="tc-f-ul-title"><FormattedMessage id="footerCol2Tip1" /></li>
              <li className="tc-f-ul-line"></li>
              <li><FormattedMessage id="tcAboutInfoTxt4" /><FormattedMessage id="tcAboutInfoTxt4_1" /></li>
              <li><FormattedMessage id="tcAboutInfoTxt6" /><FormattedMessage id="tcAboutInfoTxt6_1" /></li>
              <li><FormattedMessage id="tcAboutInfoTxt8" /><FormattedMessage id="tcAboutInfoTxt8_1" /></li>
            </ul>
          </Col>
          <Col span={6} className="tc-mobile-footer-col">
            <ul className="thinkCar-footer-ul">
              <li className="tc-f-ul-title"><FormattedMessage id="footerCol3Tip1" /></li>
              <li className="tc-f-ul-line"></li>
              <li>
                <a href="https://www.facebook.com/Thinkcar-Tech-113879770027054/?modal=admin_todo_tour" target="_blank">
                  <Avatar src={ficebook2} />
                </a>
                <a style={{ marginLeft: '20px' }} href="https://twitter.com/ObdThinkcar" target="_blank">
                  <Avatar src={ut2} />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="tc-footer-last">
          <Col span={12} className="tc-mobile-footer-col"><FormattedMessage id="footerLastTip1" /></Col>
          {/* {
          isPcOrMobile &&  */}
          <Col span={12} className="tc-mobile-footer-col">
            <a href="https://api.mythinkcar.com/home/index/public_policy" style={{ color: '#fff' }} ><FormattedMessage id="footerLastTip5" /></a>
            <a href="https://api.mythinkcar.com/h5/privacy.html" style={{ color: '#fff' }} > | <FormattedMessage id="footerLastTip6" /></a>
            <a href="https://www.mythinkcar.com/home/index/exchange_policy" style={{ color: '#fff' }} > | <FormattedMessage id="footerLastTip7" /> | </a>
            <Tooltip title={<FormattedMessage id="footerLastTip9" />}>
              <span><FormattedMessage id="footerLastTip8" /></span>
            </Tooltip>
            {/* <a href="https://sns.mythinkcar.com" style={{ color: '#fff' }} target="_blank"><FormattedMessage id="footerLastTip2" /></a>
          <span onClick={() => { this.onClickTCbyFooterFe('redemption') }} className="tc-footer-last-link"> | <FormattedMessage id="footerLastTip3" /> | </span>
          <span onClick={() => { this.onClickTCbyFooterFe('ThinkStore') }} className="tc-footer-last-link"><FormattedMessage id="footerLastTip4" /></span> */}
            <span id="cnzz_stat_icon_1277968549" style={{ paddingLeft: '2%' }}>
              <Script url={cnzz_protocol + "s9.cnzz.com/z_stat.php?id=1277968549&show=pic1"} />
            </span>

          </Col>
          {/* } */}

        </Row>
      </div >
    }
    return _main

  }
}

