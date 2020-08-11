module.exports = function (instance, Sequelize) {
    return instance.define('CompaniesHasSpaces', {
        CompanyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Companies',
                },
                key: 'CompanyId'
            }
        },
        SpaceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Spaces',
                },
                key: 'SpaceId'
            }
        }
    });
};
