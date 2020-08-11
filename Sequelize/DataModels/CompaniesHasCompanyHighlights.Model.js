module.exports = function (instance, Sequelize) {
    return instance.define('CompaniesHasCompanyHighlights', {
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
        CompanyHighlightId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'CompanyHighlights',
                },
                key: 'CompanyHighlightId'
            }
        }
    });
};
