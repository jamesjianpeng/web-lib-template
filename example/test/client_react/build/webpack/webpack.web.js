const { resolve } = require("../shared");
const { webPlugins: plugins } = require("./plugins");
const { webRules: rules } = require("./rules");

const webConf = {
    entry: {
        main: resolve("src/index.tsx"),
    },
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
};

module.exports = webConf;
