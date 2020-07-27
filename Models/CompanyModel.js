const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const GenericResponse = require("../Controllers/GenericResponse");

exports.hello = async function (req, res) {
    try {
        return GenericResponse.send(HttpCodes.OK, res, ResponseCodes.Hello, null);
    }
    catch (error) {
        return GenericResponse.send(HttpCodes.BAD_REQUEST, res, error, null);
    }
}