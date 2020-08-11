/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spaceblocks', {
    SpaceBlockId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    },
    SpaceBlockDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    SpaceBlockStartHour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    SpaceBlockEndHour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    SpaceBlockMaxPeople: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'spaceblocks'
  });
};
