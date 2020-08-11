/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companieshascompanyhighlights', {
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'companies',
        },
        key: 'CompanyId'
      }
    },
    CompanyHighlightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'companyhighlights',
        },
        key: 'CompanyHighlightId'
      }
    }
  }, {
    sequelize,
    tableName: 'companieshascompanyhighlights'
  });
};
