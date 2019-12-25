// import 'es6-promise';//fetch是基于Promise来实现的，所以还需要Promise的polyfillpromise的polyfill
import 'whatwg-fetch';//fetch的polyfill实现
import objectAssign from 'object-assign';//ie不支持Object.assign
import forge from 'node-forge'//各种加密算法插件，本项目用MD5
import config from './config'
import { message } from 'antd';

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function parseJSON (response) {
  return response.statusText != 'No Content' ? response.json() : response;
}

function request (url, options = {}) {
  let data = options.body || {};
  let _headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  if (options.headers) {
    _headers = objectAssign({}, _headers, options.headers);
    // _headers['Content-type'] = 'application/json';
    delete options.headers;
  }
  if (options && options.method && options.method.toLowerCase() == 'get') {
    options.body && (url += `?${transformParas(data)}`);
    delete options.body;
  } else {
    if (options.method.toLowerCase() == 'put') {
      // options.body = JSON.stringify(data);
      options.body = transformParas(data);
    } else {
      options.body = transformParas(data);
      options.mode = 'no-cors';
    }

  }
  // console.log(_headers);
  // console.log(objectAssign({}, {
  //   method: 'post',
  //   credentials: 'include',
  //   mode: 'no-cors',
  //   headers: _headers
  // }, options));
  return fetch(url, objectAssign({}, {
    method: options.method || 'post',
    credentials: 'include',
    headers: _headers
  }, options))
    .then(checkStatus)
    .then(parseJSON)
  /*.then((data) => ( data ))
  .catch((err) => ( err ));*/
}



function requestToken (url, options = {}) {
  let data = options.body || {};
  let _headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  if (options.headers) {
    _headers = objectAssign({}, _headers, options.headers);
    // _headers['Content-type'] = 'application/json';
    delete options.headers;
  }
  if (options && options.method && options.method.toLowerCase() == 'get') {
    options.body && (url += `?${transformParas(data)}`);
    delete options.body;
  } else {
    options.method.toLowerCase() != 'put' && (options.mode = 'no-cors')
    options.body = transformParas(data);
  }

  return fetch(url, objectAssign({}, {
    method: options.method || 'post',
    credentials: 'include',
    headers: _headers
  }, options))
    .then((data) => ({ datacm: data, res: data.json() }))
    .catch((err) => (err));
}


function _requestWebUrlOrBtnClick (options = {}) {
  let data = options.body || {};
  let _url = config.webUrlOrBtnClick;
  let _headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  options.body = transformParas(data);
  return fetch(_url, objectAssign({}, {
    method: 'post',
    credentials: 'include',
    headers: _headers
  }, options))
    .then((data) => (data))
    .catch((err) => (err));
}

/**
 * 解析查询字符串，返回包含所有参数的对象
 */
function getQueryStringArgs () {
  var qs = (location.search.length > 0) ? location.search.substring(1) : "",
    args = {},
    items = qs.length > 0 ? qs.split("&") : [],
    item = null,
    name = null,
    value = null;

  items.map((arg, index) => {
    item = arg.split("=");
    name = decodeURIComponent(item[0]);
    value = item[1] && decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  })
  return args;

}

//对传入对象更改为查询字符串形式
function transformParas (obj, shouldEncodeURI = false) {
  let arr = [];
  for (let key in obj) {
    let str = '';
    if (shouldEncodeURI) {
      str = `${encodeURIComponent(key)}=${encodeURIComponent(encodeURIComponent(obj[key]))}`;
    } else {
      str = `${key}=${obj[key]}`;
    }

    arr.push(str);
  }
  return arr.join('&');
}

//对传入对象更改为查询字符串形式(加密)
function transformParas2 (obj, shouldEncodeURI = false) {
  let arr = [];
  for (let key in obj) {
    let str = '';
    if (shouldEncodeURI) {
      str = `${encodeURIComponent(key)}=${encodeURIComponent(encodeURIComponent(obj[key]))}`;
    } else {
      str = `${key}${obj[key]}`;
    }

    arr.push(str);
  }
  return arr.join('');
}

/**
 * 根据对象属性名排序
 */
function objKeySort (obj) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(obj).sort(function (a, b) {
    var len = Math.min(a.length, b.length);
    for (var i = 0; i < len; i++) {
      var val = a.toLowerCase().charCodeAt(i) - b.toLowerCase().charCodeAt(i);
      if (val != 0) {
        return val;
      } else if (i == len - 1) {
        return a.length - b.length
      }
    }
  });
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj; //返回排好序的新对象
}

