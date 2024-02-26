/**
 * Normalize a port into a number, string, or false
 * @param {string} val - The port value to normalize
 * @returns {(number|string|false)}
 */

module.exports = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }

    return false;
};
