const htmlWebpackPlugin = require('html-webpack-plugin');   //引入HTML插件
const cleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除文件插件

module.exports = {
    entry:  {
        main : __dirname + "/src/script/index.tsx",
        error: __dirname + "/src/script/error.tsx"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: __dirname + "/src/index_tmp.html",
            favicon: "./src/image/usericon.ico",
            filename:'index.html',                            //根目录入口页面名称
            title: 'demo',
            inject: 'true',
            chunks: ['main']
        }),
        new htmlWebpackPlugin({
            template: __dirname + "/src/index_tmp.html",
            favicon: "./src/image/usericon.ico",
            filename:'error.html',                            //根目录入口页面名称
            title: 'error',
            inject: 'true',
            chunks: ['error']
        }),
        new cleanWebpackPlugin()
    ]
};