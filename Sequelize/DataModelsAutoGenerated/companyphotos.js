/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companyphotos', {
    CompanyPhotoId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CompanyPhotoKeyword: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    CompanyPhotoUrl: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'companies',
        },
        key: 'CompanyId'
      }
    }
  }, {
    sequelize,
    tableName: 'companyphotos'
  });
};
