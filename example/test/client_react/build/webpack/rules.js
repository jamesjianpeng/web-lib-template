const { resolve } = require("../shared");

const getTsLoader = () => {
    return {
        test: /\.(ts|t)x$/,
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

const webRules = [getTsLoader(), getTsLinetLoader(tsLintConfig)];

module.exports = {
    webRules,
};
