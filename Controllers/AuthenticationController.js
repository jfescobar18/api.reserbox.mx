const express = require("express");
const router = express.Router();
const auth = require("../Models/AuthenticationModel")

var routes = function () {
    router.route("/sing-up")
        .post(auth.singUp);

    router.route("/login")
        .post(auth.login);

    router.route("/test")
        .get(auth.test);

    return router;
};

module.exports = routes;