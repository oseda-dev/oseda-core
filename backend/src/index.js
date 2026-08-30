const express = require("express");
const cors = require("cors");
const path = require("path");
const hosts = require("./utils/hosts");
const server = require("./server/server");
const modes = require("./utils/mode");
const paths = require("./paths");


const MODE = modes.getMode(process.argv[2]);

/**
 * Root directory of the oseda course library
 * This should almost always be oseda-lib, set up like:
 *   /oseda
 *   |--oseda-core
 *   |--- oseda-dev
 */



const HOST = hosts.determineHost(MODE);
const PORT = 3001;

// oseda server
const oseda = server.buildOsedaExpressServer(paths.COURSES_ROOT);

// listen for requests continually.
oseda.listen(PORT, HOST, () => {
    console.log(`Backend listening on http://${HOST}:${PORT}`);
    console.log(`COURSES_ROOT=${paths.COURSES_ROOT}`);
});

