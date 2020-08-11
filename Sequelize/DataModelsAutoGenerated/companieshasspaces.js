/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companieshasspaces', {
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
    SpaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'spaces',
        },
        key: 'SpaceId'
      }
    }
  }, {
    sequelize,
    tableName: 'companieshasspaces'
  });
};
