/**
 * @file 本地开发环境下的 node 脚本，这种方式是通过命令行传参数
 * @author jamesjianpeng
 */
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, getArg } = require("../shared");
const { SCRIPT } = require("../constants");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = getArg(SCRIPT) === "dev";

const getUrlLoader = (isDev) => {
    return {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: isDev ? "url-loader" : `url-loader?limit=${1000 * 1000}&name=static/media/[name].[hash:8].[ext]`, // 小于 1M 的图片自动转变微 base64 内联在 img src 中
    };
    // 下面这种写法会有问题，如下
    //   ERROR in   Error: webpack-internal:///./node_modules/lodash/lodash.js:17155
    //    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module))  )//# sourceURL=[module]                                                                                                                                                                                                                                   ^
    //   TypeError: __webpack_require__(...) is not a function
    //
    // return {
    //     test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.jpg/, /.webp/],
    //     loader: require.resolve("url-loader"),
    //     options: isDev
    //         ? {}
    //         : {
    //               limit: 1000 * 1000, // 小于 1M 的图片自动转变微 base64 内联在 img src 中
    //               name: "static/media/[name].[hash:8].[ext]",
    //           },
    // };
};
const flexBugFixes = require("postcss-flexbugs-fixes")();
const getResolveCssLoaders = (isDev) => {
    const styleLoader = isDev ? { loader: "style-loader" } : { loader: MiniCssExtractPlugin.loader };
    const cssLoader = (opts = {}) => ({
        loader: "css-loader",
        options: Object.assign(
            {
                importLoaders: 1,
                modules: "global",
            },
            opts
        ),
    });
    const postcssLoader = {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                config: resolve("postcss.config.js"),
            },
        },
    };
    return [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [styleLoader, cssLoader({ modules: true }), postcssLoader, "sass-loader"],
        },
        {
            test: /\.module\.(sa|sc|c)ss$/,
            use: [styleLoader, cssLoader({ modules: true }), postcssLoader, "sass-loader"],
        },
    ];
};

module.exports = {
    mode: "development",
    entry: {
        main: resolve("src/index.tsx"),
    },
    output: {
        path: resolve("dist"),
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: ["awesome-typescript-loader"],
            },
            getUrlLoader(isDev),
            ...getResolveCssLoaders(isDev),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html",
        }),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin(),
    ],
};
