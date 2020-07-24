const express = require("express");
const router = express.Router();

var routes = function () {
    router.route("/test")
        .get(function (req, res) {
            console.log("Call");
            res.send({ "Id": 1 });
        });

    return router;
};

module.exports = routes;