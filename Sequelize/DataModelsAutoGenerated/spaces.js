/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spaces', {
    SpaceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SpaceName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SpaceStartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    SpaceDueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    SpaceStartHour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    SpaceEndHour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    SpaceTimePerBlock: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    SpacePeoplePerBlock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'spaces'
  });
};
