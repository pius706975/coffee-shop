const { API_PREFIX } = require('config');

const routes = [];

/**
 * @param {object} app - The express app object
 */
module.exports = (app) => {
    routes.forEach(({ path, route, excludeAPIPrefix }) => {
        const routePath = excludeAPIPrefix ? path : API_PREFIX + path;
        app.use(routePath, route);
    });
};
