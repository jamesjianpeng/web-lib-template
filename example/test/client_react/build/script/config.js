
const path = require('path')
const { getArg, resolve, warningText } = require("../shared");
const { CONFIG, ENV } = require("./const");

const getBusinessConfig = () => {
  const configPath = getArg(CONFIG)
  if (!configPath) {
    return 
  }
  if (configPath.lastIndexOf('./') !== 0) {
    warningText('配置文件只支持 .json 文件')
    process.exit(1)
  }
  if (configPath.indexOf('./') !== 0) {
    warningText('配置文件只支持相对路径！')
    process.exit(1)
  }
  const fullPath = resolve(configPath)
  const envConfig = require(fullPath)
  console.log(envConfig)
  return envConfig
}

const getEnvConfig = () => ({
  CONFIG: getArg(CONFIG, ENV), 
  ENV: getArg(ENV)
})

module.exports = {
  getBusinessConfig,
  getEnvConfig
}