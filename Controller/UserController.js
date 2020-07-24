const express = require("express");
const router = express.Router();

var routes = function () {
    router.route("/test")
        .get(function (req, res) {
            const foo = 'foo';
            res.send(foo.repeat(3000));
        });
    return router;
}

module.exports = routes;