
const dbOperation        = require('../db/dbOperation');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    let getWuUserResult;
    await dbOperation.getWuUserByRefreshtoken(refreshToken)
        .then(eResult => {
            console.log("getWuUser getWuUserByRefreshtoken");
            getWuUserResult = eResult; 
        });
    if (getWuUserResult.rowsAffected === 0) return res.sendStatus(403); //forbidden
    const foundUser = getWuUserResult.recordset[0];
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username != decoded.username) return res.sendStatus(403);
                const roles = JSON.parse(foundUser.roles); //Object.values(foundUser.roles);
                const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            res.json({ accessToken });
        }
    )
    
}

module.exports = { handleRefreshToken };