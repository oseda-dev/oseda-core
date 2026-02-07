const { paginateDirs } = require("./courses");
const { getCourseConfig } = require("./config");
const { parseTags, filterFromTags } = require("./tags");


const serveCoursesFromAuthor = (COURSES_ROOT) => {
    return async (req, res) => {
        const start = Number(req.query.start ?? 0)
        const limit = Number(req.query.limit ?? 9)
        const requestedAuthor = req.params.author

        // if we get a lot of courses,
        // we need to look this up in a redis cache or something first
        // moving this to a separate file so we can do this easier if needed one day

        const requestedTags = parseTags(req.query.tag);

        const tagCourseFilter = filterFromTags(requestedTags, COURSES_ROOT);

        try {
            const courses = await paginateDirs({
                root: COURSES_ROOT,
                start,
                limit,
                filter: (courseName) => {
                    const config = getCourseConfig(courseName, COURSES_ROOT)
                    return config.author === requestedAuthor && tagCourseFilter(courseName)
                }
            })

            res.json(courses)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Failed to load courses" })
        }
    }
}


const getAuthorAvatarURL = () => {
    return async (req, res) => {
        try {
            const requestedAuthor = req.params.author
            const authorUrl = `https://api.github.com/users/${requestedAuthor}`;

            const response = await fetch(authorUrl);
            const data = await response.json();

            res.json(data.avatar_url);

        }
        catch(err) {
            console.log(err)
            res.status(500).json({ error: "Failed to get author avatar" })
        }
    }
}


module.exports = {
    serveCoursesFromAuthor,
    getAuthorAvatarURL
}