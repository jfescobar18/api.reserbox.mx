module.exports = function (instance, Sequelize) {
    return instance.define('ReviewsHasReviewPhotos', {
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
        ReviewPhotoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'ReviewPhotos',
                },
                key: 'ReviewPhotoId'
            }
        }
    });
};
