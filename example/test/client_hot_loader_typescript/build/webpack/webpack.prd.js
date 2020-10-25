const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const config = require("./webpack.base");
const { merge } = require("webpack-merge");

module.exports = merge(config, {
    mode: "production",
    module: {
        rules: [],
    },
    plugins: [new CleanWebpackPlugin()],
});
