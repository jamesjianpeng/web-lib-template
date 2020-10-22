/**
 * @file 生产环境下的关键配置
 * @author jamesjianpeng
 */
const path = require("path");
const webConf = require("./webpack.web");
const { merge } = require("webpack-merge");
const { prdPlugins: plugins } = require("./plugins");

const prdConf = {
    mode: "production",
    plugins,
};

module.exports = merge(webConf, prdConf);
