import inquirer from 'inquirer';
import pool from './db';
import queries from './queries';

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
              'Delete employee',
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
          await viewEmployeesByManagerPrompt();
          break;

      case 'Delete employee':
          await deleteEmployeePrompt();
          break;

      case 'Exit':
          pool.end();
          console.log("Goodbye!");
          return;
  }
  mainMenu(); // Re-run the menu after action completes
};

// Additional prompts for collecting inputs
//  
const viewAllEmployeesPrompt = async () => {
  const employees = await queries.viewEmployees();
  return employees;
};

const addEmployeePrompt = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      { type: 'input', name: 'firstName', message: 'First name:' },
      { type: 'input', name: 'lastName', message: 'Last name:' },
      { type: 'input', name: 'roleId', message: 'Role ID:' },
      { type: 'input', name: 'managerId', message: 'Manager ID (optional):' }
  ]);

  const newEmployee = await queries.addEmployee(firstName, lastName, roleId, managerId || null);
  console.log('Employee added:', newEmployee);
};


// Update employee manager
const updateEmployeeManagerPrompt = async () => {
  // Fetch all employees to select the employee and manager
  const employees = await queries.getAllEmployees();
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

// View employees by manager
const viewEmployeesByManagerPrompt = async () => {
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
  if (employeesByManager.length) {
      console.table(employeesByManager);
  } else {
      console.log('No employees found for this manager.');
  }
};

const deleteEmployeePrompt = async () => {
  const employees = await queries.getAllEmployees();
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


mainMenu();