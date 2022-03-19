use cms;

SELECT cms_role.id AS 'ID', 
cms_role.title AS 'Title', 
cms_role.salary AS 'Salary', 
department.name AS 'Department Name'
FROM cms_role
JOIN department 
ON cms_role.department_id = department.id;

SELECT 
m.id AS 'ID', 
m.first_name AS 'First Name', 
m.last_name AS 'Last Name', 
cms_role.title AS 'Role', 
employee.first_name AS "Manager's First Name", 
employee.last_name AS "Manager's Last Name",
department.name AS 'Department Name',
cms_role.salary AS 'Salary'
FROM employee
INNER JOIN employee m
ON employee.id = m.manager_id
JOIN cms_role
on cms_role.id = m.role_id
JOIN department
ON department.id = cms_role.department_id
;
