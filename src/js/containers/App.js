import React from 'react'
import ReactDOM from 'react-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import PropTypes from 'prop-types'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
// import { connect } from "react-redux";
// import { addTodo } from "../redux/actions";
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
// import createBrowserHistory from 'history/createBrowserHistory';
import history from "../../public/history";
import Loadable from '../components/loadable'
import { ConfigProvider, Layout, message, Select, Affix, BackTop, Drawer } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/lib/locale-provider/en_Us';
//如果浏览器没有自带intl，则需要在使用npm安装intl之后添加如下代码
import { IntlProvider, addLocaleData, FormattedDate, FormattedMessage } from 'react-intl';
import request, { isWeiXin, getSign, browserRedirect, deepObjectMerge, getProductByLang, get_session_cache, set_session_cache, remove_session_cache } from '../../public/common'
import intl from 'intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en'
//引入locale配置文件，具体路径根据实际情况填写
import zh_CN from '../../lang/zh_CN';
import en_US from '../../lang/en_US';

import '../../css/style.scss'
import config from '../../public/config'
import InitData from '../components/InitData'

const NoMatch = Loadable(() => import('./NoMatch'));
const Login = Loadable(() => import('./Login'));
const ForgotPassword = Loadable(() => import('./ForgotPassword'));
const TcRegister = Loadable(() => import('./TcRegister'));
const OrderPage = Loadable(() => import('./OrderPage'));
const OrderListPage = Loadable(() => import('./OrderListPage'));
const OrederListDetailPage = Loadable(() => import('./OrederListDetailPage'));
const ProductPage = Loadable(() => import('./ProductPage'));
const ProductBuyPage = Loadable(() => import('./ProductBuyPage'));
const HistoryTask = Loadable(() => import('./HistoryTask'));
const AboutPage = Loadable(() => import('./AboutPage'));
const NewsPage = Loadable(() => import('./NewsPage'));
const NewsDetailPage = Loadable(() => import('./NewsDetailPage'));
const PMessagePage = Loadable(() => import('./PMessagePage'));
const FAQPage = Loadable(() => import('./FAQPage'));
const VideoPage = Loadable(() => import('./VideoPage'));
const RedemptionPage = Loadable(() => import('./RedemptionPage'));
const MomentsPage = Loadable(() => import('./MomentsPage'));
const CoveragePage = Loadable(() => import('./CoveragePage'));
const ThinkStorePage = Loadable(() => import('./ThinkStorePage'));
const PointDetail = Loadable(() => import('./PointDetail'));
const SomethingPicturePage = Loadable(() => import('./SomethingPicturePage'));
const TcCommunityHomePage = Loadable(() => import('./community/TcCommunityHomePage'));
const TcCommunityInfoDetailPage = Loadable(() => import('./community/TcCommunityInfoDetailPage'));
const TcCommunityLikesPage = Loadable(() => import('./community/TcCommunityLikesPage'));
const TcCommunityAddFeeds = Loadable(() => import('./community/TcCommunityAddFeeds'));
const TcCommunityTopicPage = Loadable(() => import('./community/TcCommunityTopicPage'));
const TcUserInfo = Loadable(() => import('./userinfo/TcUserInfo'));
const TcUserFollowPage = Loadable(() => import('./userinfo/TcUserFollowPage'));
const TcUserTagsPage = Loadable(() => import('./userinfo/TcUserTagsPage'));
const TcUserInfoEdit = Loadable(() => import('./userinfo/TcUserInfoEdit'));
// const SelectLang = Loadable(() => import('./components/SelectLang'));
const Home = Loadable(() => import('./Home'));



