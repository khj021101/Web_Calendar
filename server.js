const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

var path = require('path');
const { BADNAME } = require('dns');

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'khj021101!',
    database: 'CalendarDB'
})
connection.connect(err => {
    if(err){
        console.error('DB connection fail', err.stack);
        return;
    }
    console.log('DB connection success');
})

app.post('/todos', (req, res) => {
    const {id, title, start} = req.body;
    const sql = 'INSERT INTO todos (id, title, start) VALUES (?, ?, ?)';

    connection.query(sql, [id, title, start], (error, results)=> {
        if(error){
            console.error('Error inserting data: ', error);
            return res.status(500).send('Server Error');
        }
        res.status(201).json({id: results.insertId, title, date});
        });
    });

app.get('/todos', (req, res) => {
    const sql = 'select * from todos';
    connection.query(sql, (error, results)=>{
        if(error){
            console.error('Error fetching data', error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    })
})


app.listen(port, function(){
    console.log(`listening on ${port}`)
})
app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html')
})