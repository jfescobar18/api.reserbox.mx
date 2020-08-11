/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companyroles', {
    CompanyRoleId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CompanyRoleName: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    CompanyRoleDescription: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'companyroles'
  });
};
