const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');
/*const fileUpload = require('express-fileupload');
const { profile } = require('console');*/


//POST Create User Account
exports.createUser = (req, res, next) => {
  let url = req.protocol + '://' + req.get('host');
  let formData = req.body;
  console.log(formData);
  let profileImage = req.file;
  console.log(profileImage);
  let image_url =  url + '/images/' + profileImage.filename; //TODO: Maybe better to use image path
  console.log(image_url);

 
  let newUser = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    age: formData.age,
    email: formData.email,
    username: formData.username,
    password: formData.password,
    profile_image: image_url
  };
  console.log(newUser);
  //res.send('retrieved new user data');
  
  mySqlConnection.getConnection((err, connection) => {
    if(err) {
        throw err;
    }else {
        console.log('New User has been added!');
    }

    const params = newUser;

    connection.query('INSERT INTO users SET ?', params, (err,rows) => { 
      
      connection.release();
      
      if(!err) {
        res.send(`New record with username: ${params.username} has been added!!`);
        //TODO: Check if user image is displayed try in posts
      }else {
        console.log(err);
      }
      
      
        }); 
    });

};

//Get one User by id
exports.getOneUser = (req, res, next) => {
    //Get user ID from token authentication or and use it as parameter for SQL Query
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('User Information retrieved!');
        }

        connection.query('SELECT * from users WHERE user_id = ?',[req.params.user_id], (err,rows) => { 
            connection.release();
      
            if(!err) {
              res.send(rows);
            }else {
              console.log(err);
            }
        }); 
    });
};

//PUT(modify)/Update username for User
exports.modifyUsername = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('Username has been updated!');
        }
        const params =  req.params.user_id;
        const {user_id, username, password, first_name, last_name, age, email} = req.body;

        connection.query('UPDATE users SET username = ? WHERE user_id = ?',[username, params], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`Username of User with id ${params} has been updated!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//PUT(modify)/Update password for User
exports.modifyUserPassword = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User password has been updated!');
        }
        const params =  req.params.user_id;
        const {user_id, username, password, first_name, last_name, age, email} = req.body;

        connection.query('UPDATE users SET password = ? WHERE user_id = ?',[password, params], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`Password of User with id ${params} has been updated!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//PUT(modify)/Update first_name for User
exports.modifyFirstName = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User first name has been updated!');
        }
        const params =  req.params.user_id;
        const {user_id, username, password, first_name, last_name, age, email} = req.body;

        connection.query('UPDATE users SET first_name = ? WHERE user_id = ?',[first_name, params], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`First Name of User with id ${params} has been updated!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//PUT(modify)/Update last_name for User
exports.modifyLastName = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User last name has been updated!');
        }
        const params =  req.params.user_id;
        const {user_id, username, password, first_name, last_name, age, email} = req.body;

        connection.query('UPDATE users SET last_name = ? WHERE user_id = ?',[last_name, params], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`Last Name of User with id ${params} has been updated!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//PUT(modify)/Update age for User
exports.modifyUserAge = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User age has been updated!');
        }
        const params =  req.params.user_id;
        const {user_id, username, password, first_name, last_name, age, email} = req.body;

        connection.query('UPDATE users SET age = ? WHERE user_id = ?',[age, params], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`Age of User with id ${params} has been updated!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//PUT(modify)/Update email for User
exports.modifyUserEmail = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User email has been updated!');
        }
        const params =  req.params.user_id;
        const {user_id, username, password, first_name, last_name, age, email} = req.body;

        connection.query('UPDATE users SET email = ? WHERE user_id = ?',[email, params], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`Email of User with id ${params} has been updated!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//DELETE User account

exports.deleteUser = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log(`User Account with user ID: ${[req.params.id]} has been deleted!!`);
        }

        /*
        *const query1 = 'DELETE from comments WHERE user_id = userID';
        const query2 = 'DELETE from posts WHERE user_id = userID';
        const query3 = 'DELETE from users WHERE user_id = userID';

        const allQueries = query1 + ';' + query2 + ';' + query3;
        */
        connection.query('DELETE from users WHERE user_id = ?',[req.params.user_id], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`User Account with user ID: ${[req.params.id]} has been deleted!!`);
            }else {
              console.log(err);
            }
        }); 
    });
};

