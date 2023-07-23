const dbOperation        = require('../db/dbOperation');

const getAllAccountNames = (req, res) => {
    dbOperation.getAllAccountNames().then(eResult => {
        res.send({result: eResult.recordset});
    });
}

module.exports = {
    getAllAccountNames
};