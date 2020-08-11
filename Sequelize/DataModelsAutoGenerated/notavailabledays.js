/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notavailabledays', {
    NotAvailableDayId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SpaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'spaces',
        },
        key: 'SpaceId'
      }
    },
    NotAvailableDayDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notavailabledays'
  });
};
