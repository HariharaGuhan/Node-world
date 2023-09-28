const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Msd@007,", // Remove the trailing comma
  database: "crud_app"
})

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Database Connected');
  }
});

app.listen(3003, () => {
    console.log('Server is running on port 3003');
  });

app.post('/Create_user', (request, response) => {
  let { name, email, phone, password } = request.body;
  let sql = 'INSERT INTO signup (username, password, name, email, phone, status) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [email, password, name, email, phone, 0], (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send(result);
    }
  });
});

app.get('/View_user', (request, response) => {
  let sql = 'SELECT * FROM signup';
  connection.query(sql, (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send(result);
    }
  });
});

app.get('/View_user_par/:id', (request, response) => {
  let { id } = request.params;
  let sql = 'SELECT * FROM signup WHERE id = ?';
  connection.query(sql, [id], (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send(result);
    }
  });
});

app.put('/Update_user/:id', (request, response) => {
  let { id } = request.params;
  let { name, phone } = request.body;
  let sql = 'UPDATE signup SET name = ?, phone = ? WHERE id = ?';
  connection.query(sql, [name, phone, id], (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send(result);
    }
  });
});

app.delete('/Delete_user/:id', (request, response) => { // Change to DELETE method
  let { id } = request.params;
  let sql = 'DELETE FROM signup WHERE id = ?';
  connection.query(sql, [id], (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send(result);
    }
  });
});

