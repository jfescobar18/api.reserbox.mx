/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviewshasreviewphotos', {
    ReviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'reviews',
        },
        key: 'ReviewId'
      }
    },
    ReviewPhotoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'reviewphotos',
        },
        key: 'ReviewPhotoId'
      }
    }
  }, {
    sequelize,
    tableName: 'reviewshasreviewphotos'
  });
};
