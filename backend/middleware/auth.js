import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    req.user = null;
    const auth = req.headers['authorization'];
    console.log('AUTH HEADER:', auth);
    if(!auth){
        return res.status(403)
            .json({
                message: "Authorization header is missing"
            })
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        console.log('DECODED JWT:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('JWT ERROR:', error.message);
        return res.status(403)
            .json({
                message: "Invalid token",
                error: error.message
            })
    }
}

export default auth;