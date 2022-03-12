const Department = require('./Department');

class Role extends Department {
	constructor(deptId, roleId, title, salary) {
		super(deptId);
		this.roleId = roleId;
		this.title = title;
		this.salary = salary;
	}

	getRoleId() {
		return this.roleId;
	}

	getTitle() {
		return this.title;
	}

	getSalary() {
		return this.salary;
	}
}

module.exports = Role;