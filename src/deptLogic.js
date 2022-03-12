const site = 'http://localhost:3001';
const fetch = require('node-fetch');
const inquirer = require('inquirer');

async function getDepartments() {
	let url = site + '/api/dept';
	let options = { method: 'GET' };
	let b = await fetch(url, options)
		.then(res => res.json());
	return b.data;
}

async function addDepartment() {
	let deptName = await inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Please enter a name for the new department (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
			
		}
	]);

	console.log(deptName.name);

	let url = site + '/api/dept';
	let options = { 
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify(deptName) 
	};
	let b = await fetch(url, options)
		.then(res => res.json());
		
	console.log(`${deptName.name} added!`);

	return b.data;
}

async function deleteDepartment() {
	let departmentData = await getDepartments();
	console.table(departmentData);
	let dept = await inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please enter the ID for the department to be deleted: (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
			
		}
	]);

	let url = site + `/api/dept/${dept.id}`;
	let options = {method: 'DELETE'};

	await fetch(url, options)
		.catch(err => console.error('error:' + err));
	
	console.log(`department ${dept.id} deleted!`);
}

module.exports = {getDepartments, addDepartment, deleteDepartment};