module.exports = function (instance, Sequelize) {
    return instance.define('NotAvailableDays', {
        NotAvailableDayId: {
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
        NotAvailableDayDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    });
};
