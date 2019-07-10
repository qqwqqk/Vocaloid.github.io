const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode : 'production',
    output: {
        path: __dirname + "/dist",                    //打包后的文件存放的地方
        filename: "[name]-bundle-[chunkhash:8].js" 
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use:[
                    miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name]-bundle-[contenthash:8].[ext]',
                    outputPath: 'images/'
                   }
            },
        ]
    },
    /*
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                  warnings: false,
                  parse: {},
                  compress: {},
                  mangle: true,
                  output: null,
                  toplevel: false,
                  nameCache: null,
                  ie8: false,
                  keep_fnames: false,
                },
              }),
        ],
    },
    */
    plugins: [
        new miniCssExtractPlugin({
            filename:'[name].bundle.[contenthash:8].css'                            //根目录入口页面名称
        })
    ]
});