/**
 * 根据数组对象中的某个属性值进行排序的方法
 * 使用例子：new Array.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 */
function sortBy (attr, rev = true) {
  //第二个参数没有传递 默认升序排列
  rev = (rev) ? 1 : -1;
  return function (a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  }
}
//MD5加密
function md5 (str) {
  var md = forge.md.md5.create();
  md.update(str, "utf8");
  return md.digest().toHex();
}
//获取sign：对接口内所有参数（除文件参数外）升序排序后，md5加密一次，然后再加上字符串“GXWEIXIUZHAN”再md5加密一次，形成sign
function getSign (obj = {}) {
  // console.log(md5('thinkcar'));
  var sorttedObj = objKeySort(obj);
  var objToStr = transformParas2(sorttedObj);
  var firstEncryption = md5(objToStr + "99a2eb85f315d136f064cb7d4bcdc884");
  // var secondEncryption = md5(firstEncryption + "99a2eb85f315d136f064cb7d4bcdc884");
  return firstEncryption

}


// 获取sessionStorage存储数据 
const get_session_cache = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}
//设置sessionStorage存储数据
const set_session_cache = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}
//删除sessionStorage存储数据
const remove_session_cache = (name) => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
//获取localStorage存储数据
const get_local_cache = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}
//设置localStorage存储数据
const set_local_cache = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}
//删除localStorage存储数据
const remove_local_cache = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 *基本的cookie操作：读、写、删 
 */
const CookieUtil = {
  get: function (name) {
    var cookieName = encodeURIComponent(name) + "=",
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null,
      cookieEnd;
    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
  },

  set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += "; expires=" + expires.toGMTString();
    }
    if (path) {
      cookieText += "; path=" + path;
    }
    if (domain) {
      cookieText += "; domain=" + domain;
    }
    if (secure) {
      cookieText += "; secure";
    }
    document.cookie = cookieText;
  },
  unset: function (name, path, domain, secure) {
    this.set(name, "", new Date(0), path, domain, secure);
  }
};
/**
 * 浏览器兼容的事件函数
 */
const EventUtil = {
  addEventHandler: function (oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
      oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
      oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
      oTarget["on" + sEventType] = fnHandler;
    }
  },
  removeEventHandler: function (oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
      oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
      oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
      oTarget["on" + sEventType] = null;
    }
  },
  getEvent: function () {
    if (window.event) {
      return this.formatEvent(window.event);
    } else {
      return EventUtil.getEvent.caller.arguments[0];
    }
  },

  formatEvent: function (oEvent) {
    if (isIE && isWin) {
      oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
      oEvent.eventPhase = 2;
      oEvent.isChar = (oEvent.charCode > 0);
      oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
      oEvent.pageY = oEvent.clientY + document.body.scrollTop;
      oEvent.preventDefault = function () {
        this.returnValue = false;
      };

      if (oEvent.type == "mouseout") {
        oEvent.relatedTarget = oEvent.toElement;
      } else if (oEvent.type == "mouseover") {
        oEvent.relatedTarget = oEvent.fromElement;
      }

      oEvent.stopPropagation = function () {
        this.cancelBubble = true;
      };

      oEvent.target = oEvent.srcElement;
      oEvent.time = (new Date).getTime();
    }
    return oEvent;
  },


}
/**
 * 常用正则表达式，如：手机、邮箱、密码等
 */
const pattern = {
  //mobile:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
  mobile: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  tel: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/,//区号+座机号码+分机号码
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  captcha: /^[a-z0-9]{4}$/i,
  password: /^[a-z0-9_]{6,20}$/i,
  //serialNo: /^9[0-9]{11}$/i,
  serialNo: /^(9895)[6|7][0-9]{7}$/i,
  unescapeHtmlChar: /&amp;|&lt;|&gt;|&quot;|&#39;|&#96;/

}

window.onload = screenResize;
window.onresize = screenResize;
function screenResize () {
  var deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 1280) {
    deviceWidth = 1280;
  } else if (deviceWidth < 320) {
    deviceWidth = 320;
  }
  document.documentElement.style.fontSize = deviceWidth / 12.8 + 'px';
}
/**
 * 格式化日期字符串
 * format：日期格式，如："yyyy-MM-dd hh:mm:ss"
 */
Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};

/*window.addEventListener("beforeunload", function(event) {
    event.returnValue = "我在这写点东西...";
    CookieUtil.unset("userId", "/", location.hostname);
    CookieUtil.unset("token", "/", location.hostname);    
});*/


