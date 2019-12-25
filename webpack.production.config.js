/*生成环境配置文件：不需要一些dev-tools,dev-server和jshint校验等。和开发有关的东西删掉*/
// console.log(process.env.NODE_ENV)
// console.log(process.env.NODE_ENV == 'production')
var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
//具体作用及缺点见plugins中的描述
var WebpackMd5Hash = require('webpack-md5-hash');
// 该插件是对“webpack-md5-hash”的改进：在主文件中获取到各异步模块的hash值，然后将这些hash值与主文件的代码内容一同作为计算hash的参数，这样就能保证主文件的hash值会跟随异步模块的修改而修改。
//var WebpackSplitHash = require('webpack-split-hash');
var ROOT_PATH = path.resolve(__dirname);
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var devMode = process.env.NODE_ENV == "production"

var deps = [
  'react/dist/react.min.js',
  'react-dom/dist/react-dom.min.js'
];
var antdOptions = [
  {
    "libraryName": "antd",
    "libraryDirectory": "es",   // default: lib
    "style": true
  }
];

let OUTPUT_FOLDER = ''

let PUBLICPATH = `/${OUTPUT_FOLDER}`
var config = {
  mode: 'production',// 定义模式：开发development or 生产production（默认）
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
  },
  resolve: {//配置模块如何被解析
    alias: {//每当 "react" 在代码中被引入，它会使用压缩后的 React JS 文件。注：下面有更优雅的写法
      //react: pathToReact, //alias:别名,
      //react-dom: pathToReactDOM
    },
    modules: [path.resolve(__dirname, "node_modules")]//告诉 webpack 解析模块时应该搜索的目录。
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_FOLDER),
    publicPath: PUBLICPATH,//生成的html里的引用路径用 publicPath
    // publicPath: './',
    //以文件内容的MD5生成Hash名称的script来防止缓存
    filename: 'js/[name].js?[hash:8]',
    //异步加载的模块是要以文件形式加载，生成的文件名是以chunkFilename配置的
    chunkFilename: 'js/[name].js?[hash:8]'
  },
  module: {
    rules: [
      {//js、jsx
        test: /\.js[x]?$/,
        exclude: /node_modules/,//排除node_modules中的库文件，加快编译速度
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react', 'env'],
          //"plugins": ["transform-runtime"]
          "plugins": [["import", antdOptions], "transform-runtime", "syntax-dynamic-import"]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          //'postcss-loader',
          'sass-loader',
        ],
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
        test: /\.(gif|jpg|png|jpeg)\??.*$/,
        use: ['file-loader?name=img/[name].[ext]']//指定打包后的文件路径和名称
      },

    ],
    //noParse:[pathToReact,pathToReactDOM]//阻止Webpack 去解析此数组中的压缩文件。注：下面有更优雅的写法
    noParse: []
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('5fa3b9'),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)//'"production"'
      }
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css?[hash:8]',
      chunkFilename: 'css/public-[id].css?[hash:8]',
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
    /*作用：生成具有独立hash值的css和js文件，即css和js文件hash值解耦.
     *缺点：webpack-md5-hash插件对chunk-hash钩子进行捕获并重新计算chunkhash，它的计算方法是只计算模块本身的当前内容（包括同步模块）。这种计算方式把异步模块的内容忽略掉了，会造成一个问题：异步模块的修改并未影响主文件的hash值。
     */
    new WebpackMd5Hash(),
    //new WebpackSplitHash()
    new CleanWebpackPlugin([OUTPUT_FOLDER], { // 删除文件
      root: ROOT_PATH,
      verbose: true,
      dry: false,
      //exclude: ["dist/1.chunk.js"]
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      // maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {//split `node_modules`目录下被打包的代码到 `page/vendor.js
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendor'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        common: {// ‘src/js’ 下的js文件
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/]components[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
          name: "common", //生成文件名，依据output规则
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        },
        /*styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
        }*/
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: {
            //mangle 通过设置except数组来防止指定变量被改变 (防止指定变量被混淆)
            reserved: ['$super', '$', 'exports', 'require']
          },
          output: {
            beautify: false,//true：代码美观，但文件较大。false：删除了空格和换行
            preamble: `/* The file is creted at ${new Date().toLocaleString()} */`//代码头部加入注释
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
          cache: false,
          parallel: true,
          sourceMap: false // set to true if you want JS source maps
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
/*当加载多个压缩文件时，下述方法更优雅简便*/
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules, dep);
  //path.dep是路径分隔符。
  config.resolve.alias[dep.split(path.dep)[0]] = depPath;
  config.module.noParse.push(depPath);

});

module.exports = config;


