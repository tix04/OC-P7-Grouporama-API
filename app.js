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
  
// mySQL codes Set connection to mysql database
const pool = mySql.createPool({ 
  connectionLimit : 10,  //Maximum connection allowed. See Documentation
  host            : 'localhost', //Where database is hosted
  user            : 'root',      //username
  password        : '',          //password
  database        : 'grouporama' //Which database to access
}) 

//GET all Posts from database
app.get('/posts', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('posts retrieved');
    }
    
    //Query(sqlString, callback) First method of retrieving something in database
    //Second method
    //Connects to database, * means everything, it specifies the table to retrieve data. query is the sql query for retrieving the data
    connection.query('SELECT * from posts', (err,rows) => {
      connection.release() //Returns the connection to pool???

      if(!err) {
        res.send(rows);
      }else {
        console.log(err);
      }
    }); 
  });
});

//GET all Users from database
app.get('/users', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('users retrieved');
    }
    
    connection.query('SELECT * from users', (err,rows) => {
      connection.release();

      if(!err) {
        res.send(rows);
      }else {
        console.log(err);
      }
    }); 
  });
});

//Get one User by id
app.get('/users/:user_id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('user referenced by id retrieved');
    }
    
    connection.query('SELECT * from users WHERE user_id = ?',[req.params.user_id], (err,rows) => { //Question mark is a placeholder, protection from SQL Injection attacks(How???)
      //[req.params.id] allows us to retrieve id passed from the browser to server
      connection.release();

      if(!err) {
        res.send(rows);
      }else {
        console.log(err);
      }
    }); 
  });
});


//Delete specific records based on id
app.delete('/users/:user_id', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('user referenced by id has been Deleted');
    }
    
    connection.query('DELETE from users WHERE user_id = ?',[req.params.user_id], (err,rows) => { 
      
      connection.release();

      if(!err) {
        res.send(`User Account with user ID: ${[req.params.id]} has been deleted!!`);
      }else {
        console.log(err);
      }
    }); 
  });
});

//Add a Record in a User Table: Pretty similar for users and post. Just enter the correct URL
app.post('/signup', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('New Record has been added!');
    }

    const params = req.body; 
    
    connection.query('INSERT INTO users SET ?',params, (err,rows) => { 
      
      connection.release();

      if(!err) {
        res.send(`New record with username: ${params.username} has been added!!`);
      }else {
        console.log(err);
      }

      console.log(req.body);
    }); 
  });
});

//Add a Record in a Post Table
app.post('/posts', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('New Record has been added!');
    }

    const params = req.body;
    
    connection.query('INSERT INTO posts SET ?',params, (err,rows) => { //Question mark is a placeholder, protection from SQL Injection attacks(How???)
      
      connection.release();

      if(!err) {
        res.send(`New post with title: ${params.title} has been added!!`);
      }else {
        console.log(err);
      }

      console.log(req.body);
    }); 
  });
});

//Update a user record
app.put('/users/:user_id', (req, res) => { //Just change this with post_id for posts
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('Record has been updated!');
    }
    const params =  req.params.user_id;
    const {user_id, username, password, first_name, last_name, age, email} = req.body;

    /**
     * TODO: Replace the below query with minimal parameters query
     */
    connection.query('UPDATE users SET username = ?, password = ?, first_name = ?, last_name = ?, age = ?, email = ? WHERE user_id = ?',[username, password, first_name, last_name, age, email,params], (err,rows) => { 
      
      connection.release();

      if(!err) {
        res.send(`User Record has been updated!!`);
      }else {
        console.log(err);
      }

      console.log(req.body);
    }); 
  });
});

//Update a post record
app.put('/posts/:post_id', (req, res) => { 
  pool.getConnection((err, connection) => {
    if(err) {
      throw err
    }else{
      console.log('Record has been updated!');
    }
    const params = req.params.post_id;
    const {post_id, time_created, user_id, likes, comments, content} = req.body;

    connection.query('UPDATE posts SET content = ? WHERE post_id = ?',[content, params], (err,rows) => { 
      
      connection.release();

      if(!err) {
        res.send(`User Record has been updated!!`);
      }else {
        console.log(err);
      }

      console.log(req.body);
    }); 
  });
});
  module.exports = app;