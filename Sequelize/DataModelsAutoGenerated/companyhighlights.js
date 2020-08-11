/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companyhighlights', {
    CompanyHighlightId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CompanyHighlightIcon: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    CompanyHighlightDescription: {
      type: DataTypes.STRING(125),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'companyhighlights'
  });
};
