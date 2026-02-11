const { getCourseConfig } = require("./config");

/**
 *  Parses raw request tags into array of consumable tag strings
 *  undefined => []
 *  string => [string]
 *  string[] => string[]
 * @param {string[] | string | undefined } tags 
 * @returns {string[]} parsed tags 
 */
const parseTags = (tags) => {
    if(tags == undefined){
        return [];
    }
    else if(Array.isArray(tags)){
        return tags;
    }
    else {
        return [tags]
    }
}

/**
 * Generate a a filter from requested tags
 * @param {string[]} requestedTags 
 * @param {string} COURSES_ROOT 
 * @returns {function(string): boolean}
 */
const filterFromTags = (requestedTags, COURSES_ROOT) => {
    let courseFilter;
    if (requestedTags.length == 0) {
        courseFilter = () => true;
    } else {
        courseFilter = (courseName) => {
            const config = getCourseConfig(courseName, COURSES_ROOT);

            return requestedTags.every(t => config.tags.includes(t));
        }
    }

    return courseFilter;

}

module.exports = {
    parseTags,
    filterFromTags
}