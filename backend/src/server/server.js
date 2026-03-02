const express = require("express");
const cors = require("cors");
const path = require("path");
const hosts = require("../utils/hosts");
const courses = require("../middleware/courses");
const config = require("../library/config");
const docs = require("../middleware/docs");
const authors = require("../utils/authors");
const cache = require("./cache");

/**
 * Builds the oseda server
 * This servers the frontend statically
 * This also serves each course directories output dynamically (static serve)
 * @param {string} mode
 * @param {number} port
 * @returns {Express} expressJS server
 */
const buildOsedaExpressServer = (COURSES_ROOT) => {
    const server = express();

    server.use(express.static(path.join(__dirname, "../../frontend/build")));

    docs.serveDocs(server)

    // global middleware
    server.use(cors());
    server.use("/api", cache.getCacher());
    

    /*
    serve course dist dynamically:
    requests to /api/courses/:courseName/* will try to serve files from
    <COURSES_ROOT>/<courseName>/dist/<requested path>
    */
    server.use("/api/courses/:courseName", courses.serveCourseDir(COURSES_ROOT));

    // list all courses
    // need to add author support eventually as well here
    server.get("/api/courses", courses.serveAllCourses(COURSES_ROOT));


    server.get("/api/author/:author", authors.serveCoursesFromAuthor(COURSES_ROOT));
    server.get("/api/author/:author/avatar", authors.getAuthorAvatarURL())

    // load oseda-config.json for a particular course via query params
    server.get("/api/info", (req, res) => {
        const title = req.query.title;
        // console.log("got here")

        try {
            const conf = config.getCourseConfig(title, COURSES_ROOT);
            res.json(conf);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || "Unknown error" });
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

module.exports = {
    buildOsedaExpressServer,
}