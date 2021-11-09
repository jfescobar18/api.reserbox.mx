const db = require("../Sequelize/database");
const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const GenericResponse = require("../Controllers/GenericResponse");

exports.Create_Company = async function (req, res) {
    try {
        req.body.UserId = req.user.UserId;
        let company = await getCompany(req.body.UserId, req.body.CompanyName).catch(error => { throw error });

        if (company === null) {
            return await addCompany(req.body, res).catch(error => { throw error });
        }
        else {
            return GenericResponse.send(HttpCodes.BAD_REQUEST, res, ResponseCodes.CompanyNotCreated, null);
        }
    }
    catch (error) {
        return GenericResponse.send(HttpCodes.BAD_REQUEST, res, error, null);
    }
}

async function getCompany(UserId, CompanyName) {
    try {
        const company = await db.Companies.findAll({
            where: {
                UserId: {
                    [db.Op.eq]: UserId
                },
                CompanyName: {
                    [db.Op.eq]: CompanyName
                }
            }
        });

        return user.length > 0 ? user[0].dataValues : null;
    }
    catch (error) {
        throw error;
    }
}

async function addCompany(companyParams, res) {
    try {
        const company = db.Companies.build({
            UserId: companyParams.UserId,
            CompanyName: companyParams.CompanyName,
            CompanySlogan: companyParams.CompanySlogan,
            CompanyLogo: companyParams.CompanyLogo,
            CompanyBanner: companyParams.CompanyBanner,
            CompanyRoleId: companyParams.CompanyRoleId,
            CompanyColorsJsonConfig: companyParams.CompanyColorsJsonConfig,
            CompanyAddress: companyParams.CompanyAddress,
            CompanyMapsPlaceId: companyParams.CompanyMapsPlaceId,
            CompanyPhone: companyParams.CompanyPhone,
            CompanyDescription: companyParams.CompanyDescription,
            CompanyNotes: companyParams.CompanyNotes
        });

        await company.save();
        return GenericResponse.send(HttpCodes.OK, res, ResponseCodes.CompanyCreated, null);
    }
    catch (error) {
        throw error;
    }
}