const path = require("path");
const fs = require("fs");

const getCourseConfig = (title) => {
    if (!title) throw { status: 400, message: "No title provided" };

    const configPath = path.join(COURSES_ROOT, title, "oseda-config.json");

    if (!fs.existsSync(configPath)) throw { status: 404, message: "Course not found" };

    try {
        return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } catch (err) {
        console.error(err);
        throw { status: 500, message: "Failed to read config" };
    }
}

module.exports = {
    getCourseConfig
}