/**
 * 截取固定长度字符串
 * 使用例子：new Array.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param str 原始字符串
 * @param maxlen 截取的长度
 * @param dot 多余字符串表示字符
 */
function mb_cutstr (str, maxlen, dot) {
  var len = 0;
  var ret = '';
  var dot = !dot ? '...' : dot;
  maxlen = maxlen - dot.length;
  for (var i = 0; i < str.length; i++) {
    len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? 3 : 1;
    if (len > maxlen) {
      ret += dot;
      break;
    }
    ret += str.substr(i, 1);
  }
  return ret;
}

//压缩上传图片
function uploadImg (e) {
  var file = e.target.files[0];//event.currentTarget.files[0]
  if (!isCanvasSupported) {
    //直接上传
    upload(file, file.type);
  } else {
    if (typeof (FileReader) === 'undefined') {
      // console.log("当前浏览器内核不支持base64图标压缩");
      //调用上传方式  不压缩 
      upload(file, file.type);
    } else {
      compressAndUpload(file);
    }
  }
}

//判断是否存在画布  
function isCanvasSupported () {
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}
function compressAndUpload (file) {
  try {
    if (!/image\/\w+/.test(file.type)) {
      alert("请确保文件为图像类型");
      return false;
    }
    var maxsize = 100 * 1024;
    var reader = new FileReader();
    //获取图片大小
    var size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
    reader.onload = function () {
      var result = this.result;
      var img = new Image();
      img.src = result;
      //如果图片大小小于100kb，则直接上传
      if (result.length <= maxsize) {
        img = null;
        upload(result, file.type, file.name);
        return;
      }
      //图片加载完毕之后进行压缩，然后上传
      img.onload = function () {
        var data = compress(img);
        img = null;
        //callBackFun(data,file.type,file.name)
        upload(data, file.type, file.name);
      };
    }
    reader.readAsDataURL(file);
  } catch (e) {
    //直接上传
    upload(file, file.type, file.name);
  }

}
//使用canvas对大图片进行压缩
function compress (img) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');
  //瓦片canvas
  var tCanvas = document.createElement("canvas");
  var tctx = tCanvas.getContext("2d");

  var initSize = img.src.length;
  var width = img.width;
  var height = img.height;
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  var ratio;
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  tctx.clearRect(0, 0, canvas.width, canvas.height);
  //铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //如果图片像素大于100万则使用瓦片绘制
  var count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //计算每块瓦片的宽和高
    var nw = ~~(width / count);
    var nh = ~~(height / count);

    tCanvas.width = nw;
    tCanvas.height = nh;
    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  //进行最小压缩
  var ndata = canvas.toDataURL('image/jpeg', 0.7);//数值越小压缩越厉害
  //console.log('压缩前：' + initSize);
  //console.log('压缩后：' + ndata.length);
  //console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
}
function upload (basestr, type, filename) {
  var text = window.atob(basestr.split(",")[1]);
  var buffer = new Uint8Array(text.length);
  var pecent = 0, loop = null;
  for (var i = 0; i < text.length; i++) {
    buffer[i] = text.charCodeAt(i);
  }
  var blob = getBlob([buffer], type);
  var xhr = new XMLHttpRequest();
  var formData = getFormData(filename);
  formData.append('type', 1);
  formData.append('file', blob);
  xhr.open('post', `/glfile/?action=sharefile_service.upload_file`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert("图片上传成功");
        var data = JSON.parse(xhr.responseText);

      } else {
        alert("图片上传失败：" + xhr.status);
        return false;
      }
    }
    return false;
  };
  //数据发送进度，前50%展示该进度
  xhr.upload.addEventListener('progress', function (e) {

  }, false);
  xhr.send(formData);
}
/**
* 获取blob对象的兼容性写法
* @param buffer
* @param format
* @returns {*}
*/
function getBlob (buffer, format) {
  try {
    return new Blob(buffer, { type: format });
  } catch (e) {
    var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
    buffer.forEach(function (buf) {
      bb.append(buf);
    });
    return bb.getBlob(format);
  }
}
//获取formdata              
function getFormData (filename) {
  return new FormDataShim(filename)
}
/**
  * formdata 补丁, 给不支持formdata上传blob的android机打补丁
  * @constructor
  */
