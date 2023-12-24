const { User } = require("../db");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await User.findOne({ username: username });
    if (!user) return res.status(403).json({ message: "invalid login" });
    if (user.username != username || user.password != password) {
        return res.status(403).json({ message: "invalid login" });
    }

    next();
}

module.exports = userMiddleware;
