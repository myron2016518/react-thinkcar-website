var webpack = require("webpack");
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'

var deps = [
  'react/dist/react.min.js',
  'react-dom/dist/react-dom.min.js',
  //'jquery/dist/jquery.min.js',
];
var antdOptions = [
  {
    "libraryName": "antd",
    "libraryDirectory": "es",   // default: lib
    "style": true,//true:引用less，css使用css文件
  }
];

let OUTPUT_FOLDER = 'think_car'
let PUBLICPATH = `/${OUTPUT_FOLDER}/`

var config = {
  mode: 'development',// 定义模式：开发development or 生产production（默认）
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),

  },

  resolve: {//配置模块如何被解析
    alias: {},
    modules: [path.resolve(__dirname, "node_modules")]//告诉 webpack 解析模块时应该搜索的目录。
  },

  output: {
    path: path.resolve(__dirname, OUTPUT_FOLDER),
    // publicPath: '/',//生成的资源文件的公共路径，（相对于服务器根路径）
    publicPath: PUBLICPATH,//生成的资源文件的公共路径，（相对于服务器根路径）
    //filename: 'js/bundle.js?[chunkhash:8]',
    filename: 'js/[name].js?[hash:8]',
    chunkFilename: "js/[name].[hash:8].js"
  },
  devServer: {
    port: 8080, //默认端口8080
    //host: '172.16.65.51',
    open: true,
    historyApiFallback: {
      disableDotRule: true,
      index: `${PUBLICPATH}/index.html`,//点击浏览器刷新时，页面重定向到入口页面，注意加上out.puclicPath的值"/questionnaire/"

    },
    hot: true,
    inline: true,
    proxy: {//代理服务器，配合后端服务器调试时配置
      '/Api/Index': {
        target: 'http://tapi.mythinkcar.com/',//国内测试
        //target:'https://www.mythinkcar.com',//海外测试
        // target: 'https://www.mythinkcar.com',//海外正式
        secure: false,//若地址为https，需要设置为false
        changeOrigin: true,
        pathRewrite: {
          //'^/collectInfo':''
        }
      },
      '/api/v2': {
        target: 'http://ithinkcar.com/',//国内测试
        //target:'https://www.mythinkcar.com',//海外测试
        // target: 'https://www.mythinkcar.com',//海外正式
        secure: false,//若地址为https，需要设置为false
        changeOrigin: true,
        pathRewrite: {
          //'^/collectInfo':''
        }
      }

    }
  },
  module: {
    rules: [
      {//js、jsx
        test: /\.jsx?$/,
        exclude: /node_modules/,//排除node_modules中的库文件，加快编译速度
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react'],
          //"plugins": ["transform-runtime"]
          "plugins": [["import", antdOptions], "transform-runtime"]
        },

      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              modifyVars: {//修改antd主题	
                'primary-color': '#1C1F86',
                'font-size-base': '14px',
                'btn-height-base': '40px',
                'input-height-base': '40px'
              },
              javascriptEnabled: true,//修改主题时必须设置此值							
            },
          },
        ],
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          //'postcss-loader',
          'sass-loader',
          //'less-loader',
        ],
      },

      //url-loader:图片、字体图标加载器，是对file-loader的上层封装,支持base64编码。传入的size（也有的写limit) 参数是告诉它图片如果不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串。
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        use: [
          //'file-loader?limit=25000&name=[name].[ext]'
          'file-loader?name=fonts/[name].[ext]'
        ]
      },
      //url-loader:图片、字体图标加载器，是对file-loader的上层封装,支持base64编码。传入的size（也有的写limit) 参数是告诉它图片如果不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串。
      {
        test: /\.(gif|jpg|png|ico)\??.*$/,
        //use:['url-loader?limit=25000&name=img/[name].[ext]']//指定打包后的文件路径和名称
        use: ['file-loader?name=img/[name].[ext]']//指定打包后的文件路径和名称
      },

    ],
    //noParse:[pathToReact,pathToReactDOM]//阻止Webpack 去解析此数组中的压缩文件。注：下面有更优雅的写法
    noParse: []
  },
  plugins: [/*插件可以完成更多loader不能完成的任务*/
    new webpack.BannerPlugin("The file is created by yangmin.--" + new Date()),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css?[hash:8]',
      chunkFilename: 'css/[name].css?[hash:8]',
    }),

    /*插件：动态生成html，在webpack完成前端资源打包以后，自动将打包后的资源路径和版本号写入HTML中，达到自动化的效果。*/
    new HtmlWebpackPlugin({
      //favicon: 'src/img/favicon.ico', //favicon路径,通过webpack引入同时可以生成hash值
      filename: 'index.html',    //生成的html存放路径，相对于 path
      template: 'src/view/index.html',    //html模板路径
      inject: true,    //允许插件修改哪些内容，包括head与body
      chunks: ['vendor', 'index'],//加载指定模块中的文件，否则页面会加载所有文件
      hash: false,    //为静态资源生成hash值
      minify: {    //压缩HTML文件
        removeComments: false,    //移除HTML中的注释
        collapseWhitespace: false    //删除空白符与换行符
      }
    }),

    new WebpackMd5Hash(),

  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendor'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },

      }
    }
  }
};

/*当加载多个压缩文件时，下述方法更优雅简便*/
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules, dep);
  //path.dep是路径分隔符。
  config.resolve.alias[dep.split(path.dep)[0]] = depPath;
  config.module.noParse.push(depPath);

});

module.exports = config;

