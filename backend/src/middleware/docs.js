const express = require("express");
const path = require("path");

// Root paths
const PROJECT_ROOT = path.join(__dirname, "../../../..");

const PATHS = {
    core: path.join(PROJECT_ROOT, "oseda-course"),
    cli: path.join(PROJECT_ROOT, "oseda-cli"),
    lib: path.join(PROJECT_ROOT, "oseda-lib"),
};

// Route → file mapping
const DOC_ROUTES = {
    "/api/docs/overview": path.join(PATHS.core, "README.md"),

    "/api/docs/cli": path.join(PATHS.cli, "README.md"),
    "/api/docs/cli/usage": path.join(PATHS.cli, "Usage.md"),

    "/api/docs/contributing/getting-started": path.join(
        PATHS.core,
        "docs/COURSE_CONTRIBUTING.md"
    ),
    "/api/docs/contributing/guidelines": path.join(
        PATHS.core,
        "docs/CODE_OF_CONDUCT.MD"
    ),

    "/api/docs/core/frontend": path.join(
        PATHS.core,
        "frontend/README.md"
    ),
    "/api/docs/core/backend": path.join(
        PATHS.core,
        "backend/README.md"
    ),
    "/api/docs/core/readme": path.join(
        PATHS.core,
        "README.md"
    ),

    "/api/docs/lib": path.join(PATHS.lib, "README.md"),
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
