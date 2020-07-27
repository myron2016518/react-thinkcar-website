import React from 'react'
import { FormattedMessage } from 'react-intl';
// import Loadable from '../components/loadable'
import { PageHeader, Button, Menu, Popover, Avatar, Row, Col, Icon, Drawer } from 'antd';
import { _requestWebUrlOrBtnClick, getInitDataByLang, browserRedirect, getProductByLang, set_session_cache, remove_session_cache } from '../../public/common'
// import SelectLang from '../components/SelectLang'
// const SelectLang = Loadable(() => import('../components/SelectLang'));
// import InitData from '../components/InitData'

import ficebook2 from '../../img/ficebook.png'
import ut2 from '../../img/ut.png'
import md1Imge from '../../img/md1.png'
import point2Imge from '../../img/point2.png'
import _myImage from '../../img/my.png'
import buycarImge from '../../img/buycar.png'
import mobileSnsImg from '../../img/sns.png'
import mobilelogoImg from '../../img/logo.png'


const { SubMenu } = Menu;
// const { Meta } = Card;

export default class HeaderThinkCar extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      lang: this.props.lang || 'en',
      current: 'home',
      isLogin: false,
      loginListvisible: false,
      loginListvisibleMobile: false,
      productList: [],
      mobileMeunVisible: false,
    }

    this.handleLangChange = this.handleLangChange.bind(this)//切换语言
    this.headerGoRemote = this.headerGoRemote.bind(this)//退出
    this.initFun = this.initFun.bind(this)
    this.headerShowBuy = this.headerShowBuy.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.headerLogin = this.headerLogin.bind(this)
    this.headerShowLoginList = this.headerShowLoginList.bind(this)
    this.headerShowLoginListMobile = this.headerShowLoginListMobile.bind(this)
    this.headerGoRedemption = this.headerGoRedemption.bind(this)
    this.showmobileMeunDrawer = this.showmobileMeunDrawer.bind(this)
    this.onClosemobileMeunDrawer = this.onClosemobileMeunDrawer.bind(this)
    this.goToHomePage = this.goToHomePage.bind(this)
  }
  componentDidMount () {
    this.initFun(this.props);
  }
  componentWillReceiveProps (newProps) {
    this.initFun(newProps);
  }
  initFun (_pr) {
    var _d = getProductByLang(_pr.lang, _pr.InitData) || [];
    var _chan = { productList: _d };
    _chan.isLogin = _pr.InitData.isLogin;
    this.setState(_chan);
  }
  handleLangChange (val) {
    this.setState({
      lang: val
    }, () => {
      sessionStorage.lang = val
      this.props.handleLangChange(val)
    })

  }
  headerGoRemote () {
    this.props.history.push('/')
  }
  headerGoRedemption () {
    // _requestWebUrlOrBtnClick({ "body": { "tab": '/redemption', "button": 'redemption' } });
    this.props.history.push('/redemption')

  }
  headerShowBuy () {
    // _requestWebUrlOrBtnClick({ "body": { "tab": 'showbuycar', "button": 'showbuycar' } });
    this.props.headerShowBuy()
  }

  headerLogin (_type) {
    switch (_type) {
      case 'out':
        remove_session_cache('tc_temporary_user_info');
        remove_session_cache('tc_temporary_buy_car_data');
        remove_session_cache('tc_access_token_token');
        this.setState({
          isLogin: false,
        }, () => { this.props.history.push('/'); this.props.clearBuyCartList(); this.props.tcUserSignOut(); });
        break;
      case 'in':
        // set_session_cache('tc_temporary_user_info', { id: '007', name: 'liuyu2', token: '001' });
        // this.setState({
        //   isLogin: true,
        // }, () => { this.props.history.push('/login') });
        this.props.history.push('/login')
        break;
      case 'myorder':
        this.props.history.push(`/${this.state.isLogin ? 'orderlist' : 'login'}`);
        break;
      default:

    }
    this.setState({
      loginListvisible: false,
      loginListvisibleMobile: false,
      // isLogin: !this.state.isLogin,
    });

  }
  headerShowLoginList () {
    this.setState({
      loginListvisible: !this.state.loginListvisible,
    });
  }
  headerShowLoginListMobile () {
    this.setState({
      loginListvisibleMobile: !this.state.loginListvisibleMobile,
    });
  }
  handleClick (e) {
    let { InitData } = this.props;
    if (e.key == 'ANDROID') {
      // window.open('http://wzapi.golo5.com/vAdmin/index.php?mod=down&code=latest_app&pid=19')
      window.location.href = 'https://www.mythinkcar.com/dowm/thinkcar.html';
      return;
    } else if (e.key == 'ANDROIDdiag') {
      window.location.href = 'https://www.mythinkcar.com/dowm/thinkdiag.html';
      return;
    } else if (e.key == 'THINKSCANDownload' || e.key == 'THINKOBDDownload') {
      window.location.href = 'https://dlcenter.x431.com/public/downloadLatestPublicSoft.action?softName=Product_Updata_Tool&softType=5&isEncryptFlag=1&checkState=2&lanId=1001&pdtTypeId=603';
      return;
    } else if (e.key == 'THINKSCANQuickStartGuide') {
      window.open(InitData._homeImgPath + '/dowm/THINKSCANQuickStartGuide.pdf');
      return;
    }


    this.setState({
      current: e.key,
    });
    let _router = '/';
    switch (e.key) {
      case 'home':
        _router = '/';
        break;
      case 'Device':
        _router = '/';
        break;
      case 'ModulesFittings':
        _router = '/';
        break;
      case 'ThinkStore':
        _router = '/thinkstore';
        break;
      case 'ThinkMoments':  // 社区
        _router = '/moments';
        // _router = '/community';
        break;
      case 'Support':
        _router = '/';
        break;
      case 'FAQ':
        _router = '/faq';
        break;
      case 'COVERAGE':  // 车型覆盖
        _router = '/coverage/checklist';
        break;
      case 'VIDEO':  // 视频
        _router = '/video/all';
        break;
      case 'docdown':  // 文档下载
        _router = '/docdown';
        break;
      case 'News':   // 新闻
        _router = '/news';
        break;
      case 'About': // 关于
        _router = '/about';
        break;
      case 'Coupons': // 积分
        _router = '/pointdetail';
        break;

      default:
        _router = '/';
    }

    if (e.key.indexOf('tc_header_product_list_') != -1) {
      let _prodid = e.key.split('_');
      _prodid = _prodid[_prodid.length - 1]
      _router = '/product/' + _prodid + '/t1';
    }
    _requestWebUrlOrBtnClick({ "body": { "tab": _router, "button": e.key } });
    this.props.history.push(_router)
    this.onClosemobileMeunDrawer();
  };

  showmobileMeunDrawer () {
    this.setState({
      mobileMeunVisible: true,
    });
  };
  onClosemobileMeunDrawer () {
    this.setState({
      mobileMeunVisible: false,
    });
  };

  goToHomePage () {
    this.props.history.push('/')
  }

  render () {
    let { lang, isLogin, loginListvisible, loginListvisibleMobile, headerNavIsMove, productList } = this.state;
    let { InitData } = this.props;
    let myImge = _myImage;
    // 显示头像
    // if (isLogin && InitData.userInfo.avatar) {
    //   if (InitData.userInfo.avatar.url) {
    //     myImge = InitData.userInfo.avatar.url;
    //   }
    // }
    let _isMob = browserRedirect();
    let _pc_userInfoList = isLogin ?
      [
        <p key="tc_pc_signup"><a onClick={() => this.headerLogin('out')}><FormattedMessage id="tcSignOut" /></a></p>,
        <p key="tc_pc_myorder"><a onClick={() => this.headerLogin('myorder')}><FormattedMessage id="tcMyOrders" /></a></p>
      ]
      :
      [
        <p key="tc_pc_signin"><a onClick={() => this.headerLogin('in')}><FormattedMessage id="tcSignIn" /></a></p>,
        <p key="tc_pc_myorder"><a onClick={() => this.headerLogin('myorder')}><FormattedMessage id="tcMyOrders" /></a></p>
      ];
    let _mobile_userInfoList = isLogin ?
      [
        <p key="tc_mobile_signup"><a onClick={() => this.headerLogin('out')}><FormattedMessage id="tcSignOut" /></a></p>,
        <p key="tc_mobile_myorder"><a onClick={() => this.headerLogin('myorder')}><FormattedMessage id="tcMyOrders" /></a></p>
      ]
      :
      [
        <p key="tc_mobile_signin"><a onClick={() => this.headerLogin('in')}><FormattedMessage id="tcSignIn" /></a></p>,
        <p key="tc_mobile_myorder"><a onClick={() => this.headerLogin('myorder')}><FormattedMessage id="tcMyOrders" /></a></p>
      ];
    return <div>
      <Row className="tc-mobile-header-main tc-mobile-hide">
        {/* <Col span={2}>
          <a href="https://www.facebook.com/Thinkcar-Tech-113879770027054/?modal=admin_todo_tour" target="_blank">
            <Avatar src={ficebook2} />
          </a>
        </Col>
        <Col span={12}>
          <a href="https://twitter.com/ObdThinkcar" target="_blank">
            <Avatar src={ut2} />
          </a>
        </Col> */}
        <Col span={3} style={{ textAlign: 'center', paddingTop: '1%' }} >
          <Icon type="bars" style={{ fontSize: '1.2rem' }} onClick={this.showmobileMeunDrawer} />
        </Col>
        <Col span={3} style={{ textAlign: 'left' }} >
          <a
            href="https://sns.mythinkcar.com"
            className="tc-mobile-header-sns"
            onClick={() => { _requestWebUrlOrBtnClick({ "body": { "tab": "remotediagnosis", "button": "remotediagnosis" } }); }}
          >
            <Avatar shape="square" src={mobileSnsImg} />
          </a>
        </Col>
        <Col span={12} style={{ textAlign: 'center', paddingTop: '3%' }} >
          {/* <Avatar shape="square" src={mobilelogoImg} onClick={this.headerShowBuy} /> */}
          <img
            alt="THINKCAR"
            style={{ width: '55%' }}
            className="think-car-home-price-img"
            src={mobilelogoImg}
            onClick={this.goToHomePage}
          />
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Avatar shape="square" src={buycarImge} className="tc-mobile-header-buy-car" onClick={this.headerShowBuy} />

          <Popover
            key="tc-header-mobile-userinfo"
            overlayClassName="tc-header-mobile-userinfo-popover"
            placement="bottomRight"
            overlayStyle={{ position: 'fixed' }}
            content={_mobile_userInfoList}
            trigger="click"
            visible={loginListvisibleMobile}
            onVisibleChange={this.headerShowLoginListMobile}
          >
            <Avatar key="starter6_mobile" className="tc-mobile-header-buy-car" shape="square" src={myImge} />
          </Popover>
        </Col>

        {/* <Col span={2} style={{ textAlign: 'center' }} > */}
        {/* <Icon type="shopping-cart" onClick={this.headerShowBuy} /> */}
        {/* </Col>
        <Col span={3} style={{ backgroundColor: '#B90000', textAlign: 'center' }} >
          
        </Col> */}
        {/* <Col span={2} style={{ textAlign: 'center' }} >
          <Avatar style={{ width: '80%', height: '80%' }} shape="square" src={point2Imge} onClick={this.headerGoRedemption} />
        </Col> */}


        <Drawer
          title=""
          placement='left'
          closable={false}
          onClose={this.onClosemobileMeunDrawer}
          visible={this.state.mobileMeunVisible}
        >
          <Menu
            onClick={this.handleClick}
            mode="inline"
            className="thinkcar-menu think-car-padding10"
          >
            <Menu.Item key="home" className="thinkCar-header-logo">
              {
                _isMob ?
                  <div className={(this.props.headerNavIsMove || this.props.history.location.pathname != '/') ? "thinkCar-header-logo-div thinkCar-header-logo-div-ismove" : "thinkCar-header-logo-div"}></div> :
                  <div className={"thinkCar-header-logo-div thinkCar-header-logo-div-ismove"}></div>
              }

            </Menu.Item>

            <SubMenu
              key="setting0"
              popupClassName="think-car-header-submenu-main tc-header-menu-li tc-header-menu-product-list"
              title={
                <span className="Professional">
                  <FormattedMessage id="tc3_3" />
                </span>
              }
            >
              <Menu.ItemGroup className="tc-header-menu-li">
                {
                  productList.length &&
                  productList.map((ob, idx) => {
                    if (ob.id == '7') return;
                    if (ob.status == '1' || ob.id == '8' || ob.id == '11') {
                      var _name = ob.id == '1' ? 'THINKCAR 1S' : ob.name;
                      return <Menu.Item key={"tc_header_product_list_mobile_" + ob.id} className="tc-header-menu-li tc-header-menu-li-product">
                        <Row className="tc-txt" style={{ fontWeight: '500' }} >{_name}</Row>

                      </Menu.Item>
                    } else {
                      return false;
                    }

                  })
                }
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="ThinkStore" className="tc-header-menu-li">
              <FormattedMessage id="tc3_6" />
            </Menu.Item>
            {/* <Menu.Item key="ThinkMoments" className="tc-header-menu-li">
              <FormattedMessage id="tc3_7" />
            </Menu.Item> */}

            <SubMenu
              key="ThinkMoment"
              popupClassName="tc-header-menu-li tc-header-menu-support-list"
              title={
                <span className="Professional">
                  <FormattedMessage id="tc3_7" />
                </span>
              }
            >
              <Menu.ItemGroup className="tc-header-menu-li">
                <Menu.Item key="ThinkMoments" className="tc-header-menu-li">
                  <FormattedMessage id="tc3_28" />
                </Menu.Item>
                <Menu.Item key="Coupons" className="tc-header-menu-li">
                  <FormattedMessage id="tc3_27" />
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <SubMenu
              key="Support"
              popupClassName="tc-header-menu-li tc-header-menu-support-list"
              title={
                <span className="Professional">
                  <FormattedMessage id="tc3_8" />
                </span>
              }
            >
              <Menu.ItemGroup className="tc-header-menu-li">
                <Menu.Item key="FAQ" className="tc-header-menu-li">
                  <FormattedMessage id="tc3_8_1" />
                </Menu.Item>
                <Menu.Item key="COVERAGE" className="tc-header-menu-li">
                  <FormattedMessage id="tc3_8_2" />
                </Menu.Item>
                <Menu.Item key="VIDEO" className="tc-header-menu-li">
                  <FormattedMessage id="tc3_8_3" />
                </Menu.Item>
                <Menu.Item key="docdown" className="tc-header-menu-li">
                  <FormattedMessage id="tc3_8_4" />
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="News" className="tc-header-menu-li">
              <FormattedMessage id="tc3_9" />
            </Menu.Item>
            <Menu.Item key="About" className="tc-header-menu-li">
              <FormattedMessage id="tc3_10" />
            </Menu.Item>

            <SubMenu
              key="DOWNLOAD"
              popupClassName="tc-header-menu-li tc-header-menu-support-list"
              title={
                <span className="Professional">
                  <FormattedMessage id="tc3_11" />
                </span>
              }
            >
              <Menu.ItemGroup className="tc-header-menu-li">
                <Menu.Item key="ANDROID" className="tc-header-menu-li">
                  <FormattedMessage id="tc3_11_1" />
                </Menu.Item>

                <SubMenu
                  key="THINKSCAN"
                  popupClassName="tc-header-menu-li tc-header-menu-support-list"
                  title={<span className="Professional">THINKSCAN</span>}
                >
                  <Menu.ItemGroup className="tc-header-menu-li">
                    <Menu.Item key="THINKSCANDownload" className="tc-header-menu-li">THINKSCAN Update Tool</Menu.Item>
                    <Menu.Item className="tc-header-menu-li">
                      <a href={InitData._homeImgPath + '/apk/THINKSCANQuickStartGuide.pdf'}
                        download='THINKSCANQuickStartGuide.pdf'
                        target="_blank" >THINKSCAN</a>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                  key="THINKOBD"
                  popupClassName="tc-header-menu-li tc-header-menu-support-list"
                  title={<span className="Professional">THINKOBD</span>}
                >
                  <Menu.ItemGroup className="tc-header-menu-li">
                    <Menu.Item key="THINKOBDDownload" className="tc-header-menu-li">THINKOBD Update Tool</Menu.Item>
                    <Menu.Item className="tc-header-menu-li">
                      <a href={InitData._homeImgPath + '/apk/THINKOBD100QuickStartGuide.pdf'}
                        download='THINKOBD100QuickStartGuide.pdf'
                        target="_blank" >THINKOBD100</a>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>

                {/* <Menu.Item key="THINKSCANDownload" className="tc-header-menu-li">THINKSCAN Update Tool</Menu.Item>
                <Menu.Item key="THINKOBDDownload" className="tc-header-menu-li">THINKOBD Update Tool</Menu.Item> */}
                {/* <Menu.Item key="ANDROIDdiag" className="tc-header-menu-li">ThinkDiag Android </Menu.Item> */}
              </Menu.ItemGroup>
            </SubMenu>


          </Menu>
        </Drawer>

      </Row>
      <PageHeader
        key="settingPageHeader"
        className="think-car-padd-top5 think-car-padding10 tc-header-main tc-pc-hide"
        ghost={false}
        title={[
          <a key="settingPageHeadertitleOne" href="https://www.facebook.com/Thinkcar-Tech-113879770027054/?modal=admin_todo_tour" target="_blank">
            <Avatar src={ficebook2} />
            {/* <span style={{ float: 'left', transform: "scale(0.5)", width: '32px', height: '32px' }}>
              <Icon className="icon-ficebook" />
            </span> */}
          </a>,
          <a key="settingPageHeadertitleTwo" style={{ marginLeft: '20px' }} href="https://twitter.com/ObdThinkcar" target="_blank">
            <Avatar src={ut2} />
          </a>
        ]}
        subTitle={<FormattedMessage id="tc3_1" />}
        extra={[
          <a
            className="tc-header-remotediagnosis"
            style={{ width: '185px' }} key="starter1"
            onClick={() => { _requestWebUrlOrBtnClick({ "body": { "tab": "remotediagnosis", "button": "remotediagnosis" } }); }}
            href="https://sns.mythinkcar.com"
            target="_blank"
          >
            {/* <FormattedMessage id="tc3_2" /> */}
            <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + '/Home/img/remote.png'} />
          </a>,
          // <SelectLang key="starter2" lang={lang} handleLangChange={lang => this.handleLangChange(lang)} />,
          <Avatar key="starter2" shape="square" src={md1Imge} />,
          <Avatar key="starter3" shape="square" src={point2Imge} onClick={this.headerGoRedemption} />,
          <Avatar key="starter4" shape="square" src={buycarImge} onClick={this.headerShowBuy} />,
          <Popover
            key="tc-header-pc-userinfo"
            overlayClassName="tc-header-pc-userinfo-popover"
            // autoAdjustOverflow="false"
            placement="bottom"
            overlayStyle={{ position: 'fixed' }}
            content={_pc_userInfoList}
            trigger="click"
            visible={loginListvisible}
            onVisibleChange={this.headerShowLoginList}
          >
            <Avatar key="starter6" shape="square" src={myImge} />
          </Popover>
          ,
          <span key="tc-header-userinfo-name" style={{ color: '#fff', marginLeft: '0', verticalAlign: 'middle' }}>{isLogin && InitData.userInfo.name}</span>

        ]}
      ></PageHeader>
      {
        // (
        //   this.props.history.location.pathname != '/login' &&
        //   this.props.history.location.pathname != '/forgotpassword' &&
        //   this.props.history.location.pathname != '/tcregister'
        // ) &&
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          className={(this.props.headerNavIsMove || this.props.history.location.pathname != '/') ? "thinkcar-menu-ismove thinkcar-menu think-car-padding10 tc-pc-hide" : "thinkcar-menu think-car-padding10 tc-pc-hide"}
        >
          <Menu.Item key="home" className="thinkCar-header-logo">
            <div className={(this.props.headerNavIsMove || this.props.history.location.pathname != '/') ? "thinkCar-header-logo-div thinkCar-header-logo-div-ismove" : "thinkCar-header-logo-div"}></div>
          </Menu.Item>
          {/* <Menu.Item key="starter">
          <FormattedMessage id="tc3_3" />
        </Menu.Item> */}
          <SubMenu
            key="setting0"
            popupClassName="think-car-header-submenu-main tc-header-menu-li tc-header-menu-product-list"
            title={
              <span className="Professional">
                <FormattedMessage id="tc3_3" />
              </span>
            }
          >
            <Menu.ItemGroup className="tc-header-menu-li">
              {
                productList.length &&
                productList.map((ob, idx) => {
                  if (ob.id == '7') return;
                  let _is, _menuItem;
                  switch (ob.id) {
                    case '1':
                      _is = InitData._homeImgPath + "/Home/img/product_2.png";
                      break;
                    case '2':
                      _is = InitData._homeImgPath + "/Home/img/product_3.png";
                      break;
                    case '3':
                      _is = InitData._homeImgPath + "/Home/img/product_1.png";
                      break;
                    case '4':
                      _is = InitData._homeImgPath + "/Home/img/product_4.png";
                      break;
                    case '5':
                      _is = InitData._homeImgPath + "/Home/img/product_5.png";
                      break;
                    case '6':
                      _is = InitData._homeImgPath + "/Home/img/product_6.png";
                      break;
                    case '8':
                      _is = InitData._homeImgPath + "/Home/img/product_8.png";
                      break;
                    case '10':
                      _is = InitData._homeImgPath + "/Home/img/product_10.png";
                      break;
                    case '11':
                      _is = InitData._homeImgPath + "/Home/img/product_11.png";
                      break;
                    default:
                      _is = InitData._homeImgPath + "/Home/img/product_2.png";
                  }
                  if (ob.status == '1' || ob.id == '8' || ob.id == '11') {
                    var _name = ob.id == '1' ? 'THINKCAR 1S' : ob.name;
                    return <Menu.Item key={"tc_header_product_list_" + ob.id} className="tc-header-menu-li tc-header-menu-li-product">
                      <Row className="tc-txt" ><img alt="example" className="tc-header-product-list-img" src={_is} /></Row>
                      <Row className="tc-txt" style={{ marginTop: '5%', fontWeight: '500' }} >{_name}</Row>

                    </Menu.Item>
                  } else {
                    return false;
                  }
                })
              }
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="ThinkStore" className="tc-header-menu-li">
            <FormattedMessage id="tc3_6" />
          </Menu.Item>
          {/* <Menu.Item key="ThinkMoments" className="tc-header-menu-li">
            <FormattedMessage id="tc3_7" />
          </Menu.Item> */}
          <SubMenu
            key="ThinkMoment"
            popupClassName="tc-header-menu-li tc-header-menu-support-list"
            title={
              <span className="Professional">
                <FormattedMessage id="tc3_7" />
              </span>
            }
          >
            <Menu.ItemGroup className="tc-header-menu-li">
              <Menu.Item key="ThinkMoments" className="tc-header-menu-li">
                <FormattedMessage id="tc3_28" />
              </Menu.Item>
              <Menu.Item key="Coupons" className="tc-header-menu-li">
                <FormattedMessage id="tc3_27" />
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <SubMenu
            key="Support"
            popupClassName="tc-header-menu-li tc-header-menu-support-list"
            title={
              <span className="Professional">
                <FormattedMessage id="tc3_8" />
              </span>
            }
          >
            <Menu.ItemGroup className="tc-header-menu-li">
              <Menu.Item key="FAQ" className="tc-header-menu-li">
                <FormattedMessage id="tc3_8_1" />
              </Menu.Item>
              <Menu.Item key="COVERAGE" className="tc-header-menu-li">
                <FormattedMessage id="tc3_8_2" />
              </Menu.Item>
              <Menu.Item key="VIDEO" className="tc-header-menu-li">
                <FormattedMessage id="tc3_8_3" />
              </Menu.Item>
              <Menu.Item key="docdown" className="tc-header-menu-li">
                <FormattedMessage id="tc3_8_4" />
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <Menu.Item key="News" className="tc-header-menu-li">
            <FormattedMessage id="tc3_9" />
          </Menu.Item>
          <Menu.Item key="About" className="tc-header-menu-li">
            <FormattedMessage id="tc3_10" />
          </Menu.Item>

          <SubMenu
            key="DOWNLOAD"
            popupClassName="tc-header-menu-li tc-header-menu-support-list"
            title={
              <span className="Professional">
                <FormattedMessage id="tc3_11" />
              </span>
            }
          >
            <Menu.ItemGroup className="tc-header-menu-li">
              <Menu.Item key="ANDROID" className="tc-header-menu-li">
                <FormattedMessage id="tc3_11_1" />
              </Menu.Item>
              <SubMenu
                key="THINKSCAN"
                popupClassName="tc-header-menu-li tc-header-menu-support-list"
                title={<span className="Professional">THINKSCAN</span>}
              >
                <Menu.ItemGroup className="tc-header-menu-li">
                  <Menu.Item key="THINKSCANDownload" className="tc-header-menu-li">THINKSCAN Update Tool</Menu.Item>
                  <Menu.Item className="tc-header-menu-li">
                    <a href={InitData._homeImgPath + '/apk/THINKSCANQuickStartGuide.pdf'}
                      download='THINKSCANQuickStartGuide.pdf'
                      target="_blank" >THINKSCAN Quick Start Guide</a>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <SubMenu
                key="THINKOBD"
                popupClassName="tc-header-menu-li tc-header-menu-support-list"
                title={<span className="Professional">THINKOBD</span>}
              >
                <Menu.ItemGroup className="tc-header-menu-li">
                  <Menu.Item key="THINKOBDDownload" className="tc-header-menu-li">THINKOBD Update Tool</Menu.Item>
                  <Menu.Item className="tc-header-menu-li">
                    <a href={InitData._homeImgPath + '/apk/THINKOBD100QuickStartGuide.pdf'}
                      download='THINKOBD100QuickStartGuide.pdf'
                      target="_blank" >THINKOBD100 Quick Start Guide</a>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              {/* <Menu.Item key="THINKSCANDownload" className="tc-header-menu-li">THINKSCAN Update Tool</Menu.Item>
              <Menu.Item key="THINKOBDDownload" className="tc-header-menu-li">THINKOBD Update Tool</Menu.Item> */}
              {/* <Menu.Item key="ANDROIDdiag" className="tc-header-menu-li">ThinkDiag Android </Menu.Item> */}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      }
    </div >

  }
}

