module.exports = function (instance, Sequelize) {
    return instance.define('CompaniesHasCompanyPhotos', {
        CompanyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'companies',
                },
                key: 'CompanyId'
            }
        },
        CompanyPhotoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'CompanyPhotos',
                },
                key: 'CompanyPhotoId'
            }
        }
    });
};
