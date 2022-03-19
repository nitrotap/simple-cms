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

('Sales Lead', '75000', '1'), 
('Salesperson', '75000', '1'), 
('Lead Engineer', '75000', '2'), 
('Software Engineer', '75000', '2'), 
('Account Manager', '75000', '3'), 
('Accountant', '75000', '3'), 
('Legal Team Lead', '75000', '4'), 
('Lawyer', '75000', '4'),
('Service Person', '55000', '5');


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('William', 'Bradford', 1, 1),
('Anne', 'Bradstreet', 2, 1),
('Cotton', 'Mather', 3, 1),
('William', 'Penn', 4, 1),
('Abigail', 'Adams', 5, 1),
('Willa', 'Cather', 6, 1),
('Mary', 'Chase', 7, 1),
('Jane', 'Cowl', 8, 1);



