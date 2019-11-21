import React from 'react'
import { FormattedMessage } from 'react-intl';
import { PageHeader, Button, Descriptions, Menu, Popover, Spin, Avatar, Card, Row, Affix, Col, Icon, Drawer } from 'antd';
import { getInitDataByLang, getProductByLang, set_session_cache, remove_session_cache } from '../../public/common'
import SelectLang from '../components/SelectLang'
// import InitData from '../components/InitData'
import '../../css/style.scss'

import ficebook2 from '../../img/ficebook.png'
import ut2 from '../../img/ut.png'
import md1Imge from '../../img/md1.png'
import point2Imge from '../../img/point2.png'
import myImge from '../../img/my.png'
import buycarImge from '../../img/buycar.png'
import mobileSnsImg from '../../img/sns.png'
import mobilelogoImg from '../../img/logo.png'


const { SubMenu } = Menu;
const { Meta } = Card;

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
    this.props.history.push('/redemption')
  }
  headerShowBuy () {
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
    this.setState({
      current: e.key,
    });
    switch (e.key) {
      case 'home':
        this.props.history.push('/')
        break;
      case 'tc_header_product_list_1':
        this.props.history.push('/ProductPage/1/t1')
        break;
      case 'tc_header_product_list_2':
        this.props.history.push('/ProductPage/2/t1')
        break;
      case 'tc_header_product_list_3':
        this.props.history.push('/ProductPage/3/t1')
        break;
      case 'tc_header_product_list_mobile_1':
        this.props.history.push('/ProductPage/1/t1')
        break;
      case 'tc_header_product_list_mobile_2':
        this.props.history.push('/ProductPage/2/t1')
        break;
      case 'tc_header_product_list_mobile_3':
        this.props.history.push('/ProductPage/3/t1')
        break;
      case 'Device':
        this.props.history.push('/')
        break;
      case 'ModulesFittings':
        this.props.history.push('/')
        break;
      case 'ThinkStore':
        this.props.history.push('/thinkstore')
        break;
      case 'ThinkMoments':  // 社区
        this.props.history.push('/moments')
        break;
      case 'Support':
        this.props.history.push('/')
        break;
      case 'FAQ':
        this.props.history.push('/faq')
        break;
      case 'COVERAGE':  // 车型覆盖
        this.props.history.push('/coverage')
        break;
      case 'VIDEO':  // 视频
        this.props.history.push('/video/all')
        break;
      case 'News':   // 新闻
        this.props.history.push('/news')
        break;
      case 'About': // 关于
        this.props.history.push('/about')
        break;

      default:
        this.props.history.push('/')
    }
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

  render () {
    let { lang, isLogin, loginListvisible, loginListvisibleMobile, headerNavIsMove, productList } = this.state;
    let { InitData } = this.props;
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
          <Icon type="bars" style={{ fontSize: '1rem' }} onClick={this.showmobileMeunDrawer} />
        </Col>
        <Col span={3} style={{ textAlign: 'left' }} >
          <a href="https://sns.mythinkcar.com" className="tc-mobile-header-sns"  >
            <Avatar shape="square" src={mobileSnsImg} />
          </a>
        </Col>
        <Col span={12} style={{ textAlign: 'center', paddingTop: '3%' }} >
          {/* <Avatar shape="square" src={mobilelogoImg} onClick={this.headerShowBuy} /> */}
          <img alt="THINKCAR" style={{ width: '55%' }} className="think-car-home-price-img" src={mobilelogoImg} />
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
                InitData._isPcOrMobile ?
                  <div className={(this.props.headerNavIsMove || this.props.history.location.pathname != '/') ? "thinkCar-header-logo-div thinkCar-header-logo-div-ismove" : "thinkCar-header-logo-div"}></div> :
                  <div className={"thinkCar-header-logo-div thinkCar-header-logo-div-ismove"}></div>
              }

            </Menu.Item>

            <SubMenu
              key="setting0"
              popupClassName="think-car-header-submenu-main tc-header-menu-li tc-header-menu-product-list"
              title={
                <span className="Professional">
                  <FormattedMessage id="headerNavTip1" />
                </span>
              }
            >
              <Menu.ItemGroup className="tc-header-menu-li">
                {
                  productList.length &&
                  productList.map((ob, idx) => {
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
                      default:
                        _is = InitData._homeImgPath + "/Home/img/product_2.png";
                    }
                    if (ob.id == '2') {
                      return false;
                    } else {
                      var _name = ob.id == '1' ? 'THINKCAR 1/1S' : ob.name;
                      return <Menu.Item key={"tc_header_product_list_mobile_" + ob.id} className="tc-header-menu-li tc-header-menu-li-product">
                        {/* <Row className="tc-txt" ><img alt="example" className="tc-header-product-list-img" src={_is} /></Row> */}
                        <Row className="tc-txt" style={{ fontWeight: '500' }} >{_name}</Row>

                      </Menu.Item>
                    }

                  })
                }
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="ThinkStore" className="tc-header-menu-li">
              <FormattedMessage id="headerNavTip4" />
            </Menu.Item>
            <Menu.Item key="ThinkMoments" className="tc-header-menu-li">
              <FormattedMessage id="headerNavTip5" />
            </Menu.Item>

            <SubMenu
              key="Support"
              popupClassName="tc-header-menu-li tc-header-menu-support-list"
              title={
                <span className="Professional">
                  <FormattedMessage id="headerNavTip6" />
                </span>
              }
            >
              <Menu.ItemGroup className="tc-header-menu-li">
                <Menu.Item key="FAQ" className="tc-header-menu-li">
                  <FormattedMessage id="headerNavTip6_1" />
                </Menu.Item>
                <Menu.Item key="COVERAGE" className="tc-header-menu-li">
                  <FormattedMessage id="headerNavTip6_2" />
                </Menu.Item>
                <Menu.Item key="VIDEO" className="tc-header-menu-li">
                  <FormattedMessage id="headerNavTip6_3" />
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="News" className="tc-header-menu-li">
              <FormattedMessage id="headerNavTip7" />
            </Menu.Item>
            <Menu.Item key="About" className="tc-header-menu-li">
              <FormattedMessage id="headerNavTip8" />
            </Menu.Item>

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
          </a>,
          <a key="settingPageHeadertitleTwo" style={{ marginLeft: '20px' }} href="https://twitter.com/ObdThinkcar" target="_blank">
            <Avatar src={ut2} />
          </a>
        ]}
        subTitle={<FormattedMessage id="headerTip1" />}
        extra={[
          <a className="tc-header-remotediagnosis" style={{ width: '185px' }} key="starter1" href="https://sns.mythinkcar.com" target="_blank" >
            {/* <FormattedMessage id="headerTip2" /> */}
            <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + '/Home/img/remote.png'} />
          </a>,
          <Avatar key="starter2" shape="square" src={md1Imge} />,
          <Avatar key="starter3" shape="square" src={point2Imge} onClick={this.headerGoRedemption} />,
          <Avatar key="starter4" shape="square" src={buycarImge} onClick={this.headerShowBuy} />,
          // <SelectLang lang={lang} handleLangChange={lang => this.handleLangChange(lang)} />,
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
          <FormattedMessage id="headerNavTip1" />
        </Menu.Item> */}
          <SubMenu
            key="setting0"
            popupClassName="think-car-header-submenu-main tc-header-menu-li tc-header-menu-product-list"
            title={
              <span className="Professional">
                <FormattedMessage id="headerNavTip1" />
              </span>
            }
          >
            <Menu.ItemGroup className="tc-header-menu-li">
              {
                productList.length &&
                productList.map((ob, idx) => {
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
                    default:
                      _is = InitData._homeImgPath + "/Home/img/product_2.png";
                  }
                  if (ob.id == '2') {
                    return false;
                  } else {
                    var _name = ob.id == '1' ? 'THINKCAR 1/1S' : ob.name;
                    return <Menu.Item key={"tc_header_product_list_" + ob.id} className="tc-header-menu-li tc-header-menu-li-product">
                      <Row className="tc-txt" ><img alt="example" className="tc-header-product-list-img" src={_is} /></Row>
                      <Row className="tc-txt" style={{ marginTop: '5%', fontWeight: '500' }} >{_name}</Row>

                    </Menu.Item>
                  }

                  // return <Menu.Item key={"tc_header_product_list_" + ob.id} className="tc-header-menu-li tc-header-menu-li-product">
                  //   <Row className="tc-txt" ><img alt="example" className="tc-header-product-list-img" src={_is} /></Row>
                  //   <Row className="tc-txt" style={{ marginTop: '5%', fontWeight: '500' }} >{ob.name}</Row>
                  //   {/* <Row className="tc-txt" >{ob.introduction}</Row> */}
                  //   {/* <Card
                  //     hoverable
                  //     bordered={false}
                  //     style={{ width: '33%' }}
                  //     cover={}
                  //   >
                  //     <Meta title="Europe Street beat" description="www.instagram.com" />
                  //   </Card> */}
                  // </Menu.Item>
                })
              }
            </Menu.ItemGroup>
          </SubMenu>
          {/* <Menu.Item key="Device">
          <FormattedMessage id="headerNavTip2" />
        </Menu.Item>
        <Menu.Item key="ModulesFittings">
          <FormattedMessage id="headerNavTip3" />
        </Menu.Item> */}
          <Menu.Item key="ThinkStore" className="tc-header-menu-li">
            <FormattedMessage id="headerNavTip4" />
          </Menu.Item>
          <Menu.Item key="ThinkMoments" className="tc-header-menu-li">
            <FormattedMessage id="headerNavTip5" />
          </Menu.Item>

          <SubMenu
            key="Support"
            popupClassName="tc-header-menu-li tc-header-menu-support-list"
            title={
              <span className="Professional">
                <FormattedMessage id="headerNavTip6" />
              </span>
            }
          >
            <Menu.ItemGroup className="tc-header-menu-li">
              <Menu.Item key="FAQ" className="tc-header-menu-li">
                <FormattedMessage id="headerNavTip6_1" />
              </Menu.Item>
              <Menu.Item key="COVERAGE" className="tc-header-menu-li">
                <FormattedMessage id="headerNavTip6_2" />
              </Menu.Item>
              <Menu.Item key="VIDEO" className="tc-header-menu-li">
                <FormattedMessage id="headerNavTip6_3" />
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <Menu.Item key="News" className="tc-header-menu-li">
            <FormattedMessage id="headerNavTip7" />
          </Menu.Item>
          <Menu.Item key="About" className="tc-header-menu-li">
            <FormattedMessage id="headerNavTip8" />
          </Menu.Item>
        </Menu>
      }
    </div >

  }
}

