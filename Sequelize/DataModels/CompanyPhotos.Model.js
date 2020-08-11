module.exports = function (instance, Sequelize) {
    return instance.define('CompanyPhotos', {
        CompanyPhotoId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        CompanyPhotoKeyword: {
            type: Sequelize.STRING(125),
            allowNull: false
        },
        CompanyPhotoUrl: {
            type: Sequelize.STRING(125),
            allowNull: false
        },
        CompanyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Companies',
                },
                key: 'CompanyId'
            }
        }
    });
};
