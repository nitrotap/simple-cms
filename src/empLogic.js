const site = 'http://localhost:3001';
const fetch = require('node-fetch');
const inquirer = require('inquirer');

async function getEmployees() {
	let url = site + '/api/emp';
	let options = { method: 'GET' };
	let b = await fetch(url, options)
		.then(res => res.json());
	return b.data;
}

async function addEmployee() {
	// id, first_name, last_name, role_id, manager_id
	let employee = await inquirer.prompt([
		{
			type: 'input',
			name: 'firstName',
			message: 'Please the new employee\'s first name (Required)',
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
			message: 'Please the new employee\'s last name (Required)',
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
			name: 'roleId',
			message: 'Please enter the role id for the new employee (Required)',
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

	console.log(employee);

	let url = site + '/api/emp';
	let options = { 
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify(employee) 
	};
	let b = await fetch(url, options)
		.then(res => res.json());
		
	console.log(`${employee.firstName} ${employee.lastName} added!`);

	return b.data;
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

	let url = site + `/api/emp/${employee.id}`;
	let options = {method: 'DELETE'};

	await fetch(url, options)
		.catch(err => console.error('error:' + err));
	
	console.log(`employee ${employee.id} deleted!`);
}

module.exports = {getEmployees, addEmployee, deleteEmployee};