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
  let image_url =  url + '/images/' + profileImage.filename; 
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
    const userID = req.userId;
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('User Information retrieved!');
        }

        connection.query('SELECT * from users WHERE user_id = ?',[userID], (err,rows) => { 
            connection.release();
      
            if(!err) {
              res.send(rows);
            }else {
              console.log(err);
            }
        }); 
    });
};

//PUT(modify)/Update profile picture for user
exports.modifyProfilePhoto = (req, res, next) => {
 let url = req.protocol + '://' + req.get('host');
 let newProfilePhoto = req.file;
 let userID = req.userId;
 let updatedImageUrl = url + '/images/' + newProfilePhoto.filename;
  console.log('this is the new profile Photo!!', userID, updatedImageUrl);

  mySqlConnection.getConnection((err, connection) => {
    if(err) {
      throw err;
    }else {
      console.log('Profile Image has been updated!');
    }

    connection.query('UPDATE users SET profile_image = ? WHERE user_id = ?',[updatedImageUrl, userID], (err, rows) => {

      connection.release();

      if(!err) {
        res.send('Profile Photo has been updated');
      }else {
        console.log(err);
      }

    });
  });
  
};

//PUT(modify)/Update username for User
exports.modifyUsername = (req, res, next) => {
  const userID = req.userId;
  const username = req.body.username;

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err;
        }else{
          console.log('Username has been updated!');
        }
        
        connection.query('UPDATE users SET username = ? WHERE user_id = ?',[username, userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`Username has been updated!!`);
            }else {
              console.log(err);
            }
      
            
        }); 
    });
};

//PUT(modify)/Update password for User
exports.modifyUserPassword = (req, res, next) => {
    const userID = req.userId;
    const password = req.body.newPassword;

    console.log(userID, password);
    //res.send('Password Data received!!');
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User password has been updated!');
        }
        

        connection.query('UPDATE users SET password = ? WHERE user_id = ?',[password, userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`User Password has been updated!!`);
            }else {
              console.log(err);
            }
      
            
        }); 
    });
};

//PUT(modify)/Update first_name for User
exports.modifyFirstName = (req, res, next) => {
    const userID = req.userId;
    const firstName = req.body.firstName;

    
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err;
        }else{
          console.log('User first name has been updated!');
        }
        

        connection.query('UPDATE users SET first_name = ? WHERE user_id = ?',[firstName, userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send('User First Name has been updated!!');
            }else {
              console.log(err);
            }
      
            
        }); 
    });
};

//PUT(modify)/Update last_name for User
exports.modifyLastName = (req, res, next) => {
    const userID = req.userId;
    const lastName = req.body.lastName;

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err;
        }else{
          console.log('User Last Name has been updated!');
        }
        

        connection.query('UPDATE users SET last_name = ? WHERE user_id = ?',[lastName, userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send('Your Last Name has been updated!!');
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//PUT(modify)/Update age for User
exports.modifyUserAge = (req, res, next) => {
    const userID = req.userId;
    const age = req.body.age;
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User age has been updated!');
        }
        

        connection.query('UPDATE users SET age = ? WHERE user_id = ?',[age, userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send('Your Age has been updated!!');
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};

//PUT(modify)/Update email for User
exports.modifyUserEmail = (req, res, next) => {
    const userID = req.userId;
    const email = req.body.email;
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
          throw err
        }else{
          console.log('User email has been updated!');
        }
        

        connection.query('UPDATE users SET email = ? WHERE user_id = ?',[email, userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`Email of User has been updated!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });
};


//DELETE User account

exports.deleteUser = (req, res, next) => {
  const userID = req.userId;

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log(`User Account has been deleted!!`);
        }

        /*
        *const query1 = 'DELETE from comments WHERE user_id = userID';
        const query2 = 'DELETE from posts WHERE user_id = userID';
        const query3 = 'DELETE from users WHERE user_id = userID';

        const allQueries = query1 + ';' + query2 + ';' + query3;
        */
        connection.query('DELETE from users WHERE user_id = ?',[userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`User Account has been deleted!!`);
            }else {
              console.log(err);
            }
        }); 
    });
};

