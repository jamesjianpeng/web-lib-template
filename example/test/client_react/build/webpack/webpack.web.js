const { resolve } = require("../shared");
const { webPlugins: plugins } = require("./plugins");
const { webRules: rules } = require("./rules");

const webConf = {
    entry: resolve("src/index.tsx"),
    output: {
        path: resolve("dist"),
    },
    module: {
        rules,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    plugins,
    devtool: "source-map",
};

module.exports = webConf;
