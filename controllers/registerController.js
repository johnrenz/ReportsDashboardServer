const dbOperation        = require('../db/dbOperation');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message' : 'Username and password required!!'});
    let duplicate;
    await dbOperation.getWuUser(user)
        .then(eResult => {
            duplicate = eResult; 
        });
    if (duplicate.rowsAffected > 0) {
        return res.sendStatus(409); //conflict
    }
    try {
        //encrypt pwd
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //save new wuuser
        const newUser = { 
            username: user,
            password: hashedPwd, 
            refreshToken: '',
            roles: `[{ "role": { "type": 2001, "name": "WebUser" } }]`
        };
        let message
        await dbOperation.createWuUser(newUser)
            .then(eResult => {
                message = eResult;
            });
        if (message === 'Success') {
            res.status(201).json({ 'success': `New wuuser ${JSON.stringify(newUser)} created.`});
        }
        else {
            res.status(500).json({ 'message': message });
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    handleNewUser
};