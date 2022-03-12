require('dotenv').config();

const db = require('./db/connection');
const inquirer = require('inquirer');

const { express, PORT, app } = require('./server');
const { addDepartment, deleteDepartment, getDepartments } = require('./src/deptLogic');
const cTable = require('console.table');
const mysql = require('mysql2');



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



