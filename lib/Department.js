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

}

module.exports = Department;