// queries.js
import pool from './db';

const getAllEmployees = async () => {
    const res = await pool.query(`SELECT * FROM employee`);
    return res.rows;
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const res = await pool.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [firstName, lastName, roleId, managerId]
    );
    return res.rows[0];
};

// Define other query functions like updateEmployeeManager, viewEmployeesByManager, deleteEmployee, etc.
module.exports = {
    getAllEmployees,
    addEmployee,
    // Export other functions here
};
