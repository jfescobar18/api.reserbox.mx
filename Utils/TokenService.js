const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = function (user) {
    const payload = {
        sub: user.UserId,
        iat: moment().unix(),
        exp: moment().add(14, "days").unix(),
    };
    return jwt.encode(payload, process.env.TOKEN);
};