INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Finance') ON CONFLICT (name) DO NOTHING;
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 80000, 1), ('Sales Manager', 70000, 2), ('Accountant', 60000, 3) ON CONFLICT (name) DO NOTHING;
INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Doe', 1), ('Jane', 'Smith', 2) ON CONFLICT (name) DO NOTHING;
