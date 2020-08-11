/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notavailabledays', {
    NotAvailableDayId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
