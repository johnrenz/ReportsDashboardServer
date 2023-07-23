
const dbOperation        = require('../db/dbOperation');

const getAllEmployees = async (req, res) => {
    let getEmployeesResult;
    await dbOperation.getEmployees().then(eResult => {
        getEmployeesResult = eResult
    });
    if (getEmployeesResult.rowsAffected === 0) return res.status(204).json({ 'message': 'No employees found.' }); 
    res.json(getEmployeesResult.recordset);
}

const createNewEmployee = async (req, res) => {
    
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'first and last name required.' });
    }
    try {
        let message
        await dbOperation.createEmployee({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
            .then(eResult => {
                message = eResult;
            });
        if (message === 'Success') {
            res.status(201).json({ 'success': `New employee ${req.body.firstname} ${req.body.lastname} created.`});
        }
        else {
            res.status(500).json({ 'message': message });
        }
    } catch (err) {
        console.log(err);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": `ID parameter required` });
    }
    let getEmployeeResult;
    await dbOperation.getEmployee(req.body.id).then(eResult => {
        getEmployeeResult = eResult;
    });
    if (getEmployeeResult.rowsAffected === 0) return res.status(401).json({ 'message': 'employee not found.' }); 
    const employee = getEmployeeResult.recordset[0];

    if (req?.body?.firstname) employee.firstname = req.body.firstname;
    if (req?.body?.lastname) employee.lastname = req.body.lastname;
    let message
    await dbOperation.updateEmployee(employee)
        .then(eResult => {
            message = eResult;
        });
    if (message === 'Success') {
        res.status(201).json({ 'success': `employee id ${employee.id} updated: ${req.body.firstname} ${req.body.lastname}`});   
    }
    else {
        res.status(500).json({ 'message': err });
    }
      
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": `ID parameter required` });
    }
    let getEmployeeResult;
    await dbOperation.getEmployee(req.body.id).then(eResult => {
        getEmployeeResult = eResult
    });
    if (getEmployeeResult.rowsAffected === 0) return res.status(401).json({ 'message': 'employee not found.' }); 
    const employee = (getEmployeeResult.recordset[0]);
    let message
    await dbOperation.deleteEmployee(employee.id)
        .then(eResult => {
            message = eResult;
        });
    if (message === 'Success') {
        res.status(201).json({ 'success': `employee id ${employee.id} deleted` } );   
    }
    else {
        res.status(500).json({ 'message': err });
    }
}

const getEmployee = async (req, res) => {
    if (!req.params?.id) return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    let getEmployeeResult;
    await dbOperation.getEmployee(req.params.id).then(eResult => {
        console.log("getAllEmployee returned");
        getEmployeeResult = eResult
    });
    if (getEmployeeResult.rowsAffected === 0) return res.status(401).json({ 'message': 'employee not found.' }); 
    const employee = getEmployeeResult.recordset[0];
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}