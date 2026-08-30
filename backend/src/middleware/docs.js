const express = require("express");
const path = require("path");

const { PROJECT_ROOT, REPOSITORIES } = require("../paths");


// route => file mapping
const DOC_ROUTES = {
    "/api/docs/overview": path.join(REPOSITORIES.core, "README.md"),

    "/api/docs/cli": path.join(REPOSITORIES.cli, "README.md"),
    "/api/docs/cli/usage": path.join(REPOSITORIES.cli, "Usage.md"),

    "/api/docs/contributing/getting-started": path.join(
        REPOSITORIES.core,
        "docs/COURSE_CONTRIBUTING.md"
    ),
    "/api/docs/contributing/guidelines": path.join(
        REPOSITORIES.core,
        "docs/CODE_OF_CONDUCT.MD"
    ),

    "/api/docs/core/frontend": path.join(
        REPOSITORIES.core,
        "frontend/README.md"
    ),
    "/api/docs/core/backend": path.join(
        REPOSITORIES.core,
        "backend/README.md"
    ),
    "/api/docs/core/readme": path.join(
        REPOSITORIES.core,
        "README.md"
    ),

    "/api/docs/lib": path.join(REPOSITORIES.lib, "README.md"),
};

/**
 * Registers all documentation routes
 * @param {Express} server
 */
const serveDocs = (server) => {
    Object.entries(DOC_ROUTES).forEach(([route, filePath]) => {
        server.get(route, (req, res) => {
            res.sendFile(filePath, (err) => {
                if (err) {
                    res.status(err.status || 500).send("Error loading document");
                }
            });
        });
    });
};

module.exports = {
    serveDocs,
};
