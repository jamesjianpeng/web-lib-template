const { resolve } = require("../shared");
const flexBugFixes = require('postcss-flexbugs-fixes')();
const autoprefixer = require('autoprefixer')({
  browsers: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9', // React doesn't support IE8 anyway
  ],
  flexbox: 'no-2009',
});
const getBabelLoader = () => {
    return {
      test: /\.(j|t)s(x)?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: [
            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            // 'react-hot-loader/babel',
            // 'react-refresh/babel'
          ],
        },
      },
    }
};
const getTsLoader = () => {
    return {
        test: /\.(ts|t)x$/,
        include: [resolve("src")],
        use: [
            {
                loader: "awesome-typescript-loader",
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
            "semicolon": false,
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
    loader: require.resolve('url-loader'),
    options: {
      limit: 1000 * 1000, // 小于 1M 的图片自动转变微 base64 内联在 img src 中
      name: 'static/media/[name].[hash:8].[ext]',
    },
  };
}

const getResolveCssLoaders = () => {
  return {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            // don't need now
            // ident: 'postcss',
            plugins: () => [
              flexBugFixes,
              autoprefixer
            ],
          }
        },
      }
    ],
  };
}

const webRules = [
  getBabelLoader(),
  getTsLoader(),
  getTsLinetLoader(tsLintConfig), getUrlLoader(), getResolveCssLoaders()];

module.exports = {
    webRules,
};
