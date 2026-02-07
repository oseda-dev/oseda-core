const { getCourseConfig } = require("./config");


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

            // console.log(`requested tags: ${requestedTags}`);
            // console.log(`config tags: ${config.tags}`);

            return requestedTags.every(t => config.tags.includes(t));
        }
    }

    return courseFilter;

}

module.exports = {
    parseTags,
    filterFromTags
}