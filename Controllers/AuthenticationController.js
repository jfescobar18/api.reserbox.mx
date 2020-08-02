const express = require("express");
const router = express.Router();
const Auth = require("../Models/AuthenticationModel");

var routes = function () {
    router.route("/sing-up")
        .post(Auth.singUp);

    router.route("/login")
        .post(Auth.login);

    router.route("/confirm-email")
        .post(Auth.confirmEmail);

    router.route("/request-new-password")
        .post(Auth.requestNewPassword);

    router.route("/update-password")
        .post(Auth.updatePassword);

    return router;
};

module.exports = routes;