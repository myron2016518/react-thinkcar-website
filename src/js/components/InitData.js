
//正常卖的有       car1/1s.   plus.   obd100   diag先不变，tool只做产品展示
const _tcyb = "https://www.youtube.com/embed/";
const _tcImg = "/Home/img/";
const _path1 = 'https://mythinkcar.com';
const initData = {
  _isPcOrMobile: true,  // true : PC  ， false : Mobile
  isLogin: false,
  userInfo: { id: '001', name: 'x', token: '002' },
  md5Code: '99a2eb85f315d136f064cb7d4bcdc884',
  _homeImgPath: 'https://mythinkcar.com',
  _homeApiImgPath: 'https://api.mythinkcar.com/',
  _momentsPath: 'https://www.mythinkcar.com/home/explore/tmpv2',
  _tcCommImgPath: 'https://ithinkcar.com/api/v2/files/',
  _tcYoutubePath: _tcyb,
  _appSharePath: 'https://api.mythinkcar.com/AdPush/Index/sharePage/lang/en/feed/',
  _uploadType: {
    'img': '.bmp,.gif,.jpeg,.jpg,.png,.psd,.tga,.pcx,.tiff,.exif,.fpx,.svg,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.hdri,.raw,.wmf,.lic,.fli,.flc,.emf,.dif',
    'video': '.mpeg,.mpeg-1,.mpeg1,.mpeg-2,.mpeg2,.mpeg-4,.mpeg4,.mpg,.mpe,.dat,.mp4,.m4v,.3gp,.3g2,.avi,.navi,.mov,.asf,.asx,.wmv,.wmvhd,.mkv,.flv,.f4v,.rmvb,.webm,.qsv,.ogg,.vob,.swf,.xv,.rm,.vcd,.svcd,.divx,.xvid,.dvd,.dv .mts,.ra,.ram,.wma,.mpa,.mod,.wav,.au,.dif,.ape,.avs,.avc,.mux',
  },
  _indexBinnerImgList: [],
  _indexImgAll: {
    "img1": _tcImg + "point.jpg",
    "img2": _tcImg + "index_img2.jpg",
    "img3": _tcImg + "index_img3.jpg",
    "img4": _tcImg + "index_img4.jpg",
    "img5": _tcImg + "index_img5.jpg",
  },
  _indexMobileImgAll: {
    "img1": _tcImg + "mobile/point.jpg",
    "img2": _tcImg + "mobile/index_img2.jpg",
    "img3": _tcImg + "mobile/index_img3.jpg",
    "img4": _tcImg + "mobile/index_img4.jpg",
    "img5": _tcImg + "mobile/index_img5.jpg",
  },
  _aboutPageImg: _tcImg + 'about_banner.jpg',
  _newsPageImg: _tcImg + 'news_banner.jpg',
  _newsPageList: [
    { "id": "news5", "title": "This Will Change the Car World Forever", "author": "Scotty", "url": _tcyb + "tJo7EMsiDkc" },
    { "id": "news1", "title": "This Changes Everythingt", "author": "Scotty", "url": _tcyb + "lFF9eQwb9Jk" },
    { "id": "news2", "title": "Another OBD11 device on the market (THINKCAR review)", "author": "Ryan Powell", "url": _tcyb + "wIg-ERKQEzU" },
    { "id": "news3", "title": "THINKCAR 1S Professional OBD2 Scan Tool First Look", "author": "Awkward Hampster", "url": _tcyb + "6GaLuJMi7KA" },
    { "id": "news4", "title": "THINKCAR 1s Review and How to Use - Remote Diagnosis OBDII Scanner Bluetooth", "author": "Lawren Wetzel", "url": _tcyb + "tdP_x62fbTo" },
    // { "id": "news1", "title": "", "author": "", "url": "" },

  ],

  _faq: {
    titleImg: _tcImg + "faq_banner.jpg",
    title: "THINKCAR Q&A",
    dec: "",
  },
  productListEn_US: [
    // obd 100
    {
      name: 'ThinkODB 100', price: 34.95, id: '4', "status": "0",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec1',
      'serviceTip': '',
      'imgList': [
        { 'url': _tcImg + 'thinkobd100/1.jpg' },
        { 'url': _tcImg + 'thinkobd100/2.jpg' },
        { 'url': _tcImg + 'thinkobd100/3.jpg' },
        { 'url': _tcImg + 'thinkobd100/4.jpg' },
        { 'url': _tcImg + 'thinkobd100/5.jpg' },
        { 'url': _tcImg + 'thinkobd100/6.jpg' },
        { 'url': _tcImg + 'thinkobd100/7.jpg' },
        { 'url': _tcImg + 'thinkobd100/8.jpg' },
      ],
      'imgListP': [
        { 'url': _tcImg + 'thinkobd100/p-1.png' },
        { 'url': _tcImg + 'thinkobd100/p-2.png' },
        { 'url': _tcImg + 'thinkobd100/p-3.png' },
        { 'url': _tcImg + 'thinkobd100/p-4.png' },
        { 'url': _tcImg + 'thinkobd100/p-5.png' },
      ],
      'parameter': [],
    },
    // ThinkDriver
    {
      name: 'THINKDRIVER', price: 79.95, id: '8', "status": "0",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec8',
      'serviceTip': '',
      'imgList': [
        { 'url': _tcImg + 'thinkdriver/d1.jpg' },
        { 'url': _tcImg + 'thinkdriver/d2.jpg' },
        { 'url': _tcImg + 'thinkdriver/d3.jpg' },
        { 'url': _tcImg + 'thinkdriver/d4.jpg' },
        { 'url': _tcImg + 'thinkdriver/d5.jpg' },
        { 'url': _tcImg + 'thinkdriver/d6.jpg' },
        { 'url': _tcImg + 'thinkdriver/d7.jpg' },
        { 'url': _tcImg + 'thinkdriver/d8.jpg' },
      ],
      'imgListP': [
        { 'url': _tcImg + 'thinkdriver/1.png' },
        { 'url': _tcImg + 'thinkdriver/2.png' },
        { 'url': _tcImg + 'thinkdriver/3.png' },
        { 'url': _tcImg + 'thinkdriver/4.png' },
      ],
      'parameter': [],
    },
    // 1S
    {
      name: 'THINKCAR1s', price: 54.95, id: '1', "status": "0",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec2',
      'serviceTip': 'tc4_2',
      'imgList': [
        { 'url': _tcImg + 'thinkcar1s/1.jpg' },
        { 'url': _tcImg + 'thinkcar1s/2.jpg' },
        { 'url': _tcImg + 'thinkcar1s/3.jpg' },
        { 'url': _tcImg + 'thinkcar1s/4.jpg' },
        { 'url': _tcImg + 'thinkcar1s/5.jpg' },
        { 'url': _tcImg + 'thinkcar1s/6.jpg' },
      ],
      'imgListP': [
        { 'url': _tcImg + 'thinkcar1s/p-1.png' },
        { 'url': _tcImg + 'thinkcar1s/p-2.png' },
        { 'url': _tcImg + 'thinkcar1s/p-3.png' },
        { 'url': _tcImg + 'thinkcar1s/p-4.png' },
      ],
      'parameter': [],
    },

    // diag
    {
      name: 'THINKDIAG', price: 119.95, id: '3', "status": "0",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec4',
      'serviceTip': 'tc4_3',
      'imgList': [
        // { 'url': _tcImg + 'thinkdiag/binner2.jpg' },
        { 'url': _tcImg + 'thinkdiag/1.jpg' },
        { 'url': _tcImg + 'thinkdiag/2.jpg' },
        { 'url': _tcImg + 'thinkdiag/3.jpg' },
        { 'url': _tcImg + 'thinkdiag/4.jpg' },
        { 'url': _tcImg + 'thinkdiag/5.jpg' },
        { 'url': _tcImg + 'thinkdiag/6.jpg' },
        { 'url': _tcImg + 'thinkdiag/7.jpg' },
        { 'url': _tcImg + 'thinkdiag/8.jpg' },
        { 'url': _tcImg + 'thinkdiag/9.jpg' },
        { 'url': _tcImg + 'thinkdiag/10.jpg' },
        { 'url': _tcImg + 'thinkdiag/11.jpg' },
        { 'url': _tcImg + 'thinkdiag/12.jpg' },
      ],
      'imgListP': [
        { 'url': _tcImg + 'thinkdiag/cp1.jpg' },
        { 'url': _tcImg + 'thinkdiag/cp2.jpg' },
        { 'url': _tcImg + 'thinkdiag/cp3.jpg' },
        { 'url': _tcImg + 'thinkdiag/cp4.jpg' },
      ],
      'parameter': [],
    },
    // THINKPLUS
    {
      name: 'THINKPLUS', price: 899.95, id: '6', "status": "0",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec5',
      'serviceTip': '',
      'imgList': [
        { 'url': _tcImg + 'thinkplus/2.jpg' },
        { 'url': _tcImg + 'thinkplus/3.jpg' },
        { 'url': _tcImg + 'thinkplus/4.jpg' },
        { 'url': _tcImg + 'thinkplus/5.jpg' },
        { 'url': _tcImg + 'thinkplus/6.jpg' },
        { 'url': _tcImg + 'thinkplus/7.jpg' },
        { 'url': _tcImg + 'thinkplus/8.jpg' },
        { 'url': _tcImg + 'thinkplus/9.jpg' },
        { 'url': _tcImg + 'thinkplus/10.jpg' },
        { 'url': _tcImg + 'thinkplus/11.jpg' },
      ],
      'imgListP': [
        { 'url': _tcImg + 'thinkplus/p-1.png' },
        { 'url': _tcImg + 'thinkplus/p-2.png' },
        { 'url': _tcImg + 'thinkplus/p-3.png' },
        { 'url': _tcImg + 'thinkplus/p-4.png' },
      ],
      'parameter': [],
    },
    // tool
    {
      name: 'THINKTOOL', price: 1899.95, id: '5', "status": "0",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec6',
      'serviceTip': '',
      'imgList': [
        { 'url': _tcImg + 'thinktool/b1.jpg' },
        { 'url': _tcImg + 'thinktool/b2.jpg' },
        { 'url': _tcImg + 'thinktool/b3.jpg' },
        { 'url': _tcImg + 'thinktool/b4.jpg' },
        { 'url': _tcImg + 'thinktool/b5.jpg' },
        { 'url': _tcImg + 'thinktool/b6.jpg' },
        { 'url': _tcImg + 'thinktool/b7.jpg' },
        { 'url': _tcImg + 'thinktool/b8.jpg' },
        { 'url': _tcImg + 'thinktool/b9.jpg' },
        { 'url': _tcImg + 'thinktool/b10.jpg' },
      ],
      'imgListP': [
        { 'url': _tcImg + 'thinktool/p-1.png' },
        { 'url': _tcImg + 'thinktool/p-2.png' },
        { 'url': _tcImg + 'thinktool/p-3.png' },
        { 'url': _tcImg + 'thinktool/p-4.png' },
      ],
      'parameter': [],
    },
    // ThinkScan Series
    {
      name: 'THINKSCAN SERIES', price: 0, id: '11', "status": "2",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec7',
      'serviceTip': '',
      'imgList': [
        { 'url': _tcImg + 'thinkscanseries/b1.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b2.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b3.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b4.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b5.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b6.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b7.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b8.jpg' },
        { 'url': _tcImg + 'thinkscanseries/b9.jpg' },
      ],
      'imgListP': [],
      'parameter': [],
    },
    // THINKDIAG Extension Cable
    {
      name: 'THINKDIAG Extension Cable', price: 29.95, id: '7', "status": "0",
      serviceList: [],
      'smimg': '',
      'description': 'tcpDec7',
      'serviceTip': '',
      'imgList': [
      ],
      'imgListP': [
        { 'url': _tcImg + 'diagextensioncable/cp1.png' },
        { 'url': _tcImg + 'diagextensioncable/cp2.png' },
      ],
      'parameter': [],
    },
    // THINKDIAG MINI
    // {
    //   name: 'THINKDIAG MINI', price: 0, id: '10', "status": "0",
    //   serviceList: [],
    //   'smimg': '',
    //   'description': 'tcpDec8',
    //   'serviceTip': '',
    //   'imgList': [
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_02.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_03.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_04.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_06.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_08.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_09.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_10.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_11.jpg' },
    //     { 'url': _tcImg + 'thinkdiagmini/diagmini_13.jpg' },
    //   ],
    //   'imgListP': [
    //   ],
    //   'parameter': [],
    // },

  ],

  // shipping
  shippingEn_US: [
    { id: 'tc_ship_1', title: 'tc5_21', price: 9.95, isDisabled: false, description: 'tc5_22' },
    { id: 'tc_ship_2', title: 'tc5_23', price: 0, isDisabled: false, description: 'tc5_24' },
  ],


  // paymentMehtod
  paymentMehtodEn_US: [
    { id: 'tc_payment_1', title: 'PayPal', img: _tcImg + 'logo_PayPal.png' },
    { id: 'tc_payment_2', title: 'Credit Card', img: _tcImg + 'icon-cards.png' },
  ],


  videoThinkcar: [
    { 'id': 'video_id9', 'author': 'THINKCAR', 'url': _tcyb + 'WfaFxNNFQ18', 'title': 'Smallest Most Powerful Diagnostic Tools' },
    { 'id': 'video_id10', 'author': 'THINKCAR', 'url': _tcyb + '83FQXpR_26E', 'title': 'THINKCAR OBD II Functions Tutorial' },
    { 'id': 'video_id11', 'author': 'THINKCAR', 'url': _tcyb + 'ghSU_0MRiz4', 'title': 'THINKCAR Full Vehicle Modules Scan Tutorial' },
    { 'id': 'video_id12', 'author': 'THINKCAR', 'url': _tcyb + 'V25Z_toq0Wk', 'title': 'THINKCAR Black Box Tutorial' },
    { 'id': 'video_id13', 'author': 'THINKCAR', 'url': _tcyb + 'yvwc1m01g3U', 'title': 'Thinkcar Real Time Remote Diagnostics Tutorial' },
    { 'id': 'video_id1', 'author': 'THINKCAR', 'url': _tcyb + 'CCJR1pGoQ2Q', 'title': 'OBD Using' },
    { 'id': 'video_id2', 'author': 'THINKCAR', 'url': _tcyb + 'f7P1Z7I5byk', 'title': 'Full Vehicle Modules Scan' },
    { 'id': 'video_id3', 'author': 'THINKCAR', 'url': _tcyb + 'H32bX8ufyV8', 'title': 'Real Time Diagnostics' },
    { 'id': 'video_id4', 'author': 'THINKCAR', 'url': _tcyb + 'WbLMjTltK_Q', 'title': 'Black Box' },
    { 'id': 'video_id5', 'author': 'THINKCAR', 'url': _tcyb + 'd-9viZk-oQQ', 'title': 'Bluetooth Firmware Updating Tutorial' },
    { 'id': 'video_id6', 'author': 'THINKCAR', 'url': _tcyb + 'XpNz0B78llw', 'title': 'Bluetooth Pairing Tutorial' },
  ],
  videoDiagList: [
    { 'id': 'video_diag_id_20', 'author': 'THINKCAR', 'url': _tcyb + 'mQjl5hs0PMQ', 'title': 'THINKDIAG, the Smart Vehicle Diagnostic Tool Every Mechanic and Car Owner Need!' },
    { 'id': 'video_diag_id_18', 'author': 'THINKCAR', 'url': _tcyb + 'tJo7EMsiDkc', 'title': 'This Will Change the Car World Forever' },
    { 'id': 'video_diag_id_19', 'author': 'THINKCAR', 'url': _tcyb + 'O-Ub2-EUZPk', 'title': 'Get to know ThinkDiag!' },
    { 'id': 'video_id7', 'author': 'THINKCAR', 'url': _tcyb + '8b1DS_wNlnE', 'title': 'If you have a car you must see this' },
    { 'id': 'video_id8', 'author': 'THINKCAR', 'url': _tcyb + 'SWUExkww4ng', 'title': 'ThinkDiag Load Testing' },
    { 'id': 'video_diag_id_1', 'author': 'THINKCAR', 'url': _tcyb + 'JeBpl7Omd0o', 'title': 'ThinkDiag Actuation Tests Tutorial' },
    { 'id': 'video_diag_id_2', 'author': 'THINKCAR', 'url': _tcyb + 'EnVuKQxXLQ0', 'title': 'ThinkDiag Engine Inspection Tutorial' },
    { 'id': 'video_diag_id_3', 'author': 'THINKCAR', 'url': _tcyb + 'EHjpoPvgXvw', 'title': 'ThinkDig Transmission Tutorial' },
    { 'id': 'video_diag_id_4', 'author': 'THINKCAR', 'url': _tcyb + 'JGzb3uZcMuE', 'title': 'ThinkDiag Injector Coding Tutorial' },
    { 'id': 'video_diag_id_5', 'author': 'THINKCAR', 'url': _tcyb + 'qpNG6PBBW08', 'title': 'ThinkDiag Throttle Adaptation Tutorial' },
    { 'id': 'video_diag_id_6', 'author': 'THINKCAR', 'url': _tcyb + '9aWARGwxvk8', 'title': 'ThinkDiag Throttle Adaptation Tutorial 2' },
    { 'id': 'video_diag_id_7', 'author': 'THINKCAR', 'url': _tcyb + 'zShMC7jLKgE', 'title': 'ThinkDiag DPF Regeneration Tutorial' },
    { 'id': 'video_diag_id_8', 'author': 'THINKCAR', 'url': _tcyb + 'rzSrUjThumg', 'title': 'ThinkDiag ABS Bleeding Tutorial' },
    { 'id': 'video_diag_id_9', 'author': 'THINKCAR', 'url': _tcyb + 'F5yq1Lm29Kc', 'title': 'ThinkDiag TPMS Tutorial' },
    { 'id': 'video_diag_id_10', 'author': 'THINKCAR', 'url': _tcyb + 'eCFu35U-MOw', 'title': 'ThinkDiag Reset Brake Tutorial' },
    { 'id': 'video_diag_id_11', 'author': 'THINKCAR', 'url': _tcyb + 'vZEqhV8Asbo', 'title': 'ThinkDiag Reset Brake Tutorial 2' },
    { 'id': 'video_diag_id_12', 'author': 'THINKCAR', 'url': _tcyb + 'bO-LidD2xj8', 'title': 'ThinkDiag Engine oil lamp reset Tutorial 2' },
    { 'id': 'video_diag_id_13', 'author': 'THINKCAR', 'url': _tcyb + 'M2_2gWTT5jg', 'title': 'ThinkDiag Reset SAS Tutorial' },
    { 'id': 'video_diag_id_14', 'author': 'THINKCAR', 'url': _tcyb + 'FIqvYuNG6iw', 'title': 'ThinkDiag Reset SAS Tutorial 2' },
    { 'id': 'video_diag_id_15', 'author': 'THINKCAR', 'url': _tcyb + '-h4UXSVlxVk', 'title': 'ThinkDiag General Diagnosis' },
    { 'id': 'video_diag_id_16', 'author': 'THINKCAR', 'url': _tcyb + 'QF5iSJY5F2M', 'title': 'ThinkDiag Diagnosis for Toyota model' },
    { 'id': 'video_diag_id_17', 'author': 'THINKCAR', 'url': _tcyb + '_VgcYjAIyTg', 'title': 'ThinkDiag Diagnosis for Benz model' },
  ],
  videoOBD100List: [
    { 'id': 'video_obd100_id1', 'author': 'THINKCAR', 'url': _tcyb + '0ZcZK7TINyg', 'title': 'THINKOBD 100 Presentation' },
  ],
  videoPlusList: [
    { 'id': 'video_obd100_id1', 'author': 'THINKCAR', 'url': _tcyb + 'Upv8Db5ndSc', 'title': 'THINKPLUS Presentation' },
  ],
  driver_video: [
    { 'id': 'video_driver_2', 'author': 'THINKCAR', 'url': _tcyb + '77Pii17U2pg', 'title': 'How to diagnose and fix a Honda XR-V with THINKDRIVER?' },
    { 'id': 'video_driver_1', 'author': 'THINKCAR', 'url': _tcyb + 'XiJnRgAdl4Y', 'title': 'THINKDRIVER, the smart Bluetooth Scanner Every Car Owner Needs! ' },
  ],
  tool_video: [
    { 'id': 'tv_1', 'author': 'THINKCAR', 'url': _tcyb + 'WWxvC0eYW2I', 'title': "THINKTOOL, the world's first All-in-one automotive diagnostic tool." },
    { 'id': 'tv_2', 'author': 'THINKCAR', 'url': _tcyb + 'yx-6HLLP4ug ', 'title': "THINKTOOL TPMS" },
    { 'id': 'tv_3', 'author': 'THINKCAR', 'url': _tcyb + '4zDV7xvz-u8', 'title': "THINKTOOL PRINTER" },
    { 'id': 'tv_4', 'author': 'THINKCAR', 'url': _tcyb + 'w2h4qZj-lbY', 'title': "THINKTOOL BATTERY TESTER" },
    { 'id': 'tv_5', 'author': 'THINKCAR', 'url': _tcyb + 'AmYi-Zm7_C4', 'title': "THINKTOOL 6 modulars+TPMS" },
  ],

}


export { initData as default } 