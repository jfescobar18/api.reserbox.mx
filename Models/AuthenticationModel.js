const db = require("../Sequelize/database");
const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const GenericResponse = require("../Controllers/GenericResponse");
const TokenService = require("../Utils/TokenService");
const Cryptography = require("../Utils/Cryptography");
const Emailer = require("../Utils/Emailer");
const EmailTypes = require("../Utils/EmailTypes");
const { ValidateTemporalToken } = require("../Utils/AuthMiddleware");

exports.singUp = async function (req, res) {
    try {
        let user = await getUserByEmail(req.body.UserEmail).catch(error => { throw error });

        if (user === null) {
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

        if (user !== null && await Cryptography.comparePassword(req.body.UserPassword, user.UserPassword)) {
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
        const UserEmail = req.body.UserEmail;
        const token = req.body.token;

        let user = await getUserByEmail(UserEmail).catch(error => { throw error });

        if (user !== null && ValidateTemporalToken(token)) {
            user = await updateUser({ EmailConfirmed: 1 }, UserEmail);
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

exports.requestNewPassword = async function (req, res) {
    try {
        let user = await getUserByEmail(req.body.UserEmail).catch(error => { throw error });

        if (user !== null) {
            const Token = TokenService.createToken(user, 2);
            Emailer.initMailer(user, EmailTypes.PASSWORD_RECOVERY, Token)
                .then(result => {
                    let response = ResponseCodes.EmailSent;
                    response.emailId = result.messageId;

                    return GenericResponse.send(HttpCodes.OK, res, response, Token);
                })
                .catch(error => {
                    console.log(error);
                    return GenericResponse.send(HttpCodes.UNAUTHORIZED, res, error, null);
                });
        }
        else {
            return GenericResponse.send(HttpCodes.UNAUTHORIZED, res, ResponseCodes.UserNotFound, null);
        }
    }
    catch (error) {
        return GenericResponse.send(HttpCodes.BAD_REQUEST, res, error, null);
    }
}

exports.updatePassword = async function (req, res) {
    try {
        const UserEmail = req.body.UserEmail;
        const UserPassword = req.body.UserPassword;
        const token = req.body.token;

        let user = await getUserByEmail(UserEmail).catch(error => { throw error });

        if (user !== null && ValidateTemporalToken(token)) {
            user = await updateUser({ UserPassword: UserPassword }, UserEmail);
            return GenericResponse.send(HttpCodes.OK, res, ResponseCodes.PasswordUpdated, TokenService.createToken(user, 14));
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
        const user = await db.Users.findAll({
            where: {
                UserEmail: {
                    [db.Op.eq]: UserEmail
                }
            }
        });

        return user.length > 0 ? user[0].dataValues : null;
    }
    catch (error) {
        throw error;
    }
}

async function addUser(userParams, res) {
    try {
        const emailType = UserTypeId === 1 ? EmailTypes.WELCOME_USER : EmailTypes.WELCOME_COMPANY;
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
        const Token = TokenService.createToken(user, 2);

        Emailer.initMailer(user, emailType, Token)
            .then(result => {
                let response = ResponseCodes.EmailSent;
                response.emailId = result.messageId;

                return GenericResponse.send(HttpCodes.OK, res, ResponseCodes.UserInserted, Token);
            })
            .catch(error => {
                console.log(error);
                return GenericResponse.send(HttpCodes.UNAUTHORIZED, res, error, null);
            });
    }
    catch (error) {
        throw error;
    }
}

async function updateUser(values, UserEmail) {
    await db.Users.update(
        values,
        {
            where: {
                UserEmail: {
                    [db.Op.eq]: UserEmail
                }
            }
        }
    );
}