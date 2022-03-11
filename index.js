require('dotenv').config();

const db = require('./db/connection');

const inquirer = require('inquirer');
const {express, PORT, app} = require('./server');
const cTable = require('console.table');
const mysql = require('mysql2');



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

async function getDepartments() {
	const fetch = require('node-fetch');

	let url = '/api/dept';

	let options = {method: 'GET'};

	fetch(url, options)
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(err => console.error('error:' + err));
	
}

async function main() {
	let a = await getMenuOption();
	console.log(a);
	let b = getDepartments();
	console.log(b);


	
}



main();