// import NoMatch from './NoMatch'
// import Login from './Login'
// import ForgotPassword from './ForgotPassword'
// import TcRegister from './TcRegister'
// import OrderPage from './OrderPage'
// import OrderListPage from './OrderListPage'
// import OrederListDetailPage from './OrederListDetailPage'
// import ProductPage from './ProductPage'
// import ProductBuyPage from './ProductBuyPage'
// import HistoryTask from './HistoryTask'
// import AboutPage from './AboutPage'
// import NewsPage from './NewsPage'
// import NewsDetailPage from './NewsDetailPage'
// import PMessagePage from './PMessagePage'
// import FAQPage from './FAQPage'
// import VideoPage from './VideoPage'
// import RedemptionPage from './RedemptionPage'
// import MomentsPage from './MomentsPage'
// import CoveragePage from './CoveragePage'
// import ThinkStorePage from './ThinkStorePage'
// import PointDetail from './PointDetail'
// import SomethingPicturePage from './SomethingPicturePage'
// import TcCommunityHomePage from './community/TcCommunityHomePage'
// import TcCommunityInfoDetailPage from './community/TcCommunityInfoDetailPage'
// import TcCommunityLikesPage from './community/TcCommunityLikesPage'
// import TcCommunityAddFeeds from './community/TcCommunityAddFeeds'
// import TcCommunityTopicPage from './community/TcCommunityTopicPage'
// import TcUserInfo from './userinfo/TcUserInfo'
// import TcUserFollowPage from './userinfo/TcUserFollowPage'
// import TcUserTagsPage from './userinfo/TcUserTagsPage'
// import TcUserInfoEdit from './userinfo/TcUserInfoEdit'
// import SelectLang from '../components/SelectLang'
// // import Register from './Register'
// import Home from './Home'
import HeaderThinkCar from '../components/Header'
import FooterThinkCar from '../components/Footer'
import Loading from '../components/Loading'
import ScrollToTop from '../components/ScrollToTop'
addLocaleData([...en, ...zh]);

// const history = createBrowserHistory();
const supportsHistory = 'pushState' in window.history;

const { Header, Footer, Sider, Content } = Layout;

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});


