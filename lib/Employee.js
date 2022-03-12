const Role = require('./Role');
class Employee extends Role {
	constructor(employeeId, firstName, lastName, roleId, managerId) {
		super(roleId);
		this.employeeId = employeeId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.managerId = managerId;
	}

	getEmployeeId() {
		return this.employeeId;
	}

	getFirstName() {
		return this.firstName;
	}

	getLastName() {
		return this.lastName;
	}

	getManagerId() {
		return this.employeeId;
	}
}