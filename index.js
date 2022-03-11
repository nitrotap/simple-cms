require('dotenv').config();

const db = require('./db/connection');

const inquirer = require('inquirer');
const { express, PORT, app } = require('./server');
const cTable = require('console.table');
const mysql = require('mysql2');
const fetch = require('node-fetch');





const menuQuestions = [
	{
		type: 'list',
		name: 'menuChoice',
		message: 'Please choose an option to continue: (Required)',
		choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
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

	let url = 'http://localhost:3001/api/dept';

	let options = { method: 'GET' };

	// let a = await fetch(url, options)
	// 	.then(res => res.json())
	// 	.then(json => console.log(json))
	// 	.catch(err => console.error('error:' + err));

	let b = await fetch(url, options)
		.then(res => res.json());
	// console.log(b);
	return b.data;
}


async function main() {
	let menuOption = await getMenuOption();
	console.log(menuOption);

	switch (menuOption) {
	case 'view all departments': {
		let departmentData = await getDepartments();
		// console.log(departmentData);

		console.table(departmentData);
		
		break;
	}

	default: {
		console.log('error');

	}
	}

}



main();

