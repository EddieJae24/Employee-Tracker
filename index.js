import inquirer from 'inquirer';
import pool from './db.js';
import queries from './querries.js';
import setupDatabase from './setupdb.js';

const initializeApp = async () => {
  await setupDatabase(); // Initialize the schema and seed data
  console.log('Database initialized.');
  mainMenu();  // Start the main application menu
};

initializeApp();

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
      {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
              'View all employees',
              'Add employee',
              'Update employee manager',
              'View employees by manager',
              'View employees by department',
              'Delete employee',
              'View all roles',
              'Add a role',
              'Update employee role',
              'View all departments',
              'Add a department',
              'Update employee department',
              'Exit'
          ]
      }
  ]);

  switch (action) {
      case 'View all employees':
          const employees = await viewAllEmployeesPrompt();
          console.table(employees);
          break;

      case 'Add employee':
          await addEmployeePrompt();
          break;

      case 'Update employee manager':
          await updateEmployeeManagerPrompt();
          break;

      case 'View employees by manager':
            const empByManager = await viewEmployeesByManagerPrompt();
              try {
                  console.table(empByManager);
              } catch (error) {
                  console.error('An error occurred while displaying employees by manager:', error);
              }
            break;
      
      case 'View employees by department':
            const empByDepartment = await viewEmployeesByDepartmentPrompt();
            try {
                console.table(empByDepartment);
            }
            catch (error) {
                console.error('An error occurred while displaying employees by department:', error);
            }
            break;
      
      case 'Delete employee':
          await deleteEmployeePrompt();
          break;

      case 'View all roles':
          const roles = await viewRolesPrompt();
          console.table(roles);
          break;

      case 'Add a role':
          await addRolePrompt();
          break;

      case 'Update employee role':
          await updateEmployeeRolePrompt();
          break;

      case 'View all departments':
          const departments = await viewDepartmentsPrompt();
          console.table(departments);
          break;

      case 'Add a department':
          await addDepartmentPrompt();
          break;

      case 'Update employee department':
          await updateEmployeeDepartmentPrompt();
          break;

      case 'Exit':
          pool.end();
          console.log("Goodbye!");
          return;
  }
  mainMenu(); // Re-run the menu after action completes
};
// this is the main function that will run the application

// Additional prompts for collecting inputs

// view all employees prompt
const viewAllEmployeesPrompt = async () => {
  const employees = await queries.viewEmployees();
  return employees;
};
// add department prompt
const viewRolesPrompt = async () => {
  const roles = await queries.viewRoles();
  return roles;
};

const viewEmployeesByManagerPrompt = async () => {
  try {
      const employees = await queries.viewEmployees();
      const managerChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

      const { managerId } = await inquirer.prompt([
          {
              type: 'list',
              name: 'managerId',
              message: 'Select a manager to view their employees:',
              choices: managerChoices
          }
      ]);

      const employeesByManager = await queries.viewEmployeesByManager(managerId);
      return employeesByManager;
  }
  catch (error) { 
    console.error('No employees found for this manager', error); 
  }


  // const employeesByManager = await queries.viewEmployeesByManager(managerId);
  // if (employeesByManager.length) {
  //     console.table(employeesByManager);
  // } else {
  //     console.log('No employees found for this manager.');

  }

// view all employee by department
const viewEmployeesByDepartmentPrompt = async () => {
    
    const departments = await queries.viewDepartments();
    const departmentChoices = departments.map(dep => ({ name: dep.name, value: dep.id }));
    
    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view employees:',
            choices: departmentChoices
        }
    ]);
    const employeesByDepartment = await queries.viewEmployeesByDepartment(departmentId);
    if (employeesByDepartment === null) {
        console.log('No employees found for this department.');
    } else {
        console.table(employeesByDepartment);
} 

  
    
};


const viewDepartmentsPrompt = async () => {
  const departments = await queries.viewDepartments();
  return departments;
};
// add employee prompt
const addEmployeePrompt = async () => {
  const { firstName, lastName, roleId, managerId, departmentId } = await inquirer.prompt([
      { type: 'input', name: 'firstName', message: 'First name:' },
      { type: 'input', name: 'lastName', message: 'Last name:' },
      { type: 'input', name: 'roleId', message: 'Role ID:' },
      { type: 'input', name: 'managerId', message: 'Manager ID (optional):' },
      { type: 'input', name: 'departmentId', message: 'Department ID:' }
  ]);

  const newEmployee = await queries.addEmployee(firstName, lastName, roleId, managerId, departmentId || null);
  console.log('Employee added:', newEmployee);
};

// add role prompt
const addRolePrompt = async () => {
  const departments = await queries.viewDepartments();
  const departmentChoices = departments.map(dep => ({ name: dep.name, value: dep.id }));

  const { title, salary, departmentId } = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Title:' },
      { type: 'input', name: 'salary', message: 'Salary:' },
      { type: 'list', name: 'departmentId', message: 'Department:', choices: departmentChoices }
  ]);

  const newRole = await queries.addRole(title, salary, departmentId);
  console.log('Role added:', newRole);
};

// add department prompt
const addDepartmentPrompt = async () => {
  const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Department name:' }
  ]);

  const newDepartment = await queries.addDepartment(name);
  console.log('Department added:', newDepartment);
};

// Update employee manager
const updateEmployeeManagerPrompt = async () => {
  // Fetch all employees to select the employee and manager
  const employees = await queries.viewEmployees();
  const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

  const { employeeId, managerId } = await inquirer.prompt([
      {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update their manager:',
          choices: employeeChoices
      },
      {
          type: 'list',
          name: 'managerId',
          message: 'Select the new manager for this employee:',
          choices: [...employeeChoices, { name: 'None', value: null }]  // Allow 'None' to set as no manager
      }
  ]);

  await queries.updateEmployeeManager(employeeId, managerId);
  console.log('Employee manager updated successfully.');
};

const updateEmployeeRolePrompt = async () => {
  const employees = await queries.viewEmployees();
  const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

  const roles = await queries.viewRoles();
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

  const { employeeId, roleId } = await inquirer.prompt([
      {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update their role:',
          choices: employeeChoices
      },
      {
          type: 'list',
          name: 'roleId',
          message: 'Select the new role for this employee:',
          choices: roleChoices
      }
  ]);

  await queries.updateEmployeeRole(employeeId, roleId);
  console.log('Employee role updated successfully.');
};

const updateEmployeeDepartmentPrompt = async () => {
  const employees = await queries.viewEmployees();
  const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

  const departments = await queries.viewDepartments();
  const departmentChoices = departments.map(dep => ({ name: dep.name, value: dep.id }));

  const { employeeId, departmentId } = await inquirer.prompt([
      {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update their department:',
          choices: employeeChoices
      },
      {
          type: 'list',
          name: 'departmentId',
          message: 'Select the new department for this employee:',
          choices: departmentChoices
      }
  ]);

  await queries.updateEmployeeDepartment(employeeId, departmentId);
  console.log('Employee department updated successfully.');
};



// View employees by manager


// delete employee prompt
const deleteEmployeePrompt = async () => {
  const employees = await queries.viewEmployees();
  const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

  const { employeeId } = await inquirer.prompt([
      {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to delete:',
          choices: employeeChoices
      }
  ]);

  await queries.deleteEmployee(employeeId);
  console.log('Employee deleted successfully.');
};


// mainMenu();