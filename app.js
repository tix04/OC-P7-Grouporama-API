const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/authentication')

const app = express();

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());
  

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);


module.exports = app;