const fs = require("fs");
const path = require("path");
const { getCourseConfig } = require("./config");
const { parseTags, filterFromTags } = require("./tags");

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


const paginateDirs = async ({ root, start, limit, filter }) => {
    let index = 0
    const result = []

    const dir = await fs.promises.opendir(root)

    for await (const dirent of dir) {
        if (!dirent.isDirectory()) continue
        // atm only using this for authors
        // OOO but also tags?
        if (!filter(dirent.name)) continue

        if (index >= start && result.length < limit) {
            result.push(dirent.name)
        }

        index++
        if (result.length === limit) break
    }

    return result
}


const serveCourses = (COURSES_ROOT) => {
    return async (req, res) => {
        const start = Number(req.query.start ?? 0)
        const limit = Number(req.query.limit ?? 9)
        
        console.log(`Pre parse: ${req.query.tag}`)

        const requestedTags = parseTags(req.query.tag);

        console.log(`Post parse: ${requestedTags}`)

        const courseFilter = filterFromTags(requestedTags, COURSES_ROOT);
        
        try {
            const courses = await paginateDirs({
                root: COURSES_ROOT,
                start,
                limit,
                filter: courseFilter
            })

            res.json(courses)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Failed to load courses" })
        }
    }
}



module.exports = {
    serveCourseDir,
    serveAllCourses: serveCourses,
    paginateDirs
}
