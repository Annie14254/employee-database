INSERT INTO department (id, name)
VALUES  (1, "Marketing"),
        (2, "HR"),
        (3, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Manager", "100000", 2),
        (2, "Placeholder", "80000", 3),
        (3, "Placeholder", "60000", 1),
        (4, "Placeholder", "40000", 2),
        (5, "Intern", "10", 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Jane", "Doe", 1, null),
        (2, "B", "C", 2, 1),
        (3, "D", "E", 3, 1),
        (4, "F", "G", 4, 8),
        (6, "H", "I", 5, 1),
        (7, "J", "K", 2, 8),
        (8, "L", "M", 1, null),
        (9, "N", "O", 3, 8),
        (10, "P", "Q", 4, 8);