module.exports = function (instance, Sequelize) {
    return instance.define('CompanyHighlights', {
        CompanyHighlightId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        CompanyHighlightIcon: {
            type: Sequelize.STRING(125),
            allowNull: false
        },
        CompanyHighlightDescription: {
            type: Sequelize.STRING(125),
            allowNull: false
        }
    });
};
