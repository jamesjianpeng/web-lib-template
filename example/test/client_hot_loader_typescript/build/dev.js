const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const { figletText } = require("./shared");
const config = require("./webpack/webpack.dev");

const devScript = function ({ config, package }) {
    const nameAndVersion = `${package.name} V${package.version}`;
    figletText({ text: nameAndVersion });
    webpackDevServer.addDevServerEntrypoints(config, config.devServer);
    const compiler = webpack(config);
    new webpackDevServer(compiler, config.devServer).listen(config.devServer.port);
    console.log(`http://${config.devServer.host}:${config.devServer.port} \n`);
};

module.exports = {
    dev: ({ package }) => devScript({ config, package }),
};
