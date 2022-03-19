const inquirer = require('inquirer');
const db = require('../db/connection');

const empRoles = ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'];

async function getEmployees() {
	const sql = 'SELECT * from employee'; 
	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
		console.table(rows);
	});
}

async function addEmployee() {
	// id, first_name, last_name, role_id, manager_id
	let employee = await inquirer.prompt([
		{
			type: 'input',
			name: 'firstName',
			message: 'Please enter the new employee\'s first name (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		},
		{
			type: 'input',
			name: 'lastName',
			message: 'Please enter the new employee\'s last name (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		},
		{
			type: 'list',
			name: 'roleTitle',
			message: 'Please select a role id for the new employee (Required)',
			choices: [1, 2, 3, 4, 5, 6, 7, 8],
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		},
		{
			type: 'input',
			name: 'managerId',
			message: 'Please enter the manager id for the new employee (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		}
	]);

	const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
	const params = [employee.firstName, employee.lastName, employee.roleTitle, employee.managerId];

	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
	});
	console.log(`${employee.firstName} ${employee.lastName} added!`);
}

async function updateEmpRole() {
	let employeeData = await getEmployees();
	console.table(employeeData);
	let employee = await inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please enter the ID for the employee to be updated: (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
			
		}
	]);

	let role = await inquirer.prompt([
		{
			type: 'list',
			name: 'newRole',
			message: 'Please choose a new role the for employee: (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		}
	]);

	const sql = 'UPDATE ';


}

async function deleteEmployee() {
	let employeeData = await getEmployees();
	console.table(employeeData);
	let employee = await inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please enter the ID for the employee to be deleted: (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
			
		}
	]);

	const sql = 'DELETE FROM employee WHERE id = ?';

	db.query(sql, employee.id, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
	});

	
	console.log(`employee ${employee.id} deleted!`);
}

module.exports = {getEmployees, addEmployee, deleteEmployee, updateEmpRole};