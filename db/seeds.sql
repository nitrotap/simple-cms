INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal"),
("Service");

INSERT INTO cms_role (title, salary, department_id)
VALUES
-- id, title, salary, department_id
('Manager', '100000', '5'),
('Sales Lead', '55000', '1'), 
('Salesperson', '45000', '1'), 
('Lead Engineer', '75000', '2'), 
('Software Engineer', '65000', '2'), 
('Manager', '70000', '3'), 
('Accountant', '60000', '3'), 
('Legal Team Lead', '90000', '4'), 
('Lawyer', '85000', '4'),
('Service Person', '45000', '5');


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('William', 'Bradford', 1, 1),
('Anne', 'Bradstreet', 2, 1),
('Cotton', 'Mather', 3, 6),
('William', 'Penn', 4, 6),
('Abigail', 'Adams', 5, 1),
('Willa', 'Cather', 6, 6),
('Mary', 'Chase', 7, 1),
('Jane', 'Cowl', 8, 1);