function FormDataShim (filename) {
  var o = this,
    parts = [],
    boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
    oldSend = XMLHttpRequest.prototype.send;
  this.append = function (name, value) {
    parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
    if (value instanceof Blob) {
      parts.push('; filename="' + (filename || 'blob.jpg') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
      parts.push(value);
    }
    else {
      parts.push('\r\n\r\n' + value);
    }
    parts.push('\r\n');
  };
  // Override XHR send()
  XMLHttpRequest.prototype.send = function (val) {
    var fr,
      data,
      oXHR = this;
    if (val === o) {
      // Append the final boundary string
      parts.push('--' + boundary + '--\r\n');
      // Create the blob
      data = getBlob(parts);
      // Set up and read the blob into an array to be sent
      fr = new FileReader();
      fr.onload = function () {
        oldSend.call(oXHR, fr.result);
      };
      fr.onerror = function (err) {
        throw err;
      };
      fr.readAsArrayBuffer(data);
      // Set the multipart content type and boudary
      this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
      XMLHttpRequest.prototype.send = oldSend;
    }
    else {
      oldSend.call(this, val);
    }
  };
}

/**
 *深度合并对象
 */
function deepObjectMerge (FirstOBJ, SecondOBJ) {
  for (var key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]"
      ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
      : FirstOBJ[key] = SecondOBJ[key];
  }
  return FirstOBJ;
}
/**
 *检测是否为数组
 */
function isArray (value) {
  return Object.prototype.toString.call(value) == "[object Array]"
}
/**
 *检测是否为数组
 */
function isFunction (value) {
  return Object.prototype.toString.call(value) == "[object Function]"
}
/**
 *检测是否为数组
 */
function isObject (value) {
  return Object.prototype.toString.call(value) == "[object Object]"
}

/**
 * 判断是否为安卓系统
 */
function isAndroid () {
  var ua = navigator.userAgent;
  return /Android (\d+\.\d+)/.test(ua)
}
/**
 * 判断是否在微信浏览器中打开
 */
function isWeiXin () {
  //var ua = navigator.userAgent; 
  var us = navigator.userAgent.toLowerCase();
  if (us.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
/**
 *Object.values()的Polyfill
 */
if (!Object.values) Object.values = function (obj) {
  if (obj !== Object(obj))
    throw new TypeError('Object.values called on a non-object');
  var val = [], key;
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      val.push(obj[key]);
    }
  }
  return val;
}

//修复IOS12+的微信内置浏览器bug：flex、fixed定位的input，select、textarea输入元素，软键盘或下拉选择框收起后，页面没回滚
function scrollIntoTop () {
  if (sessionStorage.appVersion) {
    document.body.scrollTop = document.body.scrollHeight;//键盘收齐页面空白问题 
  }

}


var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
  reHasEscapedHtml = RegExp(reEscapedHtml.source),
  reUnescapedHtml = /[&<>"'`]/g;
var htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#96;': '`'
};
function baseToString (value) {
  return value == null ? '' : (value + '');
}
function unescapeHtmlChar (chr) {
  return htmlUnescapes[chr];
}

function _unescape (string) {
  string = baseToString(string);
  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, unescapeHtmlChar)
    : string;
}

/**
 * 选择语言
 */

function chooseLang () {
  switch (navigator.language.split('-')[0]) {
    case 'en':
      return 'en_US';
      break;
    case 'zh':
      return 'zh_CN';
      break;
    default:
      return 'en_US';
      break;
  }
}
/**
  * 获取任务状态信息
  */
function transformStatus (val) {
  let status = ''
  let statusId = ''
  switch (parseInt(val)) {
    case 1:
      status = '未开始';
      statusId = 'notStarted';
      break;
    case 2:
      status = '进行中';
      statusId = 'inProcess';
      break;
    case 3:
      status = '已失效';
      statusId = 'failed';
      break;
    case 4:
      status = '已完成';
      statusId = 'completed';
      break;
    case 5:
      status = '已超时';
      statusId = 'timedOut';
      break;
    case 6:
      status = '放弃';
      statusId = 'giveUp';
      break;
    default:
      status = 'Error'
      statusId = 'Error';
  }
  return statusId

}
/**
  * 转换剩余时间
  * createdTime:创建时间；period：周期，单位天
  */

