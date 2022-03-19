const inquirer = require('inquirer');
const db = require('../db/connection');
const { getRoles } = require('./roleLogic');

const empRoles = ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'];

async function getEmployees() {
	const sql = `
	SELECT 
	m.id AS 'ID', 
	m.first_name AS 'First Name', 
	m.last_name AS 'Last Name', 
	cms_role.title AS 'Role', 
	employee.first_name AS "Manager's First Name", 
	employee.last_name AS "Manager's Last Name",
	department.name AS 'Department Name',
	cms_role.salary AS 'Salary'
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
		// {
		// 	type: 'list',
		// 	name: 'roleTitle',
		// 	message: 'Please select a role for the new employee (Required)',
		// 	choices: empRoles,
		// 	validate: (userInput) => {
		// 		if (userInput) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	}
		// },
		{
			type: 'input',
			name: 'roleId',
			message: 'Please enter a role id for the new employee (Required)',
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

	const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';

	const params = [employee.firstName, employee.lastName, employee.roleId, employee.managerId];

	try {
		let result = await db.query(sql, params);
	} catch (err) {
		console.log(err);
	}
	console.log(`${employee.firstName} ${employee.lastName} added!`);
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

	let roleData = await getRoles();
	let role = await inquirer.prompt([
		// {
		// 	type: 'list',
		// 	name: 'newRole',
		// 	message: 'Please choose a new role the for employee: (Required)',
		// 	choices: empRoles,
		// 	validate: (userInput) => {
		// 		if (userInput) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	}
		// },
		{
			type: 'input',
			name: 'newRoleId',
			message: 'Please enter the new role Id for the employee (Required)',
			validate: (userInput) => {
				if (userInput) {
					return true;
				} else {
					return false;
				}
			}
		},
	]);

	const sql = 'UPDATE employee SET role_id=? WHERE id=?';
	const params = [role.newRoleId, employee.id];
	
	let result = await db.query(sql, params);

	console.log(`employee ${employee.id} role updated to ${role.newRoleId}!`);


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

module.exports = {getEmployees, addEmployee, deleteEmployee, updateEmpRole};