exports.send = async function (HttpCode, res, status, token) {
    return res.status(HttpCode).jsonp({
        "Status": status,
        "Token": token
    });
}