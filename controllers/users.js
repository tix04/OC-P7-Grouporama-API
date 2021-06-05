const mySqlConnection = require('../middleware/databaseConnection');
const jwt = require('jsonwebtoken');

//POST Create User Account
exports.createUser = (req, res, next) => {
  let url = req.protocol + '://' + req.get('host');
  
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let age = req.body.age;
  let email = req.body.email.toLowerCase();
  let username = req.body.username.toLowerCase();
  let password = req.body.password;

  let newUser, image_url, profileImage;
  
  if(req.file === null || req.file === undefined ) {
   
    newUser = {
      first_name: firstName,
      last_name: lastName,
      age: age,
      email: email,
      username: username,
      password: password
      
    };
  }else {
    profileImage = req.file;
    image_url =  url + '/images/' + profileImage.filename;

      newUser = {
        first_name: firstName,
        last_name: lastName,
        age: age,
        email: email,
        username: username,
        password: password,
        profile_image: image_url
      };
    }
  
    mySqlConnection.getConnection((err, connection) => {
      if(err) {
          throw err;
      }else {
          console.log('Your Account has been created!!');
      }
  
      const params = newUser;
      const query1 = 'INSERT INTO users SET ?';
      const query2 = 'SELECT user_id FROM users where username = ?';
  
      const fullQuery = query1 + ';' + query2;
  
      connection.query(fullQuery, [params, newUser.username], (err,rows) => { 
        
        connection.release();
        
        if(!err) {
          const token = jwt.sign(
            {userID: rows[0].insertId},
            'GROUPORAMA_SECRET_TOKEN_P7',
            { expiresIn: '24h' }
          );
  
          res.status(200).json({
            message: 'Your Account has been created!!',
            token: token
          });
  
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
  const username = req.body.username.toLowerCase();

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
        }); 
    });
};

//PUT(modify)/Update email for User
exports.modifyUserEmail = (req, res, next) => {

    const userID = req.userId;
    const email = req.body.email.toLowerCase();

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
        }); 
    });
};


//DELETE User account

exports.deleteUser = (req, res, next) => {
  
  const userID = req.userId;
  const totalPosts = req.body.totalPosts;


    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log(`User Account has been deleted!!`);
        }

        
        const query1 = 'DELETE from posts WHERE user_id = ?';
        const query2 = 'DELETE from users WHERE user_id = ?';
        const query3 = `UPDATE users SET viewed_posts = viewed_posts - ${totalPosts} WHERE viewed_posts > 0`;

        const allQueries = query1 + ';' + query2 + ';' + query3;
        
        connection.query(allQueries, [userID, userID], (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`User Account has been deleted!!`);
            }else {
              console.log(err);
            }
        }); 
    });
};

