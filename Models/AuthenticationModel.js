const db = require("../Sequelize/database");
const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const GenericResponse = require("../Controllers/GenericResponse");
const TokenService = require("../Utils/TokenService");
const Cryptography = require("../Utils/Cryptography");
const { ValidateTemporalToken } = require("../Utils/AuthMiddleware");

exports.singUp = async function (req, res) {
    try {
        let user = await getUserByEmail(req.body.UserEmail).catch(error => { throw error });

        if (user.length === 0) {
            return await addUser(req.body, res).catch(error => { throw error });
        }
        else {
            return GenericResponse.send(HttpCodes.UNAUTHORIZED, res, ResponseCodes.UserNotInserted, null);
        }
    }
    catch (error) {
        return GenericResponse.send(HttpCodes.BAD_REQUEST, res, error, null);
    }
}

exports.login = async function (req, res) {
    try {
        let user = await getUserByEmail(req.body.UserEmail).catch(error => { throw error });

        if (user.length > 0 && await Cryptography.comparePassword(req.body.UserPassword, user[0].dataValues.UserPassword)) {
            return GenericResponse.send(HttpCodes.OK, res, ResponseCodes.AuthenticatedUser, TokenService.createToken(user, 14));
        }
        else {
            return GenericResponse.send(HttpCodes.UNAUTHORIZED, res, ResponseCodes.InvalidCredentials, null);
        }
    }
    catch (error) {
        return GenericResponse.send(HttpCodes.BAD_REQUEST, res, error, null);
    }
}

exports.confirmEmail = async function (req, res) {
    try {
        const UserEmail = req.params.UserEmail;
        const token = req.params.token;

        let user = await getUserByEmail(UserEmail).catch(error => { throw error });
        if (user.length > 0 && ValidateTemporalToken(token)) {
            const user = await db.Users.update(
                { EmailConfirmed: 1 },
                {
                    where: {
                        UserEmail: {
                            [db.Op.eq]: UserEmail
                        }
                    }
                }
            );

            return GenericResponse.send(HttpCodes.OK, res, ResponseCodes.AuthenticatedUser, TokenService.createToken(user, 14));
        }
        else {
            return GenericResponse.send(HttpCodes.UNAUTHORIZED, res, ResponseCodes.InvalidCredentials, null);
        }
    }
    catch (error) {
        return GenericResponse.send(HttpCodes.BAD_REQUEST, res, error, null);
    }
}

async function getUserByEmail(UserEmail) {
    try {
        return await db.Users.findAll({
            where: {
                UserEmail: {
                    [db.Op.eq]: UserEmail
                }
            }
        });
    }
    catch (error) {
        throw error;
    }
}

async function addUser(userParams, res) {
    try {
        const user = db.Users.build({
            UserId: null,
            UserFirstName: userParams.UserFirstName,
            UserLastName: userParams.UserLastName,
            UserEmail: userParams.UserEmail,
            UserPassword: await Cryptography.cryptPassword(userParams.UserPassword),
            UserPhone: userParams.UserPhone,
            UserTypeId: userParams.UserTypeId,
            LastModified: null
        });

        await user.save();
        return GenericResponse.send(HttpCodes.OK, res, ResponseCodes.UserInserted, TokenService.createToken(user, 2));
    }
    catch (error) {
        throw error;
    }
}