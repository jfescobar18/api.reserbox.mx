const { Sequelize } = require("../database");

module.exports = function (instance, Sequelize) {
    return instance.define('CompanyRoles', {
        CompanyRoleId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        CompanyRoleName: {
            type: Sequelize.STRING(125),
            allowNull: false
        },
        CompanyRoleDescription: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    });
};
