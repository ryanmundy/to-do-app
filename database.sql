CREATE TABLE tasks
(
    id SERIAL PRIMARY KEY,
    task VARCHAR (250) NOT NULL,
    completed VARCHAR(1) NOT NULL
);

INSERT INTO tasks(task, completed) VALUES('wash the dishes', 'N');
INSERT INTO tasks(task, completed)VALUES('take dog for walk', 'N');
INSERT INTO tasks(task, completed)VALUES('get groceries', 'N');

