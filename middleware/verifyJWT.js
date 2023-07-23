const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader === undefined || authHeader === null) {
        console.log('verifyJWT authHeader undefined or null');
        res.sendStatus(401); //unauthorized
    }

    if (!authHeader?.startsWith('Bearer ')) res.sendStatus(401); //unauthorized
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log(`forbidden ${err}`)
                return res.sendStatus(403); //forbidden, invalid token
            }
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT;