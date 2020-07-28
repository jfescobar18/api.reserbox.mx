const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = function (user, days) {
    const payload = {
        sub: user.UserId,
        iat: moment().unix(),
        exp: moment().add(days, "days").unix(),
    };
    return jwt.encode(payload, process.env.TOKEN);
};