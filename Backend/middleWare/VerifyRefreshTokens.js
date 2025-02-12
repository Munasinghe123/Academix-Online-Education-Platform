const jwt = require('jsonwebtoken');

const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided." });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Attach the decoded user data to the request object
        req.user = decoded;

        console.log("Refresh token decoded user:", req.user);

        next(); // Token is valid, allow the request to proceed
    } catch (err) {
        console.error("Refresh token verification failed:", err.message);
        res.status(403).json({ message: "Invalid or expired refresh token." });
    }
};

module.exports = verifyRefreshToken;
