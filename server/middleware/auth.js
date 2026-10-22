const jwt = require('jsonwebtoken');

exports.verifyToken = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: 'Access denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};