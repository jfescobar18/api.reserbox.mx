module.exports = function (instance, Sequelize) {
    return instance.define('SpaceBlocks', {
        SpaceBlockId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        SpaceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Spaces',
                },
                key: 'SpaceId'
            }
        },
        SpaceBlockDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        SpaceBlockStartHour: {
            type: Sequelize.TIME,
            allowNull: false
        },
        SpaceBlockEndHour: {
            type: Sequelize.TIME,
            allowNull: false
        },
        SpaceBlockMaxPeople: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
};
