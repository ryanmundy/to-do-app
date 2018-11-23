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
    const queryString = 'SELECT * FROM tasks ORDER BY "id" ASC;';
    pool.query(queryString).then((results) => {
        //send results back to client
        res.send(results.rows);
    }).catch((err) => {
        //errors
        console.log('error retrieving data:', err);
    })//end query
});//end test route