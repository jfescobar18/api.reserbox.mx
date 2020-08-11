/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    ReviewId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'UserId'
      }
    },
    ReviewContent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ReviewDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    ReviewScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reviews'
  });
};
