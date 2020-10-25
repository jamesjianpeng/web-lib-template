const package = require("../package.json");
const { SCRIPT } = require("./constants");
const { getArg } = require("./shared");

const script = {
    dev: require("./dev").dev,
    prd: require("./prd").prd,
    prettier: require("./prettier").prettier,
};

switch (getArg(SCRIPT)) {
    case "prd":
        script.prd({ package });
        return;
    case "dev":
        script.dev({ package });
        return;
    case "prettier":
        script.prettier();
        return;
}
