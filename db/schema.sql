-- DROP TABLE IF EXISTS employee;
-- DROP TABLE IF EXISTS role_db;
-- DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- CREATE TABLE cms_role (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL NOT NULL,
--     department_id INTEGER(3) NOT NULL,
--     CONSTRAINT fk_deptId FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,

-- )

-- CREATE TABLE employee (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INTEGER AUTO_INCREMENT,
--     mangager_id INTEGER
-- )

