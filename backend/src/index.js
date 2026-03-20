const express = require("express");
const cors = require("cors");
const path = require("path");
const hosts = require("./utils/hosts");
const server = require("./server/server");


const getMode = () => {
    const mode = process.argv[2];

    if (!mode) {
        console.error("You must pass a mode (dev or prod)");
        process.exit(1);
    }

    console.log("mode was: " + mode);

    if (mode !== "dev" && mode !== "prod"){
        console.error("You must pass a mode (dev or prod)");
        
        process.exit(1);
    }

    return mode;
}

const MODE = getMode();

/**
 * Root directory of the oseda course library
 * This should almost always be oseda-lib, set up like:
 *   /oseda
 *   |--oseda-core
 *   |--- oseda-dev
 */
const COURSES_ROOT = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "oseda-lib",
    MODE === "prod" ? "courses" : "courses-test"
);

const HOST = hosts.determineHost(MODE);
const PORT = 3001;

// oseda server
const oseda = server.buildOsedaExpressServer(COURSES_ROOT);

// listen for requests continually.
oseda.listen(PORT, HOST, () => {
    console.log(`Backend listening on http://${HOST}:${PORT}`);
    console.log(`COURSES_ROOT=${COURSES_ROOT}`);
});
