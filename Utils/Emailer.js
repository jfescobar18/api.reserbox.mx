const nodemailer = require("nodemailer");
const EmailTypes = require("./EmailTypes");
const path = require('path');
const fs = require("fs");

exports.initMailer = function (user, emailType, token) {
    return new Promise(function (resolve, reject) {
        try {
            const email = composeEmail(user, emailType, token);
            resolve(sendEmail(user.UserEmail, email.subject, email.text, email.body));
        }
        catch (error) {
            var reason = { "error": "nodemailer error", "message": error.message }
            reject(reason);
        }
    });
}

function composeEmail(user, emailType, token) {
    try {
        let emailComposed = {};

        switch (emailType) {
            case EmailTypes.WELCOME_USER:
                emailComposed.subject = "¡Bienvenido a Reserbox!";
                emailComposed.text = `${user.UserFirstName} te damos la bienvenida a Reserbox, comienza a reservar ahora`;
                emailComposed.body = fs.readFileSync(path.join(__dirname, "../Mailing/WelcomeUser.html"), "utf8");
                emailComposed.body = emailComposed.body.toString();
                emailComposed.body = emailComposed.body.addConfirmEmailURI(user);
                break;
            case EmailTypes.WELCOME_COMPANY:
                emailComposed.subject = "¡Bienvenido a Reserbox!";
                emailComposed.text = `${user.UserFirstName} se bienvenido a Reserbox, configura ahora el sitio de tu negocio`;
                emailComposed.body = fs.readFileSync(path.join(__dirname, "../Mailing/WelcomeCompany.html")), "utf8";
                emailComposed.body = emailComposed.body.toString();
                emailComposed.body = emailComposed.body.addConfirmEmailURI(user);
                break;
            case EmailTypes.EMAIL_CONFIRMATION:
                emailComposed.subject = "Confirmación de Email";
                emailComposed.text = `Confirma tu email ahora y comienza a usar Reserbox`;
                emailComposed.body = fs.readFileSync(path.join(__dirname, "../Mailing/Confirmation.html")), "utf8";
                emailComposed.body = emailComposed.body.toString();
                emailComposed.body = emailComposed.body.addConfirmEmailURI(user);
                break;
            case EmailTypes.PASSWORD_RECOVERY:
                emailComposed.subject = "Recupera tu contraseña";
                emailComposed.text = `Hola ${user.UserFirstName}, ¿Olvidaste tu contraseña?`;
                emailComposed.body = fs.readFileSync(path.join(__dirname, "../Mailing/PasswordRecovery.html")), "utf8";
                emailComposed.body = emailComposed.body.toString();
                break;
            default:
                break;
        }
    }
    catch (error) {
        throw new Error(error);
    }
}

Object.assign(String.prototype, {
    addConfirmEmailURI(user, token) {
        let ConfirmEmailURI = process.env.NODE_ENV === "production" ? process.env.WEB_APP_URL_PRODUCTION : process.env.WEB_APP_URL_DEVELOP;
        ConfirmEmailURI = ConfirmEmailURI + `auth/confirm-email?email=${user.UserEmail}&token=${token}`;
        return this.replace("{ConfirmEmailURI}", ConfirmEmailURI);
    },
    addPasswordRecoveryURI(user, token) {
        let PasswordRecoveryURI = process.env.NODE_ENV === "production" ? process.env.WEB_APP_URL_PRODUCTION : process.env.WEB_APP_URL_DEVELOP;
        PasswordRecoveryURI = PasswordRecoveryURI + `auth/recovery-password?email=${user.UserEmail}&token=${token}`;
        return this.replace("{PasswordRecoveryURI}", PasswordRecoveryURI);
    }
});

const sendEmail = async function (to, subject, text, html) {
    try {
        let config = {
            host: process.env.HOST_SMTP,
            port: process.env.NODE_ENV === "production" ? 465 : 587,
            secure: process.env.NODE_ENV === "production",
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASSWORD_SMTP
            }
        };

        const transporter = nodemailer.createTransport(config);

        let info = await transporter.sendMail({
            from: "Reserbox 🗃 <fraescruz@gmail.com>",
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        return info;
    }
    catch (error) {
        throw { "error": error.message };
    }
}