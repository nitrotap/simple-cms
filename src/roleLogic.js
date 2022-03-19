const inquirer = require('inquirer');
const db = require('../db/connection');


async function getRoles() {
	// const sql = 'SELECT * from cms_role'; 

	const sql = `SELECT cms_role.id AS 'ID', 
	cms_role.title AS 'Title', 
	department.name AS 'Department Name',
	cms_role.salary AS 'Salary'
	FROM cms_role
	JOIN department 
	ON cms_role.department_id = department.id;`;

	let result = await db.query(sql);
	console.log();
	console.table(result[0]);

}

async function getDeptList() {
	// const sql = `SELECT cms_role.title AS 'Title'
	// FROM cms_role;`;
	const sql = `SELECT department.id, department.name
	FROM department;`;
	let result = await db.query(sql);

	return result[0].map(dept => ({
		name: dept.name,
		value: dept.id
	}));
}
async function addRole() {
	// id, title, salary, department_id

	let deptList = await getDeptList();
	console.log(deptList);

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
			type: 'list',
			name: 'deptId',
			message: 'Please enter the department id for the new role (Required)',
			choices: deptList,
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

	let result = await db.query(sql, params);
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

	let result = await db.query(sql, role.id);
	console.log(`role ${role.id} deleted!`);
}

module.exports = {getRoles, addRole, deleteRole};