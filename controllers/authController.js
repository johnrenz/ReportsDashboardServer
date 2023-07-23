const dbOperation        = require('../db/dbOperation');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message' : 'Username and password required!'});
    let getWuUserResult;
    await dbOperation.getWuUser(user)
        .then(eResult => {
            getWuUserResult = eResult; 
        });
    
    if (getWuUserResult.rowsAffected === 0 || !getWuUserResult.recordset[0]) {
        return res.sendStatus(401); //unauthorized
    }
    const foundUser = getWuUserResult.recordset[0];
    //evaluate pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = JSON.parse(foundUser.roles); 
        console.log(JSON.parse( foundUser.roles));
        //create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo": { 
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '300s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        try {
            foundUser.refreshToken = refreshToken;

            //saving refreshToken with current wuuser in database.
            let message
            await dbOperation.updateWuUser(foundUser)
                .then(eResult => {
                    message = eResult;
                });    
            if (message === 'Success') {     
                //set refresh cookie to user, httpOnly secure, not available to json.          
                res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //1 day //, 'secure: true' removed for Thunderclient but should be used for Chrome, production!!!
                //send accessToken to user
                console.log(`accessToken=${accessToken}`);
                res.json({ roles, accessToken }); 
            }
            else {
                res.status(500).json({ 'message': message });
            }
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
        
    } else {
        res.sendStatus(401); //unauthorized
    }
}

module.exports = { handleLogin };