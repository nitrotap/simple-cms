const inquirer = require('inquirer');
const db = require('../db/connection');
const { getRoles } = require('./roleLogic');

async function getRoleList() {
	// const sql = `SELECT cms_role.title AS 'Title'
	// FROM cms_role;`;
	const sql = `SELECT cms_role.id AS 'ID', 
	cms_role.title AS 'Title'
	FROM cms_role;`;
	let result = await db.query(sql);

	return result[0].map(role => ({
		name: role.Title,
		value: role.ID
	}));
}

async function getManagerList() {
	const sql = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS name
	FROM employee
	JOIN cms_role ON cms_role.id = employee.role_id
	WHERE cms_role.title = 'Manager';`;

	let result = await db.query(sql);

	return result[0].map(manager => ({
		name: manager.name,
		value: manager.id
	}));

}

async function getEmployees() {
	const sql = `
	SELECT 
	m.id AS 'ID', 
	m.first_name AS 'First Name', 
	m.last_name AS 'Last Name', 
	cms_role.title AS 'Job Title', 
	department.name AS 'Department',
	cms_role.salary AS 'Salary',
	CONCAT( employee.first_name, ' ', employee.last_name) AS "Manager's Name"
	FROM employee
	INNER JOIN employee m
	ON employee.id = m.manager_id
	JOIN cms_role
	on cms_role.id = m.role_id
	JOIN department
	ON department.id = cms_role.department_id
	;`; 

	let result = await db.query(sql);
	console.log();
	console.table(result[0]);

}

async function addEmployee() {
	// id, first_name, last_name, role_id, manager_id

	let empRoles = await getRoleList();

	let manList = await getManagerList();
	// console.log(manList);
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
			message: 'Please select a role for the new employee (Required)',
			choices: empRoles,
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
			name: 'managerId',
			message: 'Please choose a manager for the new employee (Required)',
			choices: manList,
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

	try {
		let result = await db.query(sql, params);
	} catch (err) {
		console.log(err);
	}
	console.log(`${employee.firstName} ${employee.lastName} added!`);
}

async function updateEmpManager() {
	let manList = await getManagerList();

	await getEmployees();
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


	let newManager = await inquirer.prompt([
		{
			type: 'list',
			name: 'managerId',
			message: 'Please choose a manager for the new employee (Required)',
			choices: manList,
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		}
	]);

	
	const sql = 'UPDATE employee SET manager_id=? WHERE id=?';
	const params = [newManager.managerId, employee.id];
	
	let result = await db.query(sql, params);

	console.log(`employee ${employee.id} manager updated to ${newManager.managerId}!`);
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

	let empRoles = await getRoleList();
	let role = await inquirer.prompt([
		{
			type: 'list',
			name: 'roleTitle',
			message: 'Please select a role for the new employee (Required)',
			choices: empRoles,
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		}
	]);

	const sql = 'UPDATE employee SET role_id=? WHERE id=?';
	const params = [role.roleTitle, employee.id];
	
	let result = await db.query(sql, params);

	console.log(`employee ${employee.id} role updated to ${role.roleTitle}!`);
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

	let result = await db.query(sql, employee.id);

	console.log(`employee ${employee.id} deleted!`);
}

module.exports = {getEmployees, addEmployee, deleteEmployee, updateEmpRole, updateEmpManager};