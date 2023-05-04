INSERT INTO department (id, name)
VALUES  (1, "Marketing"),
        (2, "HR"),
        (3, "Finance"),
        (4, "Sales");
INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Manager", "100000", 2),
        (2, "HR Coordinator", "80000", 2),
        (3, "Sales Associate", "60000", 4),
        (4, "Marketing Specialist", "55000", 4),
        (5, "Intern", "10", 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Jane", "Doe", 1, null),
        (2, "Bob", "McGee", 2, 1),
        (3, "Guy", "Smith", 3, 1),
        (4, "Jennifer", "Wilson", 4, 2),
        (6, "Charles", "Harris", 5, 1),
        (7, "Susan", "Miller", 2, 3),
        (8, "Mary", "Johnson", 1, null),
        (9, "Laura", "Adams", 5, 8),
        (10, "Michael", "Hill", 4, 8);