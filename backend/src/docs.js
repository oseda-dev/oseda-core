const express = require("express");
const path = require("path");


/**
 * Statically serves all documentation
 * @param {Express} server
 */
const serveDocs = (server) => {
    const docsPath = path.join(__dirname, "../../docs/");
    
    server.use("/api/docs", express.static(docsPath));
    // serve other weird stuff we need to here

}


module.exports = {
    serveDocs
}