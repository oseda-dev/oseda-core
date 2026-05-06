const path = require("path");
const fs = require("fs");
const { config } = require("process");

// This is in the library package b/c it is meant for stuff that directly
// interacts with oseda-lib, but without an HTTP stuff
// We might change this going forward - Reese

/**
 * @typedef {Object} OsedaConfig
 * @property {string} title - title of the course or project
 * @property {string} author - name of the creator
 * @property {string} tags - array of category tags
 * @property {string} last_updated - datae config was most recently updated
 * @property {string} color - hex color code for course
 * @property {string} description - brief summary of the content.
 */



/**
 * 
 * @param {string} title title of course 
 * @param {string} COURSES_ROOT path to root of courses
 * @returns {OsedaConfig} config for course
 */
const getCourseConfig = (title, COURSES_ROOT) => {
    if (!title) throw { status: 400, message: "No title provided" };

    const configPath = path.join(COURSES_ROOT, title, "oseda-config.json");

    if (!fs.existsSync(configPath)) throw { status: 404, message: "Course not found" };

    return parse_config(configPath)

}

const parse_config = (configPath) => {
    try {
        return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } catch (err) {
        // console.error(err);
        console.log("error state reached");
        throw { status: 500, message: "Failed to read config" };
        // throw new Error("err");
    }
}

module.exports = {
    getCourseConfig,
    parse_config
}