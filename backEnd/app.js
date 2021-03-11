const express = require('express')
const bodyParser = require('body-parser');
const mySql = require('mysql');

const app = express();

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());
  //app/use(bodyParser.urlencoded({ extended: false}));
  
// mySQL codes
const pool = mysql.createPool({ //what is this? Creates connection to database
  connectionLimit : 10,  //Maximum connection allowed. See Documentation
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'grouporama'
}) 






  module.exports = app;