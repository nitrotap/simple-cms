SELECT
-- cms_role.id, title, salary, department_id FROM cms_role
title, salary FROM cms_role

LEFT JOIN department ON cms_role.department_id = department.id;
