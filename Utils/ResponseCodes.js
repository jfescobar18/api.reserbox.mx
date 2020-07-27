var ResponseCodes = {}

ResponseCodes.UserInserted = { name: "UserInserted", code: 1 };
ResponseCodes.UserNotInserted = { name: "UserNotInserted", code: 2 };
ResponseCodes.InvalidCredentials = { name: "Invalid Credentials", code: 3 };
ResponseCodes.AuthenticatedUser = { name: "Authenticated User", code: 4 };
ResponseCodes.AuthHeaderMissed = { name: "Authorization Header Missed", code: 5 };
ResponseCodes.ExpiredToken = { name: "Expired Token", code: 6 };
ResponseCodes.Hello = { name: "Hello User", code: 7 };

module.exports = ResponseCodes;