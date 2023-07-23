const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401); //unauthorized
        const rolesArray = [...allowedRoles];
        const reqRoles = (req.roles.map(role => { return role.role.type }));
        const result = reqRoles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}
module.exports = verifyRoles