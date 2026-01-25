const express = require("express");
const path = require("path");


/**
 * Statically serves all documentation
 * @param {Express} server
 */
const serveDocs = (server) => {
    const docsPath = path.join(__dirname, "../../docs/");

    server.use("/api/docs", express.static(docsPath));



    // mount the readme at the top level
    const cliReadmePath = path.join(__dirname, "../../../oseda-cli/README.md");
    server.use("/api/docs/cli/", express.static(cliReadmePath))

    const cliUsagePath = path.join(__dirname, "../../../oseda-cli/Usage.md");
    server.use("/api/docs/cli/usage", express.static(cliUsagePath))

    // serve other weird stuff we need to here

}


module.exports = {
    serveDocs
}