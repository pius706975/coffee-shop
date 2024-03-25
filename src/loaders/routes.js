const { API_PREFIX } = require('config');
const { roleRoutes } = require('../modules/user/role/role.module');
const { authRoutes } = require('../modules/user/auth/auth.module');
const { userRoutes } = require('../modules/user/user.module');
const { categoryRoutes } = require('../modules/product/category/category.module');

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
        route: categoryRoutes
    }
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
