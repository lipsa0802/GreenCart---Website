import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized: No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({ success: false, message: 'Not Authorized: Invalid token' });
        }

        req.userId = decoded.id; // ✅ store decoded user ID on the request object
        next(); // ✅ allow the request to proceed
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;
