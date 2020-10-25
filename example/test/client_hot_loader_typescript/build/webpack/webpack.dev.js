/**
 * @file 本地开发环境下的 node 脚本，这种方式是通过命令行传参数
 * @author jamesjianpeng
 */
const config = require("./webpack.base");
const { merge } = require("webpack-merge");
const { resolve } = require("../shared");
module.exports = merge(config, {
    mode: "development",
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    module: {
        rules: [],
    },
    devtool: "eval-source-map",
    plugins: [],
    devServer: {
        contentBase: resolve("dist"), // 使用相对于 dev.conf 配置的绝对路径
        hot: true,
        host: "127.0.0.1",
        open: true,
        port: 3501,
        // quiet: true, // 隐藏服务器控制台的信息输出
        clientLogLevel: "error", // @link {https://webpack.docschina.org/configuration/dev-server/#devserverclientloglevel} 浏览器端的日志输出级别
        /**
         *  historyApiFallback: {},
         */
        overlay: true, // 在浏览器端展示错误
    },
});
