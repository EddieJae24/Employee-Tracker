INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Finance');

INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 80000, 1), ('Sales Manager', 70000, 2), ('Accountant', 60000, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id) VALUES ('John', 'Doe', 1, NULL, NULL), ('Jane', 'Smith', 2, NULL, 1), ('Alice', 'Johnson', 3, 1, NULL), ('Bob', 'Williams', 1, 1, 1), ('Charlie', 'Brown', 2, 2, 2), ('Diana', 'Ross', 3, 3, 3);