function transformTime (createdTime, period = 7) {//未开始订单周期为7天。进行中接单周期为2天
  period = period * 24 * 60 * 60 * 1000;
  let d = new Date(),
    now = d.getTime(),//本地GMT时间
    timezoneOffset = d.getTimezoneOffset(),//本地时间与UTC时间相差的分钟数
    utc = now + timezoneOffset * 60000,//转化为零时区时间
    createdTimestamp = new Date(createdTime).getTime(),
    remainingTime = (createdTimestamp + period - utc) / 1000,
    day = 0,
    hour = 0,
    time = {};

  if (remainingTime > 0) {
    day = Math.floor(remainingTime / (24 * 60 * 60));
    hour = Math.floor(remainingTime / (60 * 60)) - (day * 24);
  }
  if (day > 0) {
    time.day = day
  }
  if (hour > 0) {
    time.hour = hour
  }

  return time
  //<span>剩<span className="red">{day}</span>天<span className="red">{hour}</span>小时</span>


}

function getProductByLang (type, data, name) {
  var _item = null;
  switch (type) {
    case 'en':
      _item = data['productListEn_US'];
      break;
    case 'zh':
      _item = data['productListZh_CN'];
      break;
    default:
      _item = data['productListEn_US'];
  }
  return _item;
}

function getInitDataByLang (type, data, name) {
  var _item = null;
  switch (type) {
    case 'en':
      _item = data[name + 'En_US'];
      break;
    case 'zh':
      _item = data[name + 'Zh_CN'];
      break;
    default:
      _item = data[name + 'En_US'];
  }
  return _item;
}


function encodeTC (clearString) {
  var output = '';
  var x = 0;

  clearString = utf16to8(clearString.toString());
  var regex = /(^[a-zA-Z0-9-_.]*)/;

  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
      output += match[1];
      x += match[1].length;
    }
    else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
      }
      x++;
    }
  }

  function utf16to8 (str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      }
      else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
      else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  }

  return output;
};

// public method for url decoding
function decodeTC (encodedString) {
  var output = encodedString;
  var binVal, thisString;
  var myregexp = /(%[^%]{2})/;
  function utf8to16 (str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
      c = str.charCodeAt(i++);
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          out += str.charAt(i - 1);
          break;
        case 12: case 13:
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }
    return out;
  }
  while ((match = myregexp.exec(output)) != null
    && match.length > 1
    && match[1] != '') {
    binVal = parseInt(match[1].substr(1), 16);
    thisString = String.fromCharCode(binVal);
    output = output.replace(match[1], thisString);
  }

  //output = utf8to16(output);
  output = output.replace(/\\+/g, " ");
  output = utf8to16(output);
  return output;
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime (number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

function dateFormat (fmt, date) {
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

function isURL (domain) {
  var name = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;
  if (!(name.test(domain))) {
    return false;
  }
  else {
    return true;
  }
}


//数据转化  
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 判断是移动或PC 端
function browserRedirect () {
  var _isPc = true;
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
    _isPc = true;
  } else {
    _isPc = false;
  }
  return _isPc;
}

function getIsLogin () {
  var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
  let _islo = false;
  _getSeuserInfo && (_islo = true)
  return _islo;
}

function getHeadersAuthorization () {
  let _headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
  return _headers;
}

//转换url
function tcReplaceUrl (text) {
  if (!text) return;
  // var re = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
  var re = /(https?:\/\/|ftps?:\/\/)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:[0-9]+)?|(localhost)(:[0-9]+)?|([\w]+\.)(\S+)(\w{2,4})(:[0-9]+)?)(\/?([\w#!:.?+=&%@!\-\/]+))?/ig;
  var s = text.replace(re, function (a) {
    return '<a href="' + a + '" target="_blank" >View links</a>';
  });
  return s;
}


export {
  request as default,
  requestToken,
  transformParas,
  md5,
  getSign,
  get_session_cache,
  set_session_cache,
  remove_session_cache,
  get_local_cache,
  set_local_cache,
  remove_local_cache,
  CookieUtil,
  pattern,
  EventUtil,
  objKeySort,
  getQueryStringArgs,
  sortBy,
  uploadImg,
  getBlob,
  getFormData,
  isCanvasSupported,
  compress,
  deepObjectMerge,
  isArray,
  isFunction,
  isObject,
  isAndroid,
  isWeiXin,
  scrollIntoTop,
  _unescape,
  chooseLang,
  transformStatus,
  transformTime,
  getProductByLang,
  getInitDataByLang,
  encodeTC,
  decodeTC,
  formatTime,
  dateFormat,
  isURL,
  browserRedirect,
  getIsLogin,
  getHeadersAuthorization,
  _requestWebUrlOrBtnClick,
  tcReplaceUrl
}

