/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companies', {
    CompanyId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CompanyName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CompanySlogan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CompanyLogo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CompanyBanner: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CompanyRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'companyroles',
        },
        key: 'CompanyRoleId'
      }
    },
    CompanyColorsJsonConfig: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CompanyAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CompanyMapsPlaceId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CompanyPhone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CompanyDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CompanyNotes: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'companies'
  });
};
