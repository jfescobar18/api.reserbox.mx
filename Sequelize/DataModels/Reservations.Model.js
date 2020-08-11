module.exports = function (instance, Sequelize) {
    return instance.define('Reservations', {
        ReservationId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        UserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'users',
                },
                key: 'UserId'
            }
        },
        SpaceBlockId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'SpaceBlocks',
                },
                key: 'SpaceBlockId'
            }
        },
        ReservationVisitorsCount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ReservationNotes: {
            type: Sequelize.STRING(255),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Reservations'
    });
};
