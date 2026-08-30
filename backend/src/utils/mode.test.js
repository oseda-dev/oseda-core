const mode = require("./mode");
const test_common = require("../test-common");

test('test without providing a mode', () => {
    // expect(() => something()).toThrow("You must pass a mode (dev or prod)");
    // const output = execSync('sh .../run.sh').toString();
    // expect(output).toContain("You must pass a mode (dev or prod)");
    expect(() => mode.getMode()).toThrow("You must pass a mode (dev or prod)");
})

test('test with giving it an invalid mode', () => {
    expect(() => mode.getMode("test")).toThrow("You must pass a valid mode (dev or prod)");
})

// expect(sample_config.title).toEqual("title-here")

test('test with giving it a valid mode', () => {
    // expect(() => mode.getMode("dev")).toThrow("You must pass a valid mode (dev or prod)");
    const newMode = "dev";

    expect(mode.getMode(newMode)).toEqual("dev");
})
