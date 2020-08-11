module.exports = function (instance, Sequelize) {
    return instance.define('Companies', {
        CompanyId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        CompanyName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        CompanySlogan: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        CompanyLogo: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        CompanyBanner: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        CompanyRoleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'CompanyRoles',
                },
                key: 'CompanyRoleId'
            }
        },
        CompanyColorsJsonConfig: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        CompanyAddress: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        CompanyMapsPlaceId: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        CompanyPhone: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        CompanyDescription: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        CompanyNotes: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    });
};
