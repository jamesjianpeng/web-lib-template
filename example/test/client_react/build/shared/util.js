const path = require("path");
const clear = require("clear"); // 清空控制台
const chalk = require("chalk"); // 添加颜色
const figlet = require("figlet"); // 生成艺术字

const resolve = function (dir) {
    if (Array.isArray(dir)) {
        dir = dir.join("/");
    }
    return path.join(__dirname, "../../", dir);
};

const resolveBuild = function (dir) {
    return path.join(__dirname, "../", dir);
};

const join = function (dirs) {
    return path.join.apply(undefined, dirs);
};

const figletText = ({ text, clearState, color }) => {
    clearState = clearState || true;
    color = color || "green";
    clearState && clear();
    console.log(chalk[color](figlet.textSync(text, { horizontalLayout: "full" })));
};

const successText = (text) => {
  console.log(
    chalk.green(text)
  )
}

const warningText = (text) => {
  console.log(
    chalk.yellow(text)
  )
}

const blueText = (text) => {
  console.log(
    chalk.blue(text)
  )
}

const getArg = (str) => {
    const arg = Array.from(process.argv);
    const envIndex = arg.indexOf(str);
    const env = arg[envIndex + 1];
    return env;
};

module.exports = {
    resolve,
    resolveBuild,
    figletText,
    join,
    getArg,
    successText,
    warningText,
    blueText
};
