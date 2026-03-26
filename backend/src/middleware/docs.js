const express = require("express");
const path = require("path");

// applies a bunch of middleware

/**
 * Statically serves all documentation endpoints
 * @param {Express} server
 */
const serveDocs = (server) => {
    const overviewReadmePath = path.join(__dirname, "../../../README.md");

    server.use("/api/docs/overview", express.static(overviewReadmePath));



    // mount the readme at the top level
    const cliReadmePath = path.join(__dirname, "../../../../oseda-cli/README.md");
    server.use("/api/docs/cli/", express.static(cliReadmePath))

    const cliUsagePath = path.join(__dirname, "../../../../oseda-cli/Usage.md");
    server.use("/api/docs/cli/usage", express.static(cliUsagePath))

    
    const courseContributing = path.join(__dirname, "../../../docs/COURSE_CONTRIBUTING.md");
    server.use("/api/docs/contributing/getting-started", express.static(courseContributing))

    const codeOfConduct = path.join(__dirname, "../../../docs/CODE_OF_CONDUCT.MD");
    server.use("/api/docs/contributing/guidelines", express.static(codeOfConduct));

    const frontendReadme = path.join(__dirname, "../../../frontend/README.md");
    server.use("/api/docs/core/frontend", express.static(frontendReadme));

    const backendReadme = path.join(__dirname, "../../../backend/README.md");
    server.use("/api/docs/core/backend", express.static(backendReadme));

    const coreReadme = path.join(__dirname, "../../../README.md");
    server.use("/api/docs/core/readme", express.static(coreReadme));

    const libReadme = path.join(__dirname, "../../../../oseda-lib/README.md");
    server.use("/api/docs/lib", express.static(libReadme));



}


module.exports = {
    serveDocs
}