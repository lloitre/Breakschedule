const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('schedule.db'), {fileMustExist: true});

function query(sql, params = []) {
    try {
        return db.prepare(sql).all(params);
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

function run(sql, params = []) {
    try {
        return db.prepare(sql).run(params);
    } catch (error) {
        console.error('Database run error:', error);
        throw error;
    }
}

module.exports = {
    query,
    run
} 