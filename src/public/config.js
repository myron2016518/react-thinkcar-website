//let host = location.host;

const config = {

  getGoodsList: '/Api/Index/goodsListAndService',  // 获取商品信息列表
  getAreaList: '/Api/Index/areaList',  // 获取3个国家的州（省）信息列表接口
  getCountryList: '/Api/Index/countryList',  // 获取国家信息列表接口
  getStateList: '/Api/Index/stateList',  // 获取州信息列表接口
  getCreateCart: '/Api/Index/createCart',  // 购物车添加商品
  getUpdateQuantity: '/Api/Index/updateQuantity',  // 购物车商品数量加减接口
  getCreateOrder: '/Api/Index/createOrder',  // 创建订单接口
  getUserOrderList: '/Api/Index/getUserOrderList',  // 用户订单列表接口
  getWebRebate: '/Api/Index/webRebate',  // 推荐码校验和优惠额度接口
  getUserCartList: '/Api/Index/getUserCartList',  // 获取用户购物车列表接口
  delUserCart: '/Api/Index/delUserCart',  // 删除购物车商品接口
  rewardsCode: '/Api/Index/rewardsCode',  // 兑换码兑换积分接口
  goodsFunctions: '/Api/Index/goodsFunctions',  // 所有产品和产品支持的功能列表接口
  getMakeList: '/Api/Index/getMakeList',  // 根据产品类型获取车品牌列表接口
  getModelByMake: '/Api/Index/getModelByMake',  // 根据车品牌获取车型列表接口
  getYearByMakeAndModel: '/Api/Index/getYearByMakeAndModel',  // 根据车品牌和车型获取车年款、支持系统、不支持系统接口


  tcLogin: '/api/v2/auth/login',  // 登录
  tcGetUserInfo: '/api/v2/user',  // 获取用户信息 get
  tcRegister: '/api/v2/users',  // 注册
  tcForgotPasswordverifycodes: '/api/v2/verifycodes',  // 注册用户发送
  tcverifycodesregister: '/api/v2/verifycodes/register',  // 非注册用户发送
  tcForgotPasswordSubmit: '/api/v2/user/retrieve-password',  // 用户找回密码

}


export { config as default } 