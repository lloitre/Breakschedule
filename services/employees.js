const db = require('./db');

function getAllEmployees() {
    return db.query('SELECT * FROM employees ORDER BY name');
}

function addEmployee(name) {
    return db.run(
        'INSERT INTO employees (name) VALUES (?)',
        [name]
    );
}

function getEmployeeBreaks(employeeId) {
    return db.query(
        `SELECT breaks.* FROM breaks 
         WHERE employee_id = ? 
         ORDER BY start_time`,
        [employeeId]
    );
}

module.exports = {
    getAllEmployees,
    addEmployee,
    getEmployeeBreaks
} 