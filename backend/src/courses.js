const fs = require("fs");
const path = require("path");
const { getCourseConfig } = require("./config");
const { parseTags, filterFromTags } = require("./tags");

/**
 *  Callback for serving a specific course from the library
 * @returns {function(Request, Response): Promise<void>}
 * a callback for express middleware
 */

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


/**
 * Paginates through a directory with a filter if needed
 * @param {Object} options - paginator config
 * @param {string} options.root - root directory path to paginator
 * @param {number} options.start - index to start pagination from (aka an offset)
 * @param {number} options.limit - max num of courses to return starting from the offset
 * @param {function(string): boolean} options.filter - a filter function (takes in a dir name) that will filter paginator options
 * @returns {Promise<string[]>} promise an array of directory names
 */
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

/**
 *  Provides a callback for Serving all courses 
 * @param {string} COURSES_ROOT 
 * @returns {function(Request, Response): Promise<void>}
 * a callback for express middleware
 */

const serveCourses = (COURSES_ROOT) => {
    return async (req, res) => {
        const start = Number(req.query.start ?? 0)
        const limit = Number(req.query.limit ?? 9)
        
        const requestedTags = parseTags(req.query.tag);

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
