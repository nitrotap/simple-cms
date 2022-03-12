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
('Salesperson', '75000', '5'),
('Accountant', '80000', '4'),
('Manager', '90000', '3'),
('Manager', '95000', '2'),
('Manager', '85000', '1');


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('FirstName', 'lastName', 1, 3),
('Kartik', 'Jevaji', 1, 1),
('Colby', 'Harris', 2, 2),
('Ray', 'Bradbury', 3, 3);



