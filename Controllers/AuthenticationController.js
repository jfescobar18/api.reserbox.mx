const express = require("express");
const router = express.Router();
const Auth = require("../Models/AuthenticationModel");

var routes = function () {
    router.route("/sing-up")
        .post(Auth.singUp);

    router.route("/login")
        .post(Auth.login);

    router.route("/confirm-email/:UserEmail/:token")
        .get(Auth.confirmEmail);

    router.route("/request-new-password/:UserEmail")
        .get(Auth.requestNewPassword);

    return router;
};

module.exports = routes;