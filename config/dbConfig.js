require('dotenv').config();

const dbConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: process.env.SQL_INSTANCE
    },
    port: Number(process.env.SQL_PORT)
}

module.exports = dbConfig;
