const express = require('express')
const bodyParser = require('body-parser');
const mySql = require('mysql');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());
  //app/use(bodyParser.urlencoded({ extended: false}));
  
/* mySQL codes Set connection to mysql database: Code is here
const pool = mySql.createPool({ 
  connectionLimit : 10,  //Maximum connection allowed. See Documentation
  host            : 'localhost', //Where database is hosted
  user            : 'root',      //username
  password        : '',          //password
  database        : 'grouporama' //Which database to access
}) */

// This is where all codes go
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

  module.exports = app;