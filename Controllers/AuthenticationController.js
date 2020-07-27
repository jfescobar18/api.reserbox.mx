const express = require("express");
const router = express.Router();
const Auth = require("../Models/AuthenticationModel");

var routes = function () {
    router.route("/sing-up")
        .post(Auth.singUp);

    router.route("/login")
        .post(Auth.login);

    return router;
};

module.exports = routes;