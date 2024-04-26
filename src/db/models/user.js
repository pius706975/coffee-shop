const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: 'role',
                as: 'roleData',
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'Role',
                    key: 'id',
                },
                defaultValue: '518236ed-45df-4b18-9cfa-ca83be57eafc',
            },
            otp_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            otp_expiration: {
                type: DataTypes.DATE,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            hooks: {
                // TODO: fix the default value of the role 
                beforeCreate: (user) => {
                    user.password = bcrypt.hashSync(user.password, 10);
                },
                // beforeUpdate: (user) => {
                //     user.password = bcrypt.hashSync(user.password, 10);
                // },
            },
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamp: true,
        }
    );
    return User;
};
