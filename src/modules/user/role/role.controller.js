const RoleService = require("./role.service");
const helper = require('../../../utils/helper');
const notFoundError = require("../../../middlewares/not.found.error");
const RoleController = {}

RoleController.CreateRole = async (httpRequest)=>{
    const newRole = await RoleService.CreateRole(httpRequest.body)
    return helper.generateResponse(newRole)
}

RoleController.UpdateRole = async (httpRequest)=>{
    const id = httpRequest.params.id
    const updatedRole = await RoleService.UpdateRole(id, httpRequest.body)
    if (!updatedRole) throw new notFoundError('Role not found')

    return helper.generateResponse(updatedRole)
}

RoleController.DeleteRole = async (httpRequest)=>{
    const id = httpRequest.params.id
    const result = await RoleService.DeleteRole(id)
    return helper.generateResponse({
        message: 'Role has been deleted',
        result
    })
}

module.exports = RoleController