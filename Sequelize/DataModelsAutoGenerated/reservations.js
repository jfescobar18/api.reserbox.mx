/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reservations', {
    ReservationId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'UserId'
      }
    },
    SpaceBlockId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'spaceblocks',
        },
        key: 'SpaceBlockId'
      }
    },
    ReservationVisitorsCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ReservationNotes: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reservations'
  });
};
