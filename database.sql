CREATE TABLE tasks
(
    id SERIAL PRIMARY KEY,
    task VARCHAR (250) NOT NULL,
    completed VARCHAR(250) NOT NULL
);

INSERT INTO tasks(task, completed) VALUES('wash the dishes', 'No');
INSERT INTO tasks(task, completed)VALUES('take dog for walk', 'No');
INSERT INTO tasks(task, completed)VALUES('get groceries', 'No');

