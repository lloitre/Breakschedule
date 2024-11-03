const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const employeeService = require('./services/employees');
const breakService = require('./services/breaks');

app.use(express.json());

// Add auth middleware
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Apply to protected routes
app.use('/employees', authMiddleware);

// Get all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (err) {
        console.error('Error getting employees:', err);
        res.status(500).json({ error: 'Failed to retrieve employees' });
    }
});

// Add new employee
app.post('/employees', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name?.trim()) {
            return res.status(400).json({ error: 'Valid name is required' });
        }
        const result = await employeeService.addEmployee(name);
        res.status(201).json({ id: result.lastInsertRowid, name });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

// Add break for employee
app.post('/employees/:id/breaks', async (req, res) => {
    try {
        const { id } = req.params;
        const { startTime, endTime } = req.body;
        
        if (!startTime || !endTime) {
            return res.status(400).json({ error: 'Start time and end time are required' });
        }

        // Validate times are in correct format and startTime is before endTime
        if (new Date(startTime) >= new Date(endTime)) {
            return res.status(400).json({ error: 'Start time must be before end time' });
        }

        const result = await breakService.addBreak(id, startTime, endTime);
        res.status(201).json({ 
            id: result.lastInsertRowid,
            employeeId: id,
            startTime,
            endTime
        });
    } catch (err) {
        console.error('Error adding break:', err);
        res.status(500).json({ error: 'Failed to add break' });
    }
});

// Get employee breaks
app.get('/employees/:id/breaks', async (req, res) => {
    try {
        const { id } = req.params;
        const breaks = await breakService.getEmployeeBreaks(id); // Corrected service call
        res.json(breaks);
    } catch (err) {
        console.error('Error getting breaks:', err);
        res.status(500).json({ error: 'Failed to retrieve breaks' });
    }
});

app.listen(port, () => {
    console.log(`Break schedule app listening at http://localhost:${port}`);
}); 