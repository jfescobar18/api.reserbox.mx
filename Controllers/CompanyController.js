const express = require("express");
const router = express.Router();
const Company = require("../Models/CompanyModel");
const AuthMiddleware = require("../Utils/AuthMiddleware");

var routes = function () {
    router.route("/create-company")
        .get(AuthMiddleware.ensureAuthenticated, Company.Create_Company);

    return router;
};

module.exports = routes;