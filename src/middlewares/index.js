const badJsonHandler = require('./validate.json');
const notFoundHandler = require('./not.found.error');
const errorHandler = require('./error.handler');
const makeExpressCallback = require('./express.callback');
const makeValidatorCallback = require('./validator.callback');
const auth = require('./auth');
const authorize = require('./authorize');

module.exports = {
    badJsonHandler,
    notFoundHandler,
    errorHandler,
    makeExpressCallback,
    makeValidatorCallback,
    auth,
    authorize,
};
