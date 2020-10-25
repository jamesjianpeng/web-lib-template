const webpack = require("webpack");
const ora = require("ora");
const { successText, figletText } = require("./shared");
const config = require("./webpack/webpack.prd");

const build = ({ config, package }) => {
    const nameAndVersion = `${package.name} V${package.version}`;
    figletText({ text: nameAndVersion });
    const spinner = ora({
        color: "green",
        text: "正为生产环境打包 \n \n",
    });
    spinner.start();
    webpack(config, function (err, stats) {
        if (err) throw err;
        if (stats.hasErrors()) {
            console.log(stats, "has errors end");
        } else {
            successText(`🚀  ${nameAndVersion} build finish! \n \n`);
        }
        process.exit(0);
    });
};

module.exports = {
    prd: ({ package }) => build({ config, package }),
};
