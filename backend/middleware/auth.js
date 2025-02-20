import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    const {token} = req.headers;
    
    if (token) {
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userId = token_decode.id; 
            next();
        } catch (error) {
            console.log(error);
            res.json({success: false, message: error.message});
        }
    } else {
        // only works for guest user
        next();
    }
}

export default authUser;