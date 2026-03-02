const tags = require("./tags");


test('undefined tags should be empty array', () => {

  const input = undefined;

  const expected = [];

  expect(tags.parseTags(input)).toEqual(expected);
  // common to use .toBe instead of .toEqual
  // strict equality weirdness 
  // [] === [] -> false 
})