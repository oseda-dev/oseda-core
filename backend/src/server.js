const express = require("express");
const cors = require("cors");
const path = require("path");
const hosts = require("./hosts");
const courses = require("./courses");
const config = require("./config");
const docs = require("./docs");
const authors = require("./authors");

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

    docs.serveDocs(server)


    server.use(cors());

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

const oseda = buildOsedaExpressServer(COURSES_ROOT);

oseda.listen(PORT, HOST, () => {
    console.log(`Backend listening on http://${HOST}:${PORT}`);
    console.log(`COURSES_ROOT=${COURSES_ROOT}`);
});
