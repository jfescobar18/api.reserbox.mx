/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserFirstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UserLastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UserEmail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UserPhone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    UserTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'usertypes',
        },
        key: 'UserTypeId'
      }
    },
    CreationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    LastModified: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users'
  });
};
