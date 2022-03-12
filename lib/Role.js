const Department = require('./Department');

class Role extends Department {
	constructor(deptId, id, title, salary) {
		super(deptId);
		this.id = id;
		this.title = title;
		this.salary = salary;
	}

	getId() {
		return this.id;
	}

	getTitle() {
		return this.title;
	}

	getSalary() {
		return this.salary;
	}
}

module.exports = Role;