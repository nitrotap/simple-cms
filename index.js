require('dotenv').config();

const inquirer = require('inquirer');
const cTable = require('console.table');


const { addDepartment, deleteDepartment, getDepartments } = require('./src/deptLogic');
const { getRoles, addRole, deleteRole } = require('./src/roleLogic');
const { getEmployees, addEmployee, deleteEmployee, updateEmpRole } = require('./src/empLogic');



const menuQuestions = [
	{
		type: 'list',
		name: 'menuChoice',
		message: 'Please choose an option to continue: (Required)',
		choices: [
			'view all departments', 'add a department', 'delete a department',
			'view all roles', 'add a role', 'delete a role', 'update an employee role',
			'view all employees', 'add an employee', 'delete an employee', 'exit']
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
		// departments
		case 'view all departments': {
			getDepartments();
			break;
		}
		case 'add a department': {
			addDepartment();
			break;
		}
		case 'delete a department': {
			deleteDepartment();
			break;
		}

		// roles
		case 'view all roles': {
			getRoles();
			break;
		}
		case 'add a role': {
			addRole();
			break;
		}
		case 'delete a role': {
			deleteRole();
			break;
		}

		// employee
		case 'view all employees': {
			getEmployees();
			break;
		}
		case 'add an employee': {
			addEmployee();
			break;
		}
		case 'delete an employee': {
			deleteEmployee();
			break;
		}
		case 'update an employee role': {
			updateEmpRole();
			break;
		}

		case 'exit': {
			exit = false;
			break;
			// db.close or db.disconnect
		}
		default: {
			console.log('error');
		}}
	}
}

main();



