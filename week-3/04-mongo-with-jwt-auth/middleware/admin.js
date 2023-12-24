const { Admin, jwtPassword } = require("../db");
const jwt = require("jsonwebtoken");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    console.log(token, typeof token);
    const jwtToken = token.split(" ")[1];
    try {
        jwt.verify(jwtToken, jwtPassword);
        next();
    } catch (error) {
        return res.status(403).json({
            message: "invalid token",
        });
    }
}

module.exports = adminMiddleware;
