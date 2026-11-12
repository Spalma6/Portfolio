import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization && authorization.startsWith('Bearer ')
        ? authorization.slice(7)
        : null;

    if(!token) {
        return res.status(401).json({ error: 'Authorization token required.' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
}

export default authMiddleware;