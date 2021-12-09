INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Front Office'),
    ('Legal'),
    ('Software Engineering'),
    ('Web Design'),
    ('Social Media Marketing'),
    ('Human Resources'),
    ('Finance');

INSERT INTO roles (department_id, title, salary)
VALUES 
    (1, 'Sales Rep. Manager', 84000),
    (2, 'Secretary', 22000),
    (3, 'Paralegal', 62000),
    (4, 'Full Stack Developer', 75960),
    (5, 'Front-End Developer', 58990),
    (6, 'Social Media Manager', 65990),
    (7, 'HR Director', 55990),
    (8, 'Accountant', 55690);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Quiroz', 1, 1),
    ('Victoria', 'Sansberg', 2, null),
    ('Patricia', 'Singh', 3, null),
    ('Richard', 'Millburn', 4, null),
    ('Shawn', 'Grant', 5, null),
    ('Isaiah', 'Trujillo', 6, null),
    ('Taleah', 'Duchovny', 7, null),
    ('David', 'Wu', 8, null);