const { exec } = require("child_process");
const { resolve } = require("./shared");

const cmd =
    `${resolve("node_modules/.bin/prettier")}` +
    ` --config \"${resolve("build/prettier/.prettierrc.json")}\"` +
    ` --write \"${resolve("build/**/*.js")}\"` +
    ` --ignore-path \"${resolve("build/prettier/.prettierignore")}"`;

const prettierProcess = () =>
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });

module.exports = {
    prettier: () => prettierProcess(),
};
