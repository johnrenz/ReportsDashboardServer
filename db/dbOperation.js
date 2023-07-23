const   config       = require('../config/dbConfig');
const   sql          = require('mssql');   

const getEmployees = async () => {
    try {
        let pool = await sql.connect(config);
        let employees =await pool.request().query("select * from employees");
        return employees;
    }
    catch(error) {
        console.log(error);
    }
}
const getEmployee = async (id) => {
    try {
        let pool = await sql.connect(config);
        let employee = await pool.request()
            .input('id', id)
            .query("select * from employees where id = @id");
        return employee;
    }
    catch(error) {
        console.log(error);
    }
}

const createEmployee = async (employee) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('firstname', employee.firstname)
            .input('lastname', employee.lastname)
            .query('insert into employees (firstname, lastname) values (@firstname, @lastname) ');
        return 'Success';
    }
    catch(error) {
        console.log(error);
        return error;
    }
}
const updateEmployee = async (employee) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', employee.id)
            .input('firstname', employee.firstname)
            .input('lastname', employee.lastname)
            .query('update employees set firstname = @firstname, lastname = @lastname where id = @id ');
        return 'Success';
    }
    catch(error) {
        console.log(error);
        return error;
    }
}
const deleteEmployee = async (id) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', id)
            .query('delete from employees where id = @id ');
        return 'Success';
    }
    catch(error) {
        console.log(error);
        return error;
    }
}

const getAllActivity = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let activities = await pool.request().query(`exec GetAllActivityBy
            '${parameters.SearchBy}', 
            '${parameters.SearchText}', 
            '${parameters.StartDate}', 
            '${parameters.EndDate}', 
            '${parameters.Websites}'`);
        
        // console.log("waiting 9 secs");
        // await new Promise(resolve => setTimeout(resolve, 9000));
        return activities;
    }
    catch(error) {
        console.log(error);
    }
}

const getComponents = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let components = await pool.request().query(`exec GetComponentsBy
            '${parameters.SearchBy}', 
            '${parameters.SearchText}', 
            '${parameters.StartDate}', 
            '${parameters.EndDate}', 
            '${parameters.Websites}'`);
        
        // console.log("waiting 9 secs");
        // await new Promise(resolve => setTimeout(resolve, 9000));
        return components;
    }
    catch(error) {
        console.log(`getComponents error ${error}`);
    }
}

const getHitsOverTime = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let hitsOverTime = await pool.request().query(`exec GetHitsOverTimeBy 
            '${parameters.SearchBy}', 
            '${parameters.SearchText}', 
            '${parameters.StartDate}', 
            '${parameters.EndDate}', 
            '${parameters.Websites}'`);
        // console.log("waiting 3 secs");
        // await new Promise(resolve => setTimeout(resolve, 3000));
        return hitsOverTime;
    }
    catch(error) {
        console.log(error);
    }
}

const getTopWebUsers = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let topWebUsers =await pool.request().query(`exec GetTopWebUsersBy 
            '${parameters.SearchBy}', 
            '${parameters.SearchText}', 
            '${parameters.StartDate}', 
            '${parameters.EndDate}', 
            '${parameters.Websites}'`);
        // console.log("waiting 4 secs");
        // await new Promise(resolve => setTimeout(resolve, 4000));
        return topWebUsers;
    }
    catch(error) {
        console.log(error);
    }
}

const getTopAccounts = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let topAccounts =await pool.request().query(`exec GetTopAccountsBy 
            '${parameters.SearchBy}', 
            '${parameters.SearchText}', 
            '${parameters.StartDate}', 
            '${parameters.EndDate}', 
            '${parameters.Websites}'`);
        // console.log("waiting 4 secs");
        // await new Promise(resolve => setTimeout(resolve, 4000));
        return topAccounts;
    }
    catch(error) {
        console.log(error);
    }
}

const getUsageByWebsite = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let usageByWebsite = await pool.request().query(`exec GetUsageByWebsiteBy 
            '${parameters.SearchBy}', 
            '${parameters.SearchText}', 
            '${parameters.StartDate}', 
            '${parameters.EndDate}', 
            '${parameters.Websites}'`);
        // console.log("waiting 6 secs");
        // await new Promise(resolve => setTimeout(resolve, 6000));
        return usageByWebsite;
    }
    catch(error) {
        console.log(error);
    }
}

const getTotalPageViews = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let totalPageViews = await pool.request().query(`exec GetTotalPageViews 
            '${parameters.SearchBy}', 
            '${parameters.SearchText}', 
            '${parameters.StartDate}', 
            '${parameters.EndDate}', 
            '${parameters.Websites}'`);
        // console.log("waiting 6 secs");
        // await new Promise(resolve => setTimeout(resolve, 6000));
        return totalPageViews;
    }
    catch(error) {
        console.log(error);
    }
}

const getAllAccountNames = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let accountNames = await pool.request().query(`exec GetAllAccountNames`); 
        return accountNames;
    }
    catch(error) {
        console.log(error);
    }
}

const getAllOrderNumbers = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let orderNumbers = await pool.request().query(`exec GetAllOrderNumbers`); 
        return orderNumbers;
    }
    catch(error) {
        console.log(error);
    }
}

const getAllUsers = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(`exec GetAllUsers`); 
        return users;
    }
    catch(error) {
        console.log(error);
    }
}

const getAllWebsites = async (parameters) => {
    try {
        let pool = await sql.connect(config);
        let websites = await pool.request().query(`exec GetAllWebsites`); 
        return websites;
    }
    catch(error) {
        console.log(error);
    }
}

const getWuUser = async (user) => {
    try {
        let pool = await sql.connect(config);
        let wuuser = await pool.request().query(`exec GetWUUser
            '${user}'`);
        return wuuser;
    }
    catch(error) {
        console.log(`getWuUser error:${error}`);
    }
}

const getWuUserByRefreshtoken = async (refreshToken) => {
    try {
        let pool = await sql.connect(config);
        let wuuser = await pool.request().query(`exec GetWUUserByRefefreshToken
            '${refreshToken}'`);
        return wuuser;
    }
    catch(error) {
        console.log(`GetWUUserByRefefreshToken error:${error}`);
    }
}

const getWuUsers = async () => {
    try {
        let pool = await sql.connect(config);
        let wuusers = await pool.request().query(`exec GetWUUsers`);
        return wuusers;
    }
    catch(error) {
        console.log(error);
    }
}

const createWuUser = async (wuuser) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', wuuser.username)
            .input('fullname', wuuser.fullname)
            .input('password', wuuser.password)
            .input('refreshToken', wuuser.refreshToken)
            .input('roles', wuuser.roles)
            .output('message', '')
            .execute('CreateWUUser');
        const resultMessage = result.output.message;
        return resultMessage;
    }
    catch(error) {
        console.log(error);
    }
}

const updateWuUser = async (wuuser) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', wuuser.username)
            .input('fullname', wuuser.fullname)
            .input('password', wuuser.password)
            .input('refreshToken', wuuser.refreshToken)
            .input('roles', wuuser.roles)
            .output('message', '')
            .execute('UpdateWUUser');
        const resultMessage = result.output.message;
        return resultMessage;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    getAllActivity,
    getComponents,
    getHitsOverTime,
    getUsageByWebsite,
    getTopWebUsers,
    getTopAccounts,
    getTotalPageViews,
    getAllOrderNumbers,
    getAllAccountNames,
    getAllUsers,
    getAllWebsites,
    getWuUsers,
    getWuUser,
    createWuUser,
    getWuUserByRefreshtoken,
    updateWuUser
}