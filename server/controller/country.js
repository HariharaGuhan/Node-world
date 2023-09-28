
app.post('/Create_user', (req, res) => {
    let { name, iso2 } = req.body;
  
    let sql = 'INSERT INTO country (name, iso2) VALUES (?, ?)';
  
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
  
    
    connection.end();
  });
  
  app.get('/View_user', (request, response) => {
      let sql = 'SELECT * FROM country';
      connection.query(sql, (error, result) => {
        if (error) {
          response.send(error);
        } else {
          response.send(result);
        }
      });
    });