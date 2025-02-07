const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let accessToken;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        accessToken = authHeader.split(" ")[1];
    }

    if (!accessToken) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            console.log("Access token has expired!");
        } else {
            console.error("Token verification failed:", err.message);
        }
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;
