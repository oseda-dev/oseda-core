/**
 * A typedefed enum for available modees
 * @typedef {Object} Modes
 * @property {string} dev development
 * @property {string} prod production
 * @readonly
 */
const Modes = Object.freeze({
    DEV: "dev",
    PROD: "prod",
});

/**
 * Determines server mode from process argv (via run.sh)
 * @param {string} givenMode the mode for the current process, should be process.argv[2]
 * @returns {Modes} mode for oseda server
 */
const getMode = (givenMode) => {

    if (!givenMode) throw new Error("You must pass a mode (dev or prod)");

    if (!Object.values(Modes).includes(givenMode)) throw new Error("You must pass a valid mode (dev or prod)");

    return givenMode;
}

module.exports = {
    getMode,
    Modes,
}