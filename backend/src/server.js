const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const hosts = require("./hosts");
const courses = require("./courses");

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

/**
 * Description
 * @param {string} mode
 * @param {number} port
 * @returns {}
 */
const buildOsedaExpressServer = (COURSES_ROOT) => {
    const server = express();

    server.use(express.static(path.join(__dirname, "../../frontend/build")));

    server.use(cors());

    /*
      serve course dist dynamically:
      requests to /api/courses/:courseName/* will try to serve files from
      <COURSES_ROOT>/<courseName>/dist/<requested path>
    */
    server.use("/api/courses/:courseName", courses.serveCourseDir(COURSES_ROOT));

    // list all courses
    // need to add author support eventually as well here
    server.get("/api/courses", (req, res) => {
        try {
            const projects = fs
                .readdirSync(COURSES_ROOT)
                .filter((name) =>
                    fs.statSync(path.join(COURSES_ROOT, name)).isDirectory()
                );
            res.json(projects);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to load courses" });
        }
    });

    // load oseda-config.json for a particular course via query params
    server.get("/api/info", (req, res) => {
        const title = req.query.title;
        if (!title) return res.status(400).json({ error: "No title provided" });

        const configPath = path.join(COURSES_ROOT, title, "oseda-config.json");

        if (!fs.existsSync(configPath)) {
            return res.status(404).json({ error: "Course not found" });
        }

        try {
            const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            res.json(config);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to read config" });
        }
    });


    // catch-all for frontend routes (anything not /api/)
    // technically, is just a reroute for everything.
    // works fine without it, but a link directly to a course breaks
    server.get(/^\/(?!api\/).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
    });

    return server;
};

const oseda = buildOsedaExpressServer(COURSES_ROOT);

oseda.listen(PORT, HOST, () => {
    console.log(`Backend listening on http://${HOST}:${PORT}`);
    console.log(`COURSES_ROOT=${COURSES_ROOT}`);
});
