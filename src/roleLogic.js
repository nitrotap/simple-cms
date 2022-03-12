const inquirer = require('inquirer');
const db = require('../db/connection');


async function getRoles() {
	const sql = 'SELECT * from cms_role'; 
	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
		console.table(rows);
	});

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

	const sql = 'INSERT INTO cms_role (title, salary, department_id) VALUES (?, ?, ?)';
	const params = [role.title, role.salary, role.deptId];

	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
	});
	console.log(`${role.title} added!`);
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

	const sql = 'DELETE FROM cms_role WHERE id = ?';

	db.query(sql, role.id, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
	});
	
	console.log(`role ${role.id} deleted!`);
}

module.exports = {getRoles, addRole, deleteRole};