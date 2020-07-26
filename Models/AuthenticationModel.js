const db = require("../Sequelize/database");
const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");

exports.singUp = async function (req, res) {
    try {
        let user = await db.Users.findAll({
            where: {
                UserEmail: {
                    [db.Op.eq]: req.body.UserEmail
                }
            }
        });

        if (user.length === 0) {
            const user = db.Users.build({
                UserId: null,
                UserFirstName: req.body.UserFirstName,
                UserLastName: req.body.UserLastName,
                UserEmail: req.body.UserEmail,
                UserPhone: req.body.UserPhone,
                UserTypeId: req.body.UserTypeId,
                LastModified: null
            });
            await user.save();

            res.status(HttpCodes.OK).jsonp({
                "Message": "User Saved",
                "Status": {
                    name: "UserInserted",
                    code: ResponseCodes.UserInserted
                }
            });
        }
        else {
            res.status(HttpCodes.OK).jsonp({
                "Message": "Email in use",
                "Status": {
                    name: "NotUserInserted",
                    code: ResponseCodes.NotUserInserted
                }
            });
        }
    }
    catch (error) {
        res.status(HttpCodes.BAD_REQUEST).jsonp({
            "Message": "Error",
            "Status": error
        });
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