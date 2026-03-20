/**
 * A typedefed enum for available network hosrs
 * @typedef {Object} Hosts
 * @property {string} LOCAL the local host (dev)
 * @property {number} ALL_NETWORK_INTERFACES all interfaces (prod)
 * @readonly
 */
const Hosts = Object.freeze({
    LOCAL: "localhost",
    ALL_NETWORK_INTERFACES: "0.0.0.0",
});

/**
 * Determines the host based on process.argv[2]
 * Almost always via `run.sh [dev | prod]`
 * @param {String} mode ('dev' or 'prod')
 * @returns {this.Hosts} the host
 */
const determineHost = (mode) => {

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