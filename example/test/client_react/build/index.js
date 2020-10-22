const { dev, build, constants } = require("./script");
const { figletText, resolve, getArg } = require("./shared");
const package = require("../package.json");
const nameAndVersion = `${package.name} V${package.version}`;

figletText({ text: nameAndVersion });
const { ENV } = constants

switch (getArg(ENV)) {
    case "dev":
        dev();
        return;
    default:
        build({ nameAndVersion });
        return;
}
