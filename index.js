require('dotenv').config();

const inquirer = require('inquirer');
const cTable = require('console.table');


const { addDepartment, deleteDepartment, printDepartments } = require('./src/deptLogic');
const { getRoles, addRole, deleteRole } = require('./src/roleLogic');
const { getEmployees, addEmployee, deleteEmployee, updateEmpRole, updateEmpManager } = require('./src/empLogic');



const menuQuestions = [
	{
		type: 'list',
		name: 'menuChoice',
		message: 'Please choose an option to continue: (Required)',
		choices: [
			'view all departments', 'add a department', 'delete a department',
			'view all roles', 'add a role', 'delete a role', 'update an employee role', 'update an employee\'s manager',
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
			await printDepartments();
			break;
		}
		case 'add a department': {
			await addDepartment();
			break;
		}
		case 'delete a department': {
			await deleteDepartment();
			break;
		}

		// roles
		case 'view all roles': {
			await getRoles();
			break;
		}
		case 'add a role': {
			await addRole();
			break;
		}
		case 'delete a role': {
			await deleteRole();
			break;
		}

		// employee
		case 'view all employees': {
			await getEmployees();
			break;
		}
		case 'add an employee': {
			await addEmployee();
			break;
		}
		case 'delete an employee': {
			await deleteEmployee();
			break;
		}
		case 'update an employee role': {
			await updateEmpRole();
			break;
		}
		case 'update an employee\'s manager': {
			await updateEmpManager();
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



