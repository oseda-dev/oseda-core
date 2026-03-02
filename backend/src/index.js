const express = require("express");
const cors = require("cors");
const path = require("path");
const hosts = require("./utils/hosts");
const server = require("./server/server");
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
    "courses"
);

const HOST = hosts.determineHost();
const PORT = 3001;

// oseda server
const oseda = server.buildOsedaExpressServer(COURSES_ROOT);

// listen for requests continually.
oseda.listen(PORT, HOST, () => {
    console.log(`Backend listening on http://${HOST}:${PORT}`);
    console.log(`COURSES_ROOT=${COURSES_ROOT}`);
});
