/* Write a code to handle 1. Viewing all departments, roles, and employees.
2. Adding a new department, role, and employee.
 3. Updating an employee's role. */


import inquirer from 'inquirer';
import db from './db';

async function viewDepartments() {
    const { rows } = await db.query('SELECT * FROM department');
        console.table(rows);
        startApp();
    };
      


function startApp() {
    inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }).then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          db.end();
          process.exit();
      }
    });
  }
  

startApp();
