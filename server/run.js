const express = require('express');
const app = express();
const router=require('./router/router');
require('./dbconnect/dbconnect')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',router)










app.listen(3001, () => {
    console.log(`Server Is running on port Number: 3001 `);
  });
