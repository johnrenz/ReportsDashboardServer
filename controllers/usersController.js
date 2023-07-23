const dbOperation        = require('../db/dbOperation');

const getAllUsers = (req, res) => {
    dbOperation.getAllUsers().then(eResult => {
        res.send({result: eResult.recordset});
    });
}

module.exports = {
    getAllUsers
};