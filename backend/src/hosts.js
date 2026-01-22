const Hosts = Object.freeze({
    LOCAL: "localhost",
    ALL_NETWORK_INTERFACES: "0.0.0.0",
});

const determineHost = () => {
    const mode = process.argv[2];

    if (!mode) {
        console.error("You must pass a mode (dev or prod)");
        process.exit(1);
    }

    console.log(`Running backend server in mode=${mode}...`);

    if (mode === "prod") {
        return Hosts.ALL_NETWORK_INTERFACES;
    }

    return Hosts.LOCAL;
};


module.exports = {
    Hosts,
    determineHost
}