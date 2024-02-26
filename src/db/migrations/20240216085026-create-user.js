/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Roles',
                    key: 'id',
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            otp_code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            otp_expiration: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            is_verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    },
};
