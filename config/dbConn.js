const config = require('./dbConfig');
const sql = require('mssql');   

const getConnection = () => {
    const connectionPromise = new Promise((resolve, reject) => {
        try {
            sql.connect(config)
            .then(pool => {
                console.log('connected to mssql');
                resolve(pool);
            })
            .catch(err => {
                reject(`Error connecting to mssql - ${err}`);
            })        
        }
        catch (err) {
            reject(`Error: ${err}`);
        }
    })
    return connectionPromise;
}

module.exports = getConnection