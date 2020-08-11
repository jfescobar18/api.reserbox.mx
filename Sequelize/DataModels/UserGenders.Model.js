module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserGenders', {
        UserGenderId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        UserGenderName: {
            type: DataTypes.STRING(16),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'UserGenders'
    });
};
