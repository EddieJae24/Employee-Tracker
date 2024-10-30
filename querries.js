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

    viewEmployeesByDepartment: async (departmentId) => {
        const res = await pool.query(`SELECT * FROM employee WHERE department_id = $1`, [departmentId]);
        return res.rows;
    },
    

    addDepartment: async (name) => {
        const res = await pool.query(
            `INSERT INTO department (name) VALUES ($1) RETURNING *`,
            [name]
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

    addEmployee: async (firstName, lastName, roleId, managerId, departmentId) => {
       
        const res = await pool.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [firstName, lastName, roleId, managerId, departmentId]
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
            `UPDATE role SET department_id = $1 WHERE id = $2`,
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
