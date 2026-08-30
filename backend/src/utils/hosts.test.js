const { Hosts } = require("./hosts");

test('test with incorrect mode type, should return error'), () => {
    const input = "development";

    expect(() => Hosts.determineHost(input)).toThrow("Incorrect mode type");
}