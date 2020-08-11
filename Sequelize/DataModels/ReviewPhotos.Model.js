module.exports = function (instance, Sequelize) {
    return instance.define('ReviewPhotos', {
        ReviewPhotoId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ReviewId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Reviews',
                },
                key: 'ReviewId'
            }
        },
        ReviewPhotoKeyword: {
            type: Sequelize.STRING(125),
            allowNull: false
        },
        ReviewPhotoUrl: {
            type: Sequelize.STRING(125),
            allowNull: false
        }
    });
};
