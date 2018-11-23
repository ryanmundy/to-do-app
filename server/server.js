// requires
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
//uses
app.use(express.static('server/public/'));
app.use(bodyParser.urlencoded({ extended: true }));
//globals
const port = process.env.PORT || 5000;
//create pool for SQL connections
const Pool = pg.Pool;//class
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}); //end pool

pool.on('connect', () => {
    console.log('connected to DB');
})//end connect

pool.on('error', (err) => {
    console.log('error with DB:', err);
})//end error

//server
app.listen(port, (req, res) => {
    console.log('server up on:', port);
});

//GET
app.get('/tasks', (req, res) => {
    console.log('GET hit');
    //query to DB
    const queryString = 'SELECT * FROM tasks ORDER BY "completed" ASC;';
    pool.query(queryString).then((results) => {
        //send results back to client
        res.send(results.rows);
    }).catch((err) => {
        //errors
        console.log('error with GET', err);
        res.sendStatus(500);
    })//end query
});//end GET

//POST
app.post('/tasks', (req, res) => {
    console.log('POST hit', req.body);
    //query to DB
    const queryString = 'INSERT INTO tasks (task, completed) VALUES ($1, $2);';
    pool.query(queryString, [req.body.task, req.body.completed]).then(() => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('error with POST', err);
        res.sendStatus(500);
    });//end query
})//end POST

//DElETE
app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id; // id of the task to delete
    console.log('Delete called with id', id);
    pool.query(`DELETE FROM "tasks" WHERE id = $1;`, [id])
        .then((results) => {
            res.sendStatus(204);
        }).catch((err) => {
            console.log('error with DELETE', err);
            res.sendStatus(500);
        })
});//end DELETE

//PUT
app.put('/tasks/:id', (req, res) => {
    let id = req.params.id; // id of the task to update
    console.log('PUT called with id', id);
    pool.query(`UPDATE "tasks" SET "completed" = $1 WHERE "id" = $2;`, ['Y', id])
        .then((results) => {
            res.sendStatus(204);
        }).catch((err) => {
            console.log('error with PUT', err);
            res.sendStatus(500);
        })
});//end PUT