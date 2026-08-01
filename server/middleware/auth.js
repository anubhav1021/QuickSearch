const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    let token = null;

    // Check Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {

        token = authHeader.split(" ")[1];

    }

    // If not found, check query parameter
    if (!token && req.query.token) {

        token = req.query.token;

    }

    if (!token) {

        return res.status(401).json({
            success: false,
            message: "Access Denied"
        });

    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    }
    catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;