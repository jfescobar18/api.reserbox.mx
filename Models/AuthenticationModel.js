const db = require("../Sequelize/database");
const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const { response } = require("express");

exports.singUp = async function (req, res) {
    try {
        let user = await getUserByEmail(req.body.UserEmail).catch(error => { throw error });

        if (user.length === 0) {
            return await addUser(req.body, res).catch(error => { throw error });
        }
        else {
            return returnResponse(HttpCodes.UNAUTHORIZED, res, "Email in use", ResponseCodes.UserNotInserted);
        }
    }
    catch (error) {
        return returnResponse((HttpCodes.BAD_REQUEST, "Error", res, error));
    }
}

exports.login = async function (req, res) {
    console.log("login called");
    console.log(req.body);

    res.status(200).jsonp({ "Message": "Ok" });
}

exports.test = async function (req, res) {
    console.log("test called");
    db.UserTypes.findAll().then(UserTypes => res.json(UserTypes));
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
            UserPhone: userParams.UserPhone,
            UserTypeId: userParams.UserTypeId,
            LastModified: null
        });

        await user.save();
        return returnResponse(HttpCodes.OK, res, "User Saved", ResponseCodes.UserInserted);
    }
    catch (error) {
        throw error;
    }
}

async function returnResponse(HttpCode, res, message, status) {
    return res.status(HttpCode).jsonp({
        "Message": message,
        "Status": status
    });
}