const path = require("path");
const { getArg, resolve, warningText } = require("../shared");
const { CONFIG, ENV } = require("./const");

const getBusinessConfig = () => {
    const configPath = getArg(CONFIG);
    if (!configPath) {
        return {};
    }
    if (!/.json$/.test(configPath)) {
        warningText("配置文件只支持 .json 文件");
        return {};
    }
    if (!/^.\//.test(configPath)) {
        warningText("配置文件只支持相对路径！");
        return {};
    }
    const fullPath = resolve(configPath);
    const envConfig = require(fullPath);
    return envConfig;
};

const getEnvConfig = () => ({
    CONFIG: getArg(CONFIG, ENV),
    ENV: getArg(ENV),
});

module.exports = {
    getBusinessConfig,
    getEnvConfig,
};
