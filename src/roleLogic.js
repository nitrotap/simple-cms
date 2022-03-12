const site = 'http://localhost:3001';
const fetch = require('node-fetch');
const inquirer = require('inquirer');

async function getRoles() {
	let url = site + '/api/role';
	let options = { method: 'GET' };
	let b = await fetch(url, options)
		.then(res => res.json());
	return b.data;
}

async function addRole() {
	// id, title, salary, department_id
	let role = await inquirer.prompt([
		{
			type: 'input',
			name: 'title',
			message: 'Please enter a title for the new role (Required)',
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
			name: 'salary',
			message: 'Please enter a salary for the new role (Required)',
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
			name: 'deptId',
			message: 'Please enter the department id for the new role (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		}
	]);

	console.log(role);

	let url = site + '/api/role';
	let options = { 
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify(role) 
	};
	let b = await fetch(url, options)
		.then(res => res.json());
		
	console.log(`${role.title} added!`);

	return b.data;
}

async function deleteRole() {
	let roleData = await getRoles();
	console.table(roleData);
	let role = await inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please enter the ID for the role to be deleted: (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
			
		}
	]);

	let url = site + `/api/role/${role.id}`;
	let options = {method: 'DELETE'};

	await fetch(url, options)
		.catch(err => console.error('error:' + err));
	
	console.log(`role ${role.id} deleted!`);
}

module.exports = {getRoles, addRole, deleteRole};