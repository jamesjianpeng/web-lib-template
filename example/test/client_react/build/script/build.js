const rm = require("rimraf");
const path = require("path");
const webpack = require("webpack");
const ora = require("ora");
const { prdConf } = require("../webpack");
const { resolve, successText } = require("../shared");

const package = require("../../package.json");
const build = ({ nameAndVersion }) => {
    const spinner = ora({
        color: "green",
        text: "正为生产环境打包 \n \n",
    });
    spinner.start();
    webpack(prdConf, function (err, stats) {
        if (err) throw err;
        if (stats.hasErrors()) {
            console.log(stats, "has errors end");
        } else {
            successText(`🚀  ${nameAndVersion} build finish! \n \n`);
        }
        process.exit(0);
    });
};

module.exports = build;
