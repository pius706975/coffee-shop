const { API_PREFIX } = require('config');
const roleRoutes = require('../modules/user/role/role.routes');
const authRoutes = require('../modules/user/auth/auth.routes');
const userRoutes = require('../modules/user/user.routes');
const categoryRoutes = require('../modules/product/category/category.routes');

const routes = [
    {
        path: '/role',
        route: roleRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/user',
        route: userRoutes,
    },
    {
        path: '/product-category',
        route: categoryRoutes,
    },
];

/**
 * @param {object} app - The express app object
 */
module.exports = (app) => {
    routes.forEach(({ path, route, excludeAPIPrefix }) => {
        const routePath = excludeAPIPrefix ? path : API_PREFIX + path;
        app.use(routePath, route);
    });
};
