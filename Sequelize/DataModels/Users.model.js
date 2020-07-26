module.exports = (instance, Sequelize) => {
    const Users = instance.define("Users", {
        UserId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        UserFirstName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        UserLastName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        UserEmail: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        UserPhone: {
            type: Sequelize.STRING(15),
            allowNull: false
        },
        UserTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'UserTypes',
                },
                key: 'UserTypeId'
            }
        },
        CreationDate: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: instance.literal('CURRENT_TIMESTAMP')
        },
        LastModified: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });

    return Users;
};