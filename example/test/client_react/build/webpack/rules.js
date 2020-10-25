const { resolve } = require("../shared");
const flexBugFixes = require("postcss-flexbugs-fixes")();
const autoprefixer = require("autoprefixer")({
    browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // React doesn't support IE8 anyway
    ],
    flexbox: "no-2009",
});
const getDevBabelAndTsLoader = () => {
    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: resolve("src"),
        use: [
            {
                loader: "babel-loader",
                options: { plugins: ["react-refresh/babel"] },
            },
            "ts-loader",
        ],
    };
};
const getTsLoader = () => {
    return {
        test: /\.tsx?$/,
        include: [resolve("src")],
        use: [
            {
                loader: "ts-loader",
            },
        ],
    };
};

const tsLintConfig = {
    configuration: {
        rules: {
            "no-console": false,
            "no-namespace": false,
            "no-empty-interface": false,
            semicolon: false,
            "no-var-keyword": true,
            "no-unused-variable": [
                true,
                {
                    "ignore-pattern": "^_",
                },
            ],
            "no-consecutive-blank-lines": [true, 1],
            "comment-format": [true, "check-space"],
            indent: [true, "space", 4],
            "no-eval": true,
            "no-internal-module": true,
        },
    },
    tsConfigFile: resolve("tsconfig.json"),
};

const getTsLinetLoader = (options) => {
    return {
        test: /\.(ts|t)x$/,
        enforce: "pre",
        use: [
            {
                loader: "tslint-loader",
                options,
            },
        ],
    };
};

const getUrlLoader = () => {
    return {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.jpg/, /.webp/],
        loader: require.resolve("url-loader"),
        options: {
            limit: 1000 * 1000, // 小于 1M 的图片自动转变微 base64 内联在 img src 中
            name: "static/media/[name].[hash:8].[ext]",
        },
    };
};

const getResolveCssLoaders = () => {
    return {
        test: /\.css$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    importLoaders: 1,
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        // don't need now
                        // ident: 'postcss',
                        plugins: () => [flexBugFixes, autoprefixer],
                    },
                },
            },
        ],
    };
};

const webRules = [getTsLinetLoader(tsLintConfig), getUrlLoader(), getResolveCssLoaders()];

const devRules = [getDevBabelAndTsLoader()];

const prdRules = [getTsLoader()];

module.exports = {
    webRules,
    devRules,
    prdRules,
};
