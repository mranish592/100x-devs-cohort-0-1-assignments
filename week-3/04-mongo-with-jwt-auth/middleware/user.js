const { User, jwtPassword } = require("../db");
const jwt = require("jsonwebtoken");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const jwtToken = token.split(" ")[1];
    console.log(token, jwtToken);

    try {
        jwt.verify(jwtToken, jwtPassword);
        next();
    } catch (error) {
        console.error("error while verifying jwt");
        return res.status(403).json({
            message: "invalid token",
        });
    }
}

module.exports = userMiddleware;
