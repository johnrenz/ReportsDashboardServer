const dbOperation        = require('../db/dbOperation');

const getAllOrderNumbers = (req, res) => {
    dbOperation.getAllOrderNumbers().then(eResult => {
        res.send({result: eResult.recordset});
    });
}

module.exports = {
    getAllOrderNumbers
};