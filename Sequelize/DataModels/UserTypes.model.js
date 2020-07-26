module.exports = (instance, Sequelize) => {
    const UserTypes = instance.define("UserTypes", {
        UserTypeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        UserTypeName: {
            type: Sequelize.STRING(8),
            allowNull: false
        }
    });

    return UserTypes;
};