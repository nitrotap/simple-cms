const db = require('../db/connection');

class Department {
	constructor(deptId, name) {
		this.deptId = deptId;
		this.name = name;
	}

	getDeptId() {
		return this.deptId;
	}

	getName() {
		return this.name;
	}

	// can write a single function to build queries, returning an object with the appropriate info
	// moving into class - writing general queries to create complex ones, or a mechanism that will dynamically generate queries (DO NOT DO FOR THIS ASSIGNMENT)
	static getById(id) {
		const sql = 'SELECT * from department WHERE department_id=?'; 
		db.query(sql, (err, rows) => { // object from database 
			if (err) {
				console.log(err);
				return;
			}
			console.log();
			console.table(rows);
		});
		return; 
	}

	
	async getDepartments() {
		// let url = site + '/api/dept';
		// let options = { method: 'GET' };

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


}

/* take an object with the same type of row 


*/

module.exports = Department;