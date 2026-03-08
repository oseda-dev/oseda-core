const tags = require("./tags");


test('undefined tags should be empty array', () => {

  const input = undefined;

  const expected = [];

  expect(tags.parseTags(input)).toEqual(expected);
  // common to use .toBe instead of .toEqual
  // strict equality weirdness 
  // [] === [] -> false 
})

test('an array of tags should return that array', () => {
  const input = ["Economics", "Engineering", "Science"];

  const expected = ["Economics", "Engineering", "Science"];

  expect(tags.parseTags(input)).toEqual(expected);
})

test('a single string should return an array with just that string', () => {
  const input = "Science";

  const expected = ["Science"];

  expect(tags.parseTags(input)).toEqual(expected);
})


test('no tags should return true when filtering (which will show all courses)', () => {
  const path = require('path');

  const absolutePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "oseda-lib",
    "courses"
);

  const input = [];

  const filter = tags.filterFromTags(input, absolutePath);

  expect(filter()).toEqual(true);

})


test('testing for one tag, should return true', () => {
  const path = require('path');

  const absolutePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "oseda-lib",
    "courses"
);

  const input = ["Engineering"];

  const filter = tags.filterFromTags(input, absolutePath);

  expect(filter("Algorithms101")).toEqual(true);

})


test('testing for one tag, should return false', () => {
  const path = require('path');

  const absolutePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "oseda-lib",
    "courses"
);

  const input = ["Science"];

  const filter = tags.filterFromTags(input, absolutePath);

  expect(filter("Graphics")).toEqual(false);

})

test('testing for multiple tags, should return true', () => {
  const path = require('path');

  const absolutePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "oseda-lib",
    "courses"
);

  const input = ["Engineering", "Geography", "Economics"];

  const filter = tags.filterFromTags(input, absolutePath);

  expect(filter("TagTest")).toEqual(true);

})

test('testing for multiple tags, should return false', () => {
  const path = require('path');

  const absolutePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "oseda-lib",
    "courses"
);

  const input = ["Engineering", "Politics", "ComputerScience"];

  const filter = tags.filterFromTags(input, absolutePath);

  expect(filter("German-101")).toEqual(false);

})

test('testing for invalid course name, should return error message', () => {
  const path = require('path');

  const absolutePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "oseda-lib",
    "courses"
);

  const input = ["Engineering", "Politics", "ComputerScience"];

  const filter = tags.filterFromTags(input, absolutePath);

  expect(() => filter("aaa")).toThrow('Course not found');

})

test('testing for no course name provided, should return error message', () => {
  const path = require('path');

  const absolutePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "oseda-lib",
    "courses"
);

  const input = ["Engineering", "Politics", "ComputerScience"];

  const filter = tags.filterFromTags(input, absolutePath);

  expect(() => filter()).toThrow('No title provided');

})



// .toBe on primitives, same reference equality
// .toEqual	on arrays, objects, structs 
// .toStrictEqual if that fails lol