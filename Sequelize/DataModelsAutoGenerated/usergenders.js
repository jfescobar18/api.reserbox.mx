/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usergenders', {
    UserGenderId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserGenderName: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usergenders'
  });
};
