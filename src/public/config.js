//let host = location.host;

const config = {

  webUrlOrBtnClick: '/Api/Statistics/webUrlOrBtnClick',  // 统计点击次数

  getGoodsList: '/Api/Index/goodsListAndService',  // 获取商品信息列表
  getAreaList: '/Api/Index/areaList',  // 获取3个国家的州（省）信息列表接口
  getCountryList: '/Api/Index/countryList',  // 获取国家信息列表接口
  getStateList: '/Api/Index/stateList',  // 获取州信息列表接口
  getCreateCart: '/Api/Index/createCart',  // 购物车添加商品
  getUpdateQuantity: '/Api/Index/updateQuantity',  // 购物车商品数量加减接口
  getCreateOrder: '/Api/Index/createOrder',  // 创建订单接口
  getUserOrderList: '/Api/Index/getUserOrderList',  // 用户订单列表接口
  getOneOrderDetails: '/Api/Index/getOneOrderDetails',  // 获取订单详情接口
  getWebRebate: '/Api/Index/webRebate',  // 推荐码校验和优惠额度接口
  getUserCartList: '/Api/Index/getUserCartList',  // 获取用户购物车列表接口
  delUserCart: '/Api/Index/delUserCart',  // 删除购物车商品接口
  rewardsCode: '/Api/Index/rewardsCode',  // 兑换码兑换积分接口
  goodsFunctions: '/Api/Index/goodsFunctions',  // 所有产品和产品支持的功能列表接口
  getMakeList: '/Api/Index/getMakeList',  // 根据产品类型获取车品牌列表接口
  getModelByMake: '/Api/Index/getModelByMake',  // 根据车品牌获取车型列表接口
  getYearByMakeAndModel: '/Api/Index/getYearByMakeAndModel',  // 根据车品牌和车型获取车年款、支持系统、不支持系统接口
  getThinkDiagSupportSysByCar: '/Api/Index/getThinkDiagSupportSysByCar',  // type ==1  根据车品牌和车型获取车年款、支持系统、不支持系统接口
  tcStorageApi: '/Api/Index/storageApi',   // 文件存储


  tcLogin: '/api/v2/auth/login',  // 登录
  tcGetUserInfo: '/api/v2/user',  // 获取用户信息 get
  tcRegister: '/api/v2/users',  // 注册
  tcForgotPasswordverifycodes: '/api/v2/verifycodes',  // 注册用户发送
  tcverifycodesregister: '/api/v2/verifycodes/register',  // 非注册用户发送
  tcForgotPasswordSubmit: '/api/v2/user/retrieve-password',  // 用户找回密码
  tcCommunityGetFeeds: '/api/v2/feeds',  // 获取动态全部
  tcTags: '/api/v2/tags',  // 获取所有标签
  tcStorages: '/api/v2/storage',  // 文件存储
  tcDailyTopic: '/api/v2/dailyTopic',  // 话题
  tcFeedTopic: '/api/v2/feed/topics',  // 话题
  tcFiles: '/api/v2/files',  // 文件
  tcFilesStorage: '/storage/public',  // 头像上传回调再次上传路径


  tcGetAdList: '/Api/Other/getAdList',  // HotSpot下面的广告列表接口
  tcGetVideoList: '/Api/Other/getVideoList',  // 分页获取视频列表接口
  tcGetRefereeList: '/Api/Other/getRefereeList',  // 系统推荐人接口


}


export { config as default } 