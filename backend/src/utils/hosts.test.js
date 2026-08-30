const hosts = require("./hosts");

test('test with incorrect mode type, should return error', () => {
    const input = "development";

    expect(() => hosts.determineHost(input)).toThrow("Incorrect mode type");
})

test('test with dev, should return localhost', () => {
    const input = "dev";

    expect(hosts.determineHost(input)).toEqual('localhost');
})

test('test with prod, should return 0.0.0.0', () => {
    const input = "prod";

    expect(hosts.determineHost(input)).toEqual('0.0.0.0');
})