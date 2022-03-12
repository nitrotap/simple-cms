const inquirer = require('inquirer');
const db = require('../db/connection');


async function getDepartments() {
	const sql = 'SELECT * from department'; 
	db.query(sql, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
		console.table(rows);
	});
}

async function addDepartment() {
	let deptName = await inquirer.prompt([
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
	const params = deptName.name;	
	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
	});
	console.log(`${deptName.name} added!`);
}

async function deleteDepartment() {
	let departmentData = await getDepartments();
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

	db.query(sql, dept.id, (err, rows) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log();
	});
	console.log(`department ${dept.id} deleted!`);
}

module.exports = {getDepartments, addDepartment, deleteDepartment};