const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const config = require("../config");

const instance = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,
    logging: false,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

instance
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error(config.console.RedColor, 'Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.instance = instance;
db.Op = Op;

db.Companies = require("./DataModels/Companies.Model")(instance, Sequelize);
db.CompaniesHasCompanyHighlights = require("./DataModels/CompaniesHasCompanyHighlights.Model")(instance, Sequelize);
db.CompaniesHasCompanyPhotos = require("./DataModels/CompaniesHasCompanyPhotos.Model")(instance, Sequelize);
db.CompaniesHasSpaces = require("./DataModels/CompaniesHasSpaces.Model")(instance, Sequelize);
db.CompanyHighlights = require("./DataModels/CompanyHighlights.Model")(instance, Sequelize);
db.CompanyPhotos = require("./DataModels/CompanyPhotos.Model")(instance, Sequelize);
db.CompanyRoles = require("./DataModels/CompanyRoles.Model")(instance, Sequelize);
db.NotAvailableDays = require("./DataModels/NotAvailableDays.Model")(instance, Sequelize);
db.Reservations = require("./DataModels/Reservations.Model")(instance, Sequelize);
db.ReviewPhotos = require("./DataModels/ReviewPhotos.Model")(instance, Sequelize);
db.Reviews = require("./DataModels/Reviews.Model")(instance, Sequelize);
db.ReviewsHasReviewPhotos = require("./DataModels/ReviewsHasReviewPhotos.Model")(instance, Sequelize);
db.SpaceBlocks = require("./DataModels/SpaceBlocks.Model")(instance, Sequelize);
db.Spaces = require("./DataModels/Spaces.Model")(instance, Sequelize);
db.UserGenders = require("./DataModels/UserGenders.Model")(instance, Sequelize);
db.Users = require("./DataModels/Users.Model")(instance, Sequelize);
db.UserTypes = require("./DataModels/UserTypes.Model")(instance, Sequelize);

db.instance.sync({ force: false })
    .then(() => {
        console.log("sync is completed");
    }).catch(err => {
        console.error(config.console.RedColor, 'Unable to sync the database:', err);
    });

module.exports = db;