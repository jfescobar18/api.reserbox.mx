var ResponseCodes = {}

ResponseCodes.UserInserted = { name: "UserInserted", code: 1 };
ResponseCodes.UserNotInserted = { name: "UserNotInserted", code: 2 };
ResponseCodes.InvalidCredentials = { name: "Invalid Credentials", code: 3 };
ResponseCodes.AuthenticatedUser = { name: "Authenticated User", code: 4 };
ResponseCodes.AuthHeaderMissed = { name: "Authorization Header Missed", code: 5 };
ResponseCodes.ExpiredToken = { name: "Expired Token", code: 6 };
ResponseCodes.UserNotFound = { name: "User Not Found", code: 7 }
ResponseCodes.EmailSent = { name: "Email Sent", code: 8 }
ResponseCodes.PasswordUpdated = { name: "Password Updated", code: 9 }
ResponseCodes.CompanyCreated = { name: "Company Created", code: 10 }
ResponseCodes.CompanyNotCreated = { name: "Company Not Created", code: 11 }
ResponseCodes.Hello = { name: "Hello User", code: 999 };

module.exports = ResponseCodes;