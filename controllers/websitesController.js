const dbOperation        = require('../db/dbOperation');

const getAllWebsites = (req, res) => {
    dbOperation.getAllWebsites().then(eResult => {
        res.send({result: eResult.recordset});
    });
}

module.exports = {
    getAllWebsites
};