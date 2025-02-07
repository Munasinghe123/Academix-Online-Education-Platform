const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let accessToken;

    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with "Bearer "
    if (authHeader && authHeader.startsWith("Bearer ")) {
        accessToken = authHeader.split(" ")[1];
    }

    // Return error if no token is found
    if (!accessToken) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token payload to `req.user`
        console.log("The decoded user is:", req.user);
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;
