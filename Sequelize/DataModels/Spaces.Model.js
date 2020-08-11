module.exports = function (instance, Sequelize) {
    return instance.define('Spaces', {
        SpaceId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        SpaceName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        SpaceStartDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        SpaceDueDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        SpaceStartHour: {
            type: Sequelize.TIME,
            allowNull: false
        },
        SpaceEndHour: {
            type: Sequelize.TIME,
            allowNull: false
        },
        SpaceTimePerBlock: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        SpacePeoplePerBlock: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
};
