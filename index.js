/* Write a code to handle 1. Viewing all departments, roles, and employees.
2. Adding a new department, role, and employee.
 3. Updating an employee's role. */


import seedDatabase from './db.js';
import inquirer from 'inquirer';
import pkg from 'pg';
const { db } = pkg;

// Rest of the code...
// Client.connect();

// viewDepartments();
async function viewDepartments() {
    const { rows } = await seedDatabase('SELECT * FROM department');
        console.table(rows);
        startApp();
    }

// async function viewDepartments() {
//   try {
//     const result = await seedDatabase.query("SELECT * FROM department");
//     console.table(result.rows);
//   } catch (error) {
//     console.error("Error viewing departments:", error);
//   }
//   startApp();
// }

  
// viewRoles();
async function viewRoles() {
    const { rows } = await db.query('SELECT * FROM role');
        console.table(rows);
        startApp();
    }

// viewEmployees();
async function viewEmployees() {
    const { rows } = await db.query('SELECT * FROM employee');
        console.table(rows);
        startApp();
    }



function addDepartment() {
        inquirer.prompt({
          name: 'name',
          message: 'Enter the department name:',
        }).then(async ({ name }) => {
          await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
          console.log(`Added department: ${name}`);
          startApp();
        });
      };
      
// addRole();
function addRole() {
        inquirer.prompt([
          {
            name: 'title',
            message: 'Enter the role title:',
          },
          {
            name: 'salary',
            message: 'Enter the role salary:',
          },
          {
            name: 'department_id',
            message: 'Enter the department ID:',
          },
        ]).then(async ({ title, salary, department_id }) => {
          await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
          console.log(`Added role: ${title}`);
          startApp();
        });
      };

// addEmployee();
function addEmployee() {
        inquirer.prompt([
          {
            name: 'first_name',
            message: 'Enter the employee first name:',
          },
          {
            name: 'last_name',
            message: 'Enter the employee last name:',
          },
          {
            name: 'role_id',
            message: 'Enter the role ID:',
          },
          {
            name: 'manager_id',
            message: 'Enter the manager ID:',
          },
        ]).then(async ({ first_name, last_name, role_id, manager_id }) => {
          await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
          console.log(`Added employee: ${first_name} ${last_name}`);
          startApp();
        });
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
