const express = require('express');
//const busBoy = require('connect-busboy')
const bodyParser = require('body-parser');
//const mySql = require('mysql');
//const fileUpload = require('express-fileupload')
const path = require('path');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

const app = express();

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());
  

// This is where all codes go
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/user', userRoutes);


module.exports = app;