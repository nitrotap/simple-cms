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

	static getById(id) {
		const sql = 'SELECT * from department WHERE department_id=?'; 
		db.query(sql, id, (err, rows) => { // object from database 
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