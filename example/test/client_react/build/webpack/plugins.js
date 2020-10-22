const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const webpack = require("webpack");
const { resolve } = require("../shared");
const script = require("../script");
const { PUBLIC_DIR_PREFIX, INDEX_TMEPLATE } = require("./const");

console.log('---')
console.log(script.config)
console.log('---8---')
const { getBusinessConfig } = script.config
console.log(getBusinessConfig())

const prettierConfig = {
    printWidth: 150,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    extensions: [".ts", ".tsx", ".js", ".json"],
};

const HtmlConfig = {
    filename: INDEX_TMEPLATE,
    template: resolve([PUBLIC_DIR_PREFIX, INDEX_TMEPLATE]),
};

const getHTMLWebpackPlugin = (opts) => new HtmlWebpackPlugin(opts);

const getHotModuleReplacementPlugin = () => new webpack.HotModuleReplacementPlugin();

const getCleanWebpackPlugin = () => new CleanWebpackPlugin();

const getPrettierPlugin = (opts) => new PrettierPlugin(opts);

const getWebapckDefinePlugin = (opts) => new webpack.DefinePlugin(opts);

const devPlugins = [getHotModuleReplacementPlugin(), getPrettierPlugin(prettierConfig)];
const prdPlugins = [getCleanWebpackPlugin()];
const webPlugins = [getHTMLWebpackPlugin(HtmlConfig), getWebapckDefinePlugin()];

module.exports = {
    devPlugins,
    prdPlugins,
    webPlugins,
};
