SELECT 
id, 
first_name AS "First Name",
last_name AS "Last Name",

FROM employee

JOIN cms_role 
ON employee.role_id = cms_role.id;

SELECT * FROM cms_role;