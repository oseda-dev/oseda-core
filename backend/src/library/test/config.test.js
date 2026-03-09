const config = require("../config");
const test_common = require("../../test-common");

const path = require('path');

test('empty course, should return error', () => {

    const input = "";

    expect(() => config.getCourseConfig(input, test_common.mock_course_root).toThrow('No title provided'))
})

test('invalid course name, should return error', () => {

    const input = "aaa";

    expect(() => config.getCourseConfig(input, test_common.mock_course_root).toThrow('Course not found'))
})

test('checking to make sure all paramters exist', () => {
    const input = "Algorithms101";
    const course_config = config.getCourseConfig(input, test_common.mock_course_root);
    expect(course_config).toHaveProperty("title");
    expect(course_config).toHaveProperty("author");
    expect(course_config).toHaveProperty("tags");
    expect(course_config).toHaveProperty("last_updated");
    expect(course_config).toHaveProperty("color");
    expect(course_config).toHaveProperty("description");

})

test('testing for bad config file, should return error', () => {
    const input = "";

    expect(() => config.parse_config(input).toThrow('Failed to read config'));
})

test('valid config path', () => {
    const input = path.join(
        __dirname,
        "sample-config.json"
    );

    expect(() => config.parse_config(input).toThrow('Failed to read config'));
})

test('valid config path', () => {
    const input = path.join(
        __dirname,
        "sample-config.json"
    );

    const sample_config = config.parse_config(input)
    expect(() => config.parse_config(input).not.toThrow());

    expect(sample_config.title).toEqual("title-here")
    expect(sample_config.author).toEqual("authorhere")
    expect(sample_config.tags).toEqual(["ComputerScience"])
    expect(sample_config.last_updated).toEqual("2025-07-08T23:35:13.890968259Z")
    expect(sample_config.color).toEqual("#4287f5")
    expect(sample_config.description).toEqual("description here")
})