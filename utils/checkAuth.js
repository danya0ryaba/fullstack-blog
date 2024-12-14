import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const decoded = jwt.verify(token, "secret123");
        req.userId = decoded._id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Not authorized" });
    }
}