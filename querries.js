// queries.js

import pool from './db.js';

const queries = {
    viewDepartments: async () => {
        const res = await pool.query(`SELECT * FROM department`);
        return res.rows;
    },

    viewRoles: async () => {
        const res = await pool.query(`SELECT * FROM role`); 
        return res.rows;
    }, 

    viewEmployees: async () => {
        const res = await pool.query(`SELECT * FROM employee`);
        return res.rows;
    },

    viewEmployeesByManager: async (managerId) => {
        const res = await pool.query(`SELECT * FROM employee WHERE manager_id = $1`, [managerId]);
        return res.rows;
    },

    addDepartment: async (names) => {
        const res = await pool.query(
            `INSERT INTO department (names) VALUES ($1) RETURNING *`,
            [names]
        );
        return res.rows[0];
    },

    addRole: async (title, salary, departmentId) => {
        const
        res = await pool.query(
            `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *`,
            [title, salary, departmentId]
        );
        return res.rows[0];
    },

    addEmployee: async (firstName, lastName, roleId, managerId) => {
        const { rows } = await pool.query('SELECT * FROM role WHERE id = $1', [roleId]);
    if (rows.length === 0) {
        console.log(`Error: Role ID ${roleId} does not exist. Please enter a valid Role ID.`);
        return;
    }
        const res = await pool.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [firstName, lastName, roleId, managerId]
        );
        return res.rows[0];
    },

    updateEmployeeManager: async (employeeId, managerId) => {
        await pool.query(
            `UPDATE employee SET manager_id = $1 WHERE id = $2`,
            [managerId, employeeId]
        );
    },
    
    updateEmployeeRole: async (employeeId, roleId) => {
        await pool.query(
            `UPDATE employee SET role_id = $1 WHERE id = $2`,
            [roleId, employeeId]
        );
    },

    updateEmployeeDepartment: async (employeeId, departmentId) => {
        await pool.query(
            `UPDATE employee SET department_id = $1 WHERE id = $2`,
            [departmentId, employeeId]
        );
    },

    deleteDepartment: async (id) => {
        const res = await pool.query(
            `DELETE FROM department WHERE id = $1 RETURNING *`,
            [id]
        );
        return res.rows[0];
    },

    deleteEmployee: async (id) => {
        const res = await pool.query(
            `DELETE FROM employee WHERE id = $1 RETURNING *`,
            [id]
        );
        return res.rows[0];
    },
};

export default queries;
