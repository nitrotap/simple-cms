require('dotenv').config();

const db = require('./db/connection');

const inquirer = require('inquirer');
const { express, PORT, app } = require('./server');
const cTable = require('console.table');
const mysql = require('mysql2');
const fetch = require('node-fetch');
const site = 'http://localhost:3001';





const menuQuestions = [
	{
		type: 'list',
		name: 'menuChoice',
		message: 'Please choose an option to continue: (Required)',
		choices: ['view all departments', 'add a department', 'delete a department', 'view all roles', 'view all employees', 'add a role', 'add an employee', 'update an employee role', 'exit']
	}
];

async function getMenuOption() { // returns menu choice string
	let response = await inquirer.prompt(menuQuestions);
	return response.menuChoice;
}

// function getDepartmentsHTTP() {
// 	const http = require('http');

// 	const options = {
// 		'method': 'GET',
// 		'hostname': 'localhost',
// 		'port': '3001',
// 		'path': '/api/dept',
// 		'headers': {
// 			'Content-Length': '0'
// 		}
// 	};

// 	const req = http.request(options, function (res) {
// 		const chunks = [];

// 		res.on('data', function (chunk) {
// 			chunks.push(chunk);
// 		});

// 		res.on('end', function () {
// 			const body = Buffer.concat(chunks);
// 			console.log(body.toString());
// 			return body.toString();
// 		});
// 	});

// 	req.end();


// }

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


async function main() {

	let exit = true;
	while (exit) {
		let menuOption = await getMenuOption();
		switch (menuOption) {
		case 'view all departments': {
			let departmentData = await getDepartments();
			console.table(departmentData);
			break;
		}

		case 'add a department': {
			let departmentData = await addDepartment();
			console.table(departmentData);
			break;
		}

		case 'delete a department': {
			let departmentData = await deleteDepartment();
			console.table(departmentData);
			break;
		}


	
		case 'exit': {
			exit = false;
			break;
		}
		default: {
			console.log('error');
		}}
		
	}
}

main();



