const express = require("express");
const router = express.Router();
const Company = require("../Models/CompanyModel");
const AuthMiddleware = require("../Utils/AuthMiddleware");

var routes = function () {
    router.route("/hello")
        .get(AuthMiddleware.ensureAuthenticated, Company.hello);

    return router;
};

module.exports = routes;