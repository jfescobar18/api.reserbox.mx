/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviewphotos', {
    ReviewPhotoId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
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
    ReviewPhotoKeyword: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    ReviewPhotoUrl: {
      type: DataTypes.STRING(125),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reviewphotos'
  });
};
