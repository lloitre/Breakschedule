const db = require('./db');

function addBreak(employeeId, startTime, endTime) {
    if (!employeeId || !startTime || !endTime) {
        throw new Error('Employee ID, start time, and end time are required');
    }
    
    if (new Date(startTime) >= new Date(endTime)) {
        throw new Error('Start time must be before end time');
    }

    return db.run(
        'INSERT INTO breaks (employee_id, start_time, end_time) VALUES (?, ?, ?)',
        [employeeId, startTime, endTime]
    );
}

function deleteBreak(breakId, employeeId) {
    if (!breakId || !employeeId) {
        throw new Error('Break ID and Employee ID are required');
    }

    return db.run(
        'DELETE FROM breaks WHERE id = ? AND employee_id = ?',
        [breakId, employeeId]
    );
}

function getBreaksByTimeRange(startTime, endTime) {
    if (!startTime || !endTime) {
        throw new Error('Start time and end time are required');
    }
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
    }
    
    if (start >= end) {
        throw new Error('Start time must be before end time');
    }

    return db.query(
        `SELECT breaks.*, employees.name as employee_name 
         FROM breaks 
         JOIN employees ON breaks.employee_id = employees.id
         WHERE start_time >= ? AND end_time <= ?
         ORDER BY start_time`,
        [start.toISOString(), end.toISOString()]
    );
}

module.exports = {
    addBreak,
    deleteBreak,
    getBreaksByTimeRange
} 