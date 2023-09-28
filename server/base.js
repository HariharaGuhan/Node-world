
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
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




// app.post('/api/insertData', async (req, res) => {
//     const {dataToInsert} = req.body; // Assuming the request body contains the data to insert
//   console.log(dataToInsert);
//     try {
//       const connection = await pool.getConnection();
//       const result = await connection.query('INSERT INTO country (name,iso2) VALUES (?, ?)', dataToInsert); // Replace your_table_name
//       console.log(result);
//       res.status(200).json({ message: 'Data inserted successfully.' });
//     } catch (error) {
//       console.error('Error inserting data:', error);
//       res.status(500).json({ message: 'Error inserting data.' });
//     }
//   });
// app.post('/api/insertData', (req, res) => {
//     console.log(req);
//     console.log(res);
//     const { id,name, iso2 } = req.body;
//     // Insert data into the destination database
//     const insertQuery = `INSERT INTO country (id,name, iso2) VALUES (?, ?)`;
//     connection.query(insertQuery, [id,name, iso2], (err, result) => {
//       if (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         console.log('Data inserted successfully');
//         res.status(200).json({ message: 'Data inserted successfully' });
//       }
//     });
//   });
app.post('/api/insertData', (req, res) => {
    const dataToInsert = req.body.data; // This should be an array of objects
  
    // Assuming you have a MySQL table named 'your_table_name'
    const query = 'INSERT INTO country (id, name,iso2) VALUES ?';
  
    const values = dataToInsert.map((item) => [item.id, item.name, item.iso2]);
  
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data into the database');
      } else {
        console.log('Data inserted into the database');
        res.status(200).send('Data inserted into the database');
      }
    });
  });


app.listen(3001, () => {
  console.log(`Server Is running on port Number: 3001 `);
});

