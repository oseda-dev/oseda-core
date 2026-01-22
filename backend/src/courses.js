const fs = require("fs");
const path = require("path");

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


module.exports = {
    serveCourseDir
}