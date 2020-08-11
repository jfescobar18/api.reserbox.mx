module.exports = function (instance, Sequelize) {
    return instance.define('Reviews', {
        ReviewId: {
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
                    tableName: 'Users',
                },
                key: 'UserId'
            }
        },
        ReviewContent: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        ReviewDate: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        ReviewScore: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
};
