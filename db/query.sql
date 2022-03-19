use cms;

SELECT cms_role.id, cms_role.title, cms_role.salary, department.name
FROM cms_role
JOIN department 
ON cms_role.department_id = department.id;


SELECT employee.id, employee.first_name, employee.last_name, cms_role.title, employee.manager_id
FROM employee
JOIN cms_role
on cms_role.id = employee.role_id;

