const fs = require("fs");
const path = require("path");

// Handles getting a SPECIFIC COURSE
const serveCourseDir = (COURSES_ROOT) => {

    return (req, res, next) => {
        const courseName = req.params.courseName;
        const distDir = path.join(COURSES_ROOT, courseName, "dist");

        if (!fs.existsSync(distDir) || !fs.statSync(distDir).isDirectory()) {
            return res.status(404).send("course not found");
        }

        // strip the prefix /api/courses/:courseName and serve the rest from dist
        const requestSubPath = req.path === "/" ? "/index.html" : req.path;
        const fullPath = path.join(distDir, requestSubPath);

        // if file exists, send it, otherwise fall back to index.html for SPA
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
            return res.sendFile(fullPath);
        } else {
            return res.sendFile(path.join(distDir, "index.html"));
        }
    }
};

// Serve ALL courses
// may want to paginate here
const serveAllCourses = (COURSES_ROOT) => {
    return async (req, res) => {
        const start = Number(req.query.start ?? 0);
        const limit = Number(req.query.limit ?? 9);

        let index = 0;
        const result = [];

        try {
            const dir = await fs.promises.opendir(COURSES_ROOT);

            for await (const dirent of dir) {
                if (!dirent.isDirectory()) {
                    index++;
                    continue;
                }

                if (index >= start && result.length < limit) {
                    result.push(dirent.name);
                }

                index++;

                if (result.length === limit) break;
            }

            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to load courses" });
        }
    };
};

module.exports = {
    serveCourseDir,
    serveAllCourses
}