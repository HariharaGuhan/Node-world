
const mysql = require('mysql');


app.use(fileUpload());
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Msd@007,",
  database: "adhoc"
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Database Connected Successfully');
  }
});


app.post('/Create_user', (req, res) => {
  let { name, iso2 } = req.body;

  let sql = 'INSERT INTO country (name,iso2) VALUES (?, ?)';

  connection.query(sql, [name, iso2], (error, result) => {
    if (error) {
      let s = { "status": "error" };
      res.send(s);
      console.log(s);
    } else {
      let s = { "status": "Registered" };
      res.send(s);
      console.log(s);
    }
  });
});

app.get('/Get_user', (request, response) => {
  let sql = 'SELECT * FROM country';
  connection.query(sql, (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send(result);
    }
  });
});
app.delete('/Delete_user/:id', (request, response) => {
  let { id } = request.params;
  let sql = 'DELETE FROM country WHERE id = ?';
  connection.query(sql, [id], (error, result) => {
    if (error) {
      response.send(error);
    } else {
      
      response.send({ status: 'deleted' });
    }
  });
});

