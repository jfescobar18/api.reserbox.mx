/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companieshascompanyphotos', {
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
    CompanyPhotoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'companyphotos',
        },
        key: 'CompanyPhotoId'
      }
    }
  }, {
    sequelize,
    tableName: 'companieshascompanyphotos'
  });
};
