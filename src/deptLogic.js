const inquirer = require('inquirer');
const db = require('../db/connection');

async function printDepartments() {
	const sql = `SELECT department.id AS 'ID', 
	department.name AS 'Name'
	FROM department;`; 
	let result = await db.query(sql);
	console.log();
	console.table(result[0]);
}

async function addDepartment() {
	let dept = await inquirer.prompt([
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
	const sql = 'INSERT INTO department (name) VALUES (?)';
	const params = dept.name;	
	let result = await db.query(sql, params);
	console.log(`${dept.name} added!`);
}

async function deleteDepartment() {
	let departmentData = await printDepartments();
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

	const sql = 'DELETE FROM department WHERE id = ?';

	await db.query(sql, dept.id);
	console.log(`department ${dept.id} deleted!`);
	printDepartments();
}

module.exports = {printDepartments, addDepartment, deleteDepartment};