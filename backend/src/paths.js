const path = require("path");
const modes = require("./utils/mode");

const MODE = modes.getMode();

const PROJECT_ROOT = path.join(__dirname, "..", "..", "..");

const REPOSITORIES = {
    core: path.join(PROJECT_ROOT, "oseda-core"),
    cli: path.join(PROJECT_ROOT, "oseda-cli"),
    lib: path.join(PROJECT_ROOT, "oseda-lib"),
};

const COURSES_ROOT = path.join(
    REPOSITORIES.lib,
    MODE === "prod" ? "courses" : "courses-test"
);

module.exports = {
    PROJECT_ROOT,
    REPOSITORIES,
    COURSES_ROOT,
}
