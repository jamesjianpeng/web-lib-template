/**
 * @file 生产环境下的关键配置
 * @author jamesjianpeng
 */
const path = require("path");
const webConf = require("./webpack.web");
const { merge } = require("webpack-merge");
const { prdPlugins: plugins } = require("./plugins");
const { prdRules: rules } = require("./rules");

const prdConf = {
    mode: "production",
    module: {
        rules,
    },
    plugins,
};

module.exports = merge(webConf, prdConf);
