const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const webpack = require("webpack");
const { resolve } = require("../shared");
const { getBusinessConfig } = require("../script/config");
const { PUBLIC_DIR_PREFIX, INDEX_TMEPLATE } = require("./const");

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

const getReactRefreshPlugin = () => new ReactRefreshPlugin();

const getPrettierPlugin = (opts) => new PrettierPlugin(opts);

const getWebapckDefinePlugin = (opts) => {
    const res = {};
    Object.keys(opts).map((key) => {
        res[key] = JSON.stringify(opts[key]);
    });
    return new webpack.DefinePlugin({ "process.env": res });
};

const devPlugins = [getHotModuleReplacementPlugin(), getPrettierPlugin(prettierConfig), getReactRefreshPlugin()];
const prdPlugins = [getCleanWebpackPlugin()];
const webPlugins = [getHTMLWebpackPlugin(HtmlConfig), new webpack.NamedModulesPlugin(), getWebapckDefinePlugin(getBusinessConfig())];

module.exports = {
    devPlugins,
    prdPlugins,
    webPlugins,
};
