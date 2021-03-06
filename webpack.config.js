const path             = require('path');
var webpack            = require('webpack');
var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin  = require("html-webpack-plugin");

//获取html-webpack-plugin 参数的方法
var getHtmlConfig = function(name){
  
  return{
        template   :`./src/view/${name}.html`,
        filename   :`view/${name}.html`,
        inject     : true,
        hash       : true,
        chunks     : ['common',`${name}`]
  }
}
//webpack config 

var config = {
  entry: {
  	common:['./src/page/common/index.js'],
  	index:['./src/page/index/index.js'],
  	login:['./src/page/login/index.js']
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  externals:{
    'jquery':'window.jQuery'
  },
 module: {
    loaders:  [
            {
            test: /\.css$/,
             loader:  ExtractTextPlugin.extract({
               use: 'css-loader',
               fallback: 'style-loader'
            })
           }
 	]
 },
  plugins:[
    //独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
    //css独立打包到文件css中
      new ExtractTextPlugin("css/[name].css"), 
      //html模块处理
      new  HtmlWebpackPlugin(getHtmlConfig('index')),
      new  HtmlWebpackPlugin(getHtmlConfig('login')),


  ]
};

module.exports = config;