class App extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      lang: sessionStorage.lang || 'en-us',
      isFetching: false,
      antdLocaleLang: enUS,
      userLocaleLang: en_US,
      top: 0,
      buyDrawerVisible: false,
      headerNavIsMove: false,
      buyDrawerList: { buyDrawerVisible: false, list: [] },
      initDataObj: InitData,  // 初始化商品列表数据
    }
    this.handleLangChange = this.handleLangChange.bind(this)//切换语言 
    this.headerShowBuy = this.headerShowBuy.bind(this)  // 加入购物车
    this.headerCloseBuy = this.headerCloseBuy.bind(this)
    this.headernNavAffixMove = this.headernNavAffixMove.bind(this)
    this.buyCarListDeletItem = this.buyCarListDeletItem.bind(this) // 购物车删除指定商品
    this.onChangeBuyNumberInList = this.onChangeBuyNumberInList.bind(this) // 购物车指定商品数量修改
    this.getGoodsList = this.getGoodsList.bind(this) // 接口请求： 获取商品列表
    this.initLoginData = this.initLoginData.bind(this) // 接口请求： 获取购物车列表
    this.clearBuyCartList = this.clearBuyCartList.bind(this) // 清空购物车列表
    this.tcUserSignOut = this.tcUserSignOut.bind(this) // 退出
    this.getLoginInfo = this.getLoginInfo.bind(this)

  }
  componentDidMount () {
    let _isPC = browserRedirect();
    let _initDa = this.state.initDataObj
    _initDa._isPcOrMobile = _isPC;
    this.setState({
      initDataObj: _initDa
    });

    sessionStorage.appVersion = isWeiXin();

    this.getGoodsList();
    this.handleLangChange(this.state.lang)
  }

  getGoodsList () {
    this.setState({
      isFetching: true
    })
    let _pa = { lang: this.state.lang, status: 1 }
    let url = config.getGoodsList,
      param = deepObjectMerge(_pa, { sign: getSign(_pa).toUpperCase() });

    return request(url, {
      method: 'POST',
      body: param,
    })
      .then(data => {
        if (data.code == 0) {
          if (data.data.length) {
            var _l = this.state.initDataObj || [];
            data.data.map((ob, idx) => {
              var _k = getProductByLang(this.state.lang, _l) || [];
              var _find = _k.find(_item => _item.id == ob.id);
              _find && (
                _find.name = ob.name.toUpperCase(),
                _find.price = ob.price,
                _find.status = ob.status,
                _find.smimg = ob.smimg,
                _find.type = ob.type,
                _find.serviceList = ob.serviceList,
                _find.serviceList.map((ob, idx) => {
                  ob.ischeck = false;
                })
              )
            })
            this.setState({
              isFetching: false,
              initDataObj: _l || []
            }, () => { this.initLoginData() })

          }
          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.message))
          return false

        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  }


  initLoginData () {
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (_getSeuserInfo) {
      var _indtat = this.state.initDataObj;
      _indtat.isLogin = true;
      _indtat.userInfo = JSON.parse(_getSeuserInfo);

      var _ob = { buyDrawerVisible: false, list: this.state.buyDrawerList.list };
      var _url = config.getUserCartList;
      var _pr = { // 接口参数
        "lang": this.state.lang,
        "user_id": this.state.initDataObj.userInfo.id
      };
      this.setState({
        initDataObj: _indtat,
        isFetching: true
      });
      let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
      return request(_url, {
        method: 'POST',
        body: _param,
      })
        .then(data => {
          if (data.code == 0) {
            data.data.length && (
              data.data.map((_item, _idx) => {
                var _suijiId = `tc${new Date().getTime()}${_item.dateline}`
                var _d = getProductByLang(this.state.lang, this.state.initDataObj) || [];
                _d = _d.find(_item2 => _item2.id == _item.goods_id);
                var _obj = objectAssign({}, _d,
                  {
                    _suijiId: _suijiId,
                    cart_id: _item.id,
                    number: _item.quantity,
                    serviceType: _item.service_id,
                    service: _item.service_id != "0"
                  }
                );
                _ob.list.push(_obj);

              }),
              set_session_cache('tc_temporary_buy_car_data', _ob),
              this.setState({
                isFetching: false,
                buyDrawerList: _ob
              })
            )
            this.setState({
              isFetching: false,
            })

            return true
          } else {
            this.setState({
              isFetching: false
            }, () => message.error(data.message))
            return false

          }
        })
        .catch(err => {
          this.setState({
            isFetching: false
          }, () => message.error(err.toString()))
          return false
        });
    } else {
      var _da = get_session_cache('tc_temporary_buy_car_data');
      // console.log('====get_session_cache====', _da);
      if (_da) {
        var _d = JSON.parse(_da);
        _d.buyDrawerVisible = false;
        this.setState({ buyDrawerList: _d })
      }
    }
  }

  getLoginInfo () {
    this.initLoginData();
  }

  handleLangChange (lang) {
    let antdLocaleLang = '';
    let userLocaleLang = '';
    switch (lang) {
      case 'en-us':
        antdLocaleLang = enUS;
        userLocaleLang = en_US;
        break;
      case 'zh-cn':
        antdLocaleLang = zhCN;
        userLocaleLang = zh_CN;
        break;
      default:
        antdLocaleLang = enUS;
        userLocaleLang = en_US;
        break;
    }
    this.setState({
      lang,
      antdLocaleLang,
      userLocaleLang
    })

  }
  headerShowBuy (val) {
    var _ob = { buyDrawerVisible: true, list: this.state.buyDrawerList.list };
    var _suijiId = `tc${new Date().getTime()}`
    if (val) {
      var _findList = _ob.list.filter(_item => _item.id == val.id);

      var _url = '';
      // 判断是否登录
      if (this.state.initDataObj.isLogin) {
        var _pr = {};
        var _srf = _findList.find(_item => _item.serviceType == val.serviceType);
        // 判断请求接口为 ：新增 or 添加数量
        if (_findList.length && _srf) {

          _url = config.getUpdateQuantity;
          _pr = { // 接口参数
            "lang": this.state.lang,
            "cart_id": _srf.cart_id || "0",
            "num": parseInt(_srf.number) + parseInt(val.number),
          };

        } else {
          _url = config.getCreateCart;
          _pr = { // 接口参数
            "lang": this.state.lang,
            "user_id": this.state.initDataObj.userInfo.id,
            "goods_id": val.id,
            "goods_name": val.name,
            "goods_price": val.price,
            "goods_smimg": val.smimg,
            "quantity": val.number,
            "service_id": "",
            "service_name": "",
            "service_price": 0,
            "service_smimg": "",
          };
          // 是否有服务
          if (val.service) {
            var _d = getProductByLang(this.state.lang, this.state.initDataObj) || [];
            _d = _d.find(_item => _item.id == val.id);
            var _service = _d.serviceList.find(_item => _item.id == val.serviceType);
            _service && (
              _pr.service_id = _service.id,
              _pr.service_name = _service.name,
              _pr.service_price = _service.price,
              _pr.service_smimg = _service.smimg
            )
          }

        }

        // 购物车添加商品 接口：
        this.setState({
          isFetching: true
        });
        let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
        // console.log(_param);
        return request(_url, {
          method: 'POST',
          body: _param,
        })
          .then(data => {
            if (data.code == 0) {
              if (_findList.length && _srf) {
                var _find = _findList.find(_item => _item.serviceType == val.serviceType);
                _find ? (_find.number = parseInt(_find.number) + parseInt(val.number)) : (val._suijiId = _suijiId, _ob.list.push(val));
              } else {
                val._suijiId = _suijiId;
                val.cart_id = data.data.cart_id;
                _ob.list.push(val);
              }
              this.setState({
                isFetching: false,
                buyDrawerList: _ob
              });
              return true

            } else {
              this.setState({
                isFetching: false
              }, () => message.error(data.message))
              return false

            }
          })
          .catch(err => {
            this.setState({
              isFetching: false
            }, () => message.error(err.toString()))
            return false
          });
      } else {
        if (_findList.length) {
          var _find = _findList.find(_item => _item.serviceType == val.serviceType);
          _find ? (_find.number = parseInt(_find.number) + parseInt(val.number)) : (val._suijiId = _suijiId, _ob.list.push(val));
        } else {
          val._suijiId = _suijiId;
          _ob.list.push(val);
        }
        this.setState({
          isFetching: false,
          buyDrawerList: _ob
        }, () => { set_session_cache('tc_temporary_buy_car_data', _ob) });
      }

    } else {
      this.setState({
        isFetching: false,
        buyDrawerList: _ob
      });
    }
  }
  buyCarListDeletItem (item) {
    var _ob = { buyDrawerVisible: true, list: this.state.buyDrawerList.list };

    // 判断是否登录
    if (this.state.initDataObj.isLogin) {
      var _find = _ob.list.find(_item => _item._suijiId == item)
      var _url = config.delUserCart;
      var _pr = { // 接口参数
        "lang": this.state.lang,
        "cart_id": _find.cart_id,
      };
      this.setState({
        isFetching: true
      });
      let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
      // console.log(_param);
      return request(_url, {
        method: 'POST',
        body: _param,
      })
        .then(data => {
          if (data.code == 0) {
            _ob.list = _ob.list.filter(_item => _item._suijiId != item)
            this.setState({
              isFetching: false,
              buyDrawerList: _ob
            });
            return true
          } else {
            this.setState({
              isFetching: false
            }, () => message.error(data.message))
            return false

          }
        })
        .catch(err => {
          this.setState({
            isFetching: false
          }, () => message.error(err.toString()))
          return false
        });
    } else {
      _ob.list = _ob.list.filter(_item => _item._suijiId != item)
      this.setState({
        isFetching: false,
        buyDrawerList: _ob
      }, () => { set_session_cache('tc_temporary_buy_car_data', _ob) });
    }


  }
  clearBuyCartList (_path) {

    this.setState({
      buyDrawerList: { buyDrawerVisible: false, list: [] }
      // }, () => { _path && window.location.replace(window.location.origin + '' + _path) });
    }, () => { _path && history.replace(_path) });
  }
  tcUserSignOut () {
    let _initDataObj = this.state.initDataObj;
    _initDataObj.isLogin = false;
    this.setState({ initDataObj: _initDataObj });
  }

  onChangeBuyNumberInList (ev, item, type) {
    // console.log(ev, item);
    var _ob = { buyDrawerVisible: true, list: this.state.buyDrawerList.list };
    var _findList = _ob.list.find(_item => _item._suijiId == item._suijiId);
    switch (type) {
      case 'select':
        _findList.number = parseInt(ev.target.value) || 0;
        break;
      case 'add':
        _findList.number = parseInt(_findList.number) + 1;
        break;
      case 'minus':
        ev > 1 ? _findList.number = parseInt(_findList.number) - 1 : _findList.number = 1;
        break;
      default:

    }
    // 判断是否登录
    if (this.state.initDataObj.isLogin) {
      // if (true) {
      var _url = config.getUpdateQuantity;
      var _pr = { // 接口参数
        "lang": this.state.lang,
        "cart_id": item.cart_id,
        "num": _findList.number,
      };
      this.setState({
        isFetching: true
      });
      let _param = deepObjectMerge(_pr, { sign: getSign(_pr).toUpperCase() });
      // console.log(_param);
      return request(_url, {
        method: 'POST',
        body: _param,
      })
        .then(data => {
          if (data.code == 0) {
            this.setState({
              isFetching: false,
              buyDrawerList: _ob
            });
            return true
          } else {
            this.setState({
              isFetching: false
            }, () => message.error(data.message))
            return false

          }
        })
        .catch(err => {
          this.setState({
            isFetching: false
          }, () => message.error(err.toString()))
          return false
        });
    } else {
      this.setState({
        isFetching: false,
        buyDrawerList: _ob
      }, () => { set_session_cache('tc_temporary_buy_car_data', _ob) });
    }

  }
  headerCloseBuy () {
    this.setState({
      buyDrawerList: { buyDrawerVisible: false, list: this.state.buyDrawerList.list }
    });
  }
  headernNavAffixMove (affixed) {
    this.setState({
      headerNavIsMove: affixed
    });
  }

  render () {
    let { isFetching, initDataObj, lang, antdLocaleLang, userLocaleLang, buyDrawerVisible, headerNavIsMove, buyDrawerList } = this.state
    return (
      <Layout>
        <IntlProvider
          locale={lang}
          messages={userLocaleLang}
        >

          <Router history={history} basename='' forceRefresh={!supportsHistory}>
            <ConfigProvider locale={antdLocaleLang}>
              {/* <div className="container">
              <div className="header">
                <div className="logo">
                  <span className="launch">Think Car</span>
                  <FormattedMessage
                    id="appName"
                  />
                </div>
              </div>
              <Switch>
                <Route path="/login" render={(props) => <div className="main-content">
                  <SelectLang lang={lang} handleLangChange={lang => this.handleLangChange(lang)} />
                  <Login {...props} />
                </div>} />
                <Route path="/register" component={Register} />
                <Route exact path="/" component={Home} />
                <Redirect from="/index" to="/" />
                <Route component={NoMatch} />
              </Switch>
            </div> */}

              <Header className="header" >
                <Affix key="affixeOne" style={{ zIndex: '999' }} offsetTop={this.state.top} onChange={affixed => this.headernNavAffixMove(affixed)} >
                  <HeaderThinkCar
                    key="HeaderThinkCarMainKey"
                    InitData={initDataObj}
                    history={history}
                    headerNavIsMove={headerNavIsMove}
                    lang={lang}
                    headerShowBuy={this.headerShowBuy}
                    clearBuyCartList={this.clearBuyCartList}
                    tcUserSignOut={this.tcUserSignOut}
                    handleLangChange={lang => this.handleLangChange(lang)}
                  />
                </Affix>
              </Header>
              <ScrollToTop>
                <Content style={{ minHeight: '300px' }}>
                  <Switch>
                    <Route path="/login" render={(props) => <div className="main-content">
                      <Login {...props} getLoginInfo={this.getLoginInfo} />
                    </div>} />
                    <Route path="/forgotpassword" render={(props) => <div className="tc-forgotpassword-page-route">
                      <ForgotPassword {...props} />
                    </div>} />
                    <Route path="/tcregister" render={(props) => <div className="tc-tcregister-page-route">
                      <TcRegister {...props} />
                    </div>} />
                    {/* <Route path="/register" component={Register} /> */}
                    {/* <Route exact path="/" component={Home} /> */}
                    <Route exact path="/" render={(props) => <div className="tc-home-page-main">
                      <Home {...props} InitData={initDataObj} />
                    </div>} />
                    {/* <Route exact path="/ProductPage/:id/:tabs" component={ProductPage} /> */}
                    <Route path="/ProductPage/:id/:tabs" render={(props) => <div className="main-content-ProductPage">
                      <ProductPage {...props} InitData={initDataObj} />
                    </div>} />
                    {/* <Route exact path="/ProductBuyPage/:id" component={ProductBuyPage} headerShowBuy={this.headerShowBuy} /> */}
                    <Route path="/ProductBuyPage/:id" render={(props) => <div className="main-content-ProductBuyPage">
                      <ProductBuyPage {...props} InitData={initDataObj} headerShowBuy={this.headerShowBuy} />
                    </div>} />
                    <Route path="/order/:type/:data" render={(props) => <div className="main-content">
                      <OrderPage {...props} InitData={initDataObj} buyDrawerList={buyDrawerList} clearBuyCartList={_pa => this.clearBuyCartList(_pa)} />
                    </div>} />
                    <Route path="/orderlist" render={(props) => <div className="tc-orderlist-page-route">
                      <OrderListPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/orderlistdetail/:orderid" render={(props) => <div className="tc-orderlistdetail-page-route">
                      <OrederListDetailPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/about" render={(props) => <div className="tc-about-page-route">
                      <AboutPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/pointdetail" render={(props) => <div className="tc-pointdetail-page-route">
                      <PointDetail {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/somethingpicture/:type" render={(props) => <div className="tc-somethingpicture-page-route">
                      <SomethingPicturePage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/news" render={(props) => <div className="tc-news-page-route">
                      <NewsPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/newsDetail/:type/:id" render={(props) => <div className="tc-news-detail-page-route">
                      <NewsDetailPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/faq" render={(props) => <div className="tc-faq-page-route">
                      <FAQPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/video/:type" render={(props) => <div className="tc-video-page-route">
                      <VideoPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/redemption" render={(props) => <div className="tc-redemption-page-route">
                      <RedemptionPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/moments" render={(props) => <div className="tc-moments-page-route">
                      <MomentsPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/coverage/:type" render={(props) => <div className="tc-coverage-page-route">
                      <CoveragePage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/thinkstore" render={(props) => <div className="tc-thinkstore-page-route">
                      <ThinkStorePage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/community" render={(props) => <div className="tc-community-page-route">
                      <TcCommunityHomePage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/communityinfo/:feedid" render={(props) => <div className="tc-communityinfo-page-route">
                      <TcCommunityInfoDetailPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/communitylikes/:type/:feedid" render={(props) => <div className="tc-communitylikes-page-route">
                      <TcCommunityLikesPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/addfeed/:type/:id" render={(props) => <div className="tc-communityaddfeed-page-route">
                      <TcCommunityAddFeeds {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/communitytopic/:topicid" render={(props) => <div className="tc-communitytopic-page-route">
                      <TcCommunityTopicPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/userinfo/:userid" render={(props) => <div className="tc-userinfo-page-route">
                      <TcUserInfo {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/userfollow/:userid/:type" render={(props) => <div className="tc-userfollow-page-route">
                      <TcUserFollowPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/usertags" render={(props) => <div className="tc-usertags-page-route">
                      <TcUserTagsPage {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/useredit" render={(props) => <div className="tc-useredit-page-route">
                      <TcUserInfoEdit {...props} InitData={initDataObj} />
                    </div>} />
                    <Route path="/PMessagePage/:type" component={PMessagePage} />
                    <Redirect from="/index" to="/" />
                    <Route component={NoMatch} />
                  </Switch>
                  {/* <Affix key="affixeTwo" offsetBottom={100} onChange={affixed => this.headernNavAffixMove(affixed)} ><p>test</p></Affix> */}
                  <BackTop />
                </Content>
              </ScrollToTop>
              <Footer className=" think-car-padding0 ">
                <FooterThinkCar history={history} className=" think-car-padding10 " />
              </Footer>

              <HistoryTask
                key="HistoryTaskMainKey"
                history={history}
                lang={lang}
                buyDrawerVisible={buyDrawerVisible}
                buyDrawerList={buyDrawerList}
                buyCarListDeletItem={this.buyCarListDeletItem}
                headerCloseBuy={this.headerCloseBuy}
                onChangeBuyNumberInList={this.onChangeBuyNumberInList}
              />
              <Loading loading={isFetching} />
            </ConfigProvider>
          </Router>
        </IntlProvider>


      </Layout >
    )
  }
}

export default App
// export default connect(
//   null,
//   { addTodo }
// )(App);