const dbOperation        = require('../db/dbOperation');
const bcrypt = require('bcrypt');

const getAllWuusers = async (req, res) => {
    let getWuusersResult;
    await dbOperation.getWuUsers().then(eResult => {
        getWuusersResult = eResult
    });
    if (getWuusersResult.rowsAffected === 0 || !getWuusersResult.recordset) return res.status(204).json({ 'message': 'No employees found.' }); 
    res.send({result: getWuusersResult.recordset});
}
const getWUUser = async (req, res) => {
    let getWUUserResult;
    await dbOperation.getWuUser(req.query.username).then(eResult => {
        getWUUserResult = eResult
    });
    if (getWUUserResult.rowsAffected === 0 || !getWUUserResult.recordset) return res.status(204).json({ 'message': 'No employees found.' }); 
    res.send({result: getWUUserResult.recordset[0]});
}
const updateWUUser = async (req, res) => {
    if (!req?.body?.username) {
        return res.status(400).json({ "message": `username parameter required` });
    }
    let getWUUserResult;
    await dbOperation.getWuUser(req.body.username).then(eResult => {
        getWUUserResult = eResult
    });
    if (getWUUserResult.rowsAffected === 0) return res.status(401).json({ 'message': 'wuuser not found.' }); 
    const wuuser = getWUUserResult.recordset[0];

    if (req?.body?.fullname) wuuser.fullname = req.body.fullname;
    if (req?.body?.roles) wuuser.roles = req.body.roles;
    if (req?.body?.password) {
        //encrypt pwd
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        wuuser.password = hashedPwd;
    }
    let message
    await dbOperation.updateWuUser(wuuser)
        .then(eResult => {
            message = eResult;
        });
    if (message === 'Success') {
        res.status(201).json({ 'message': `Success - wuuser username ${wuuser.username} updated: ${req.body.username}`});   
    }
    else {
        res.status(500).json({ 'message': message });
    }      
}

const createWUUser = async (req, res) => {
    if (!req?.body?.username) {
        return res.status(400).json({ "message": `username parameter required` });
    }
    if (!req?.body?.fullname) {
        return res.status(400).json({ "message": `fullname parameter required` });
    }
    if (!req?.body?.roles) {
        return res.status(400).json({ "message": `roles parameter required` });
    }
    if (!req?.body?.password) {
        return res.status(400).json({ "message": `password parameter required` });
    }
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const wuuser = {
        username:  req.body.username,
        fullname:  req.body.fullname,
        password:  hashedPwd,
        refreshToken: '',
        roles:  req.body.roles
    };
    let message
    await dbOperation.createWuUser(wuuser)
        .then(eResult => {
            message = eResult;
        });
    if (message === 'Success') {
        res.status(201).json({ 'message': `Success - wuuser username ${wuuser.username} created: ${req.body.username}`});   
    }
    else {
        res.status(500).json({ 'message': message });
    }      
}
module.exports = {
    getAllWuusers,
    getWUUser,
    updateWUUser,
    createWUUser
}