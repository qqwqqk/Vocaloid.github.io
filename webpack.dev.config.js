const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode : 'development',
    output: {
        path: __dirname + "/dist",                 //打包后的文件存放的地方
        filename: "[name]-test-[hash:8].js"       //打包后输出文件的文件名
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.css/,
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name]-test-[hash:8].[ext]',
                    outputPath: 'images/'
                   }
            },
        ]
    }
});