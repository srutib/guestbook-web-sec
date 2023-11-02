export const jwt = require('jsonwebtoken');
export const TOP_SECRET_SIGNING_SECRET = '5bfexdswh9i1vwqildm9'

export const generateJWT = (user, duration) => {
    const token = jwt.sign({
        userId: user.user_id,
    }, TOP_SECRET_SIGNING_SECRET, {
        expiresIn: duration
    });
    console.log("This is the token", token);
    return token;
}

export const verifyJWT = (token) => {
    console.log("TOKEN", token);
    try {
        const tokenPayload = jwt.verify(token, TOP_SECRET_SIGNING_SECRET);
        return tokenPayload.userId;
    } catch (error) {
        console.log(error);
        return null;
    }
}