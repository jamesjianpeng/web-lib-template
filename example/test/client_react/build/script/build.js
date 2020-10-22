const rm = require("rimraf");
const path = require("path");
const webpack = require("webpack");
const { prdConf } = require('../webpack')
const { resolve } = require("../shared");

const package = require("../../package.json");

const build = ({ nameAndVersion }) => {
    webpack(prdConf, function (err, stats) {
        if (err) throw err;
        if (stats.hasErrors()) {
            console.log(stats, "has errors end");
        } else {
            console.log(`${nameAndVersion} build finish!`);
        }
        process.exit(0);
    });
};

module.exports = build
