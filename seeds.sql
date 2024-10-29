INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Finance');

INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 80000, 1), ('Sales Manager', 70000, 2), ('Accountant', 60000, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, NULL), ('Alice', 'Johnson', 3, 1);