// const router = require('express').Router()
// const {makeValidatorCallback, makeExpressCallback} = require('../../../middlewares')

// // validator
// const roleValidator = require('./role.validator')

// // service
// const roleService = require('./role.service')

// // controller
// const roleController = require('./role.controller')

// // routes
// const routes = require('./role.routes')({
//     router,
//     roleController,
//     roleValidator,
//     makeValidatorCallback,
//     makeExpressCallback
// })

// module.exports = {
//     roleController,
//     roleService,
//     roleRoutes: routes
// }

const roleService = require('./role.service');
const roleRoutes = require('./role.routes');

module.exports = {
    roleService,
    roleRoutes
};
