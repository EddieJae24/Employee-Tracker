// queries.js
import pool from './db';

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
    
    addEmployee: async (firstName, lastName, roleId, managerId) => {
        const res = await pool.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [firstName, lastName, roleId, managerId]
        );
        return res.rows[0];
    },
    

    // Define other query functions like updateEmployeeManager, viewEmployeesByManager, deleteEmployee, etc.
};

export default queries;
