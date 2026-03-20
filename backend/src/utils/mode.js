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
 *  Determines server mode from process argv (via run.sh)
 * @returns {Modes} mode for oseda sever
 */
const getMode = () => {
    const givenMode = process.argv[2];

    if (!givenMode) {
        console.error("You must pass a mode (dev or prod)");
        process.exit(1);
    }


    if (!Object.values(Modes).includes(givenMode)) {
        console.error("You must pass a mode (dev or prod)");
        process.exit(1);
    }

    return givenMode;
}

module.exports = {
    getMode,
    Modes,
}