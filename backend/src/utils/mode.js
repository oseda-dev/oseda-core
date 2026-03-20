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
    const mode = process.argv[2];

    if (!mode) {
        console.error("You must pass a mode (dev or prod)");
        process.exit(1);
    }


    if (mode !== "dev" && mode !== "prod"){
        console.error("You must pass a mode (dev or prod)");
        
        process.exit(1);
    }

    return mode;
}

module.exports = {
    getMode,
    Modes,
}