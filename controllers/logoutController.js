
const dbOperation        = require('../db/dbOperation');

const handleLogout = async (req, res) => {
    //client should also delete accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookies.jwt;

    //is refresh token in db?
    let getWuUserResult;
    await dbOperation.getWuUserByRefreshtoken(refreshToken)
        .then(eResult => {
            console.log("getWuUser getWuUserByRefreshtoken");
            getWuUserResult = eResult; 
        });
    if (getWuUserResult.rowsAffected === 0) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204); //no content
    }
    const foundUser = getWuUserResult.recordset[0];

    // delete refresh token in db
    try {
        foundUser.refreshToken = '';
        let message
        await dbOperation.updateWuUser(foundUser)
            .then(eResult => {
                message = eResult;
            });

        if (message === 'Success') {               
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
            res.sendStatus(204);
        }
        else {
            res.status(500).json({ 'message': message });
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleLogout };