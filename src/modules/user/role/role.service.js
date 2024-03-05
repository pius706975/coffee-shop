const { Role } = require('../../../db/models');
const { NotFoundError } = require('../../../utils/api.errors');

const RoleService = {};

RoleService.CreateRole = async (data) => {
    const newRole = await Role.create(data);
    return newRole;
};

RoleService.UpdateRole = async (id, data) => {
    const role = await Role.findByPk(id);
    if (!role) throw new NotFoundError('Role not found');

    const updatedRole = await Role.update(data);
    return updatedRole;
};

RoleService.DeleteRole = async (id) => {
    const role = await Role.findByPk(id);
    if (!role) throw new NotFoundError('Role not found');

    await Role.destroy();
};

module.exports = RoleService;
