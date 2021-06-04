const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');

const jwt = require('jsonwebtoken');

//User Log In

exports.logIn = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    mySqlConnection.getConnection((err, connection) => {
      if(err) {
          throw err;
      }else {
          console.log('User Logged in Successfully!');
      }
  
      connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        
        connection.release();
  
        if (err) {
          res.send({
            "code": 400,
            "message": "error occured"
          });
        }else if(results.length === 0) {
          res.status(401).json({
            message: "Username does not exist"
          });
        }else if(results.length > 0) {
            if(password !== results[0].password) {
              res.status(401).json({
                message: "Password is Incorrect."
              });
            } else if(password === results[0].password) {
                console.log(results[0].user_id);
                const token = jwt.sign(
                    {userID: results[0].user_id},
                    'GROUPORAMA_SECRET_TOKEN_P7',
                    { expiresIn: '24h' }
                );
               
                res.status(200).json({
                    message: "User succesfully logged in",
                    token: token
                });
            }
        }
      });
    });
  };

exports.verifyUsername = (req, res, next) => {

  mySqlConnection.getConnection((err, connection) => {
    if(err) {
        throw err;
    }else {
        console.log('Username List sent!');
    }

    connection.query('SELECT username FROM users', (err, rows) => {
      
      connection.release();

      if(!err) {
        console.log(rows);
        let usernameList = [];
        for (let i = 0;i < rows.length;i++) {
          usernameList.push(rows[i].username);
        }
        console.log(usernameList);
        res.send(usernameList);
      }else {
        console.log(err);
      }
    });
  });
};

exports.verifyEmail = (req, res, next) => {

  mySqlConnection.getConnection((err, connection) => {
    if(err) {
        throw err;
    }else {
        console.log('Emails List Sent!');
    }

    connection.query('SELECT email FROM users', (err, rows) => {
      
      connection.release();

      if(!err) {
        console.log(rows);
        let emailList = [];
        for (let i = 0;i < rows.length;i++) {
          emailList.push(rows[i].email);
        }
        console.log(emailList);
        res.send(emailList);
      }else {
        console.log(err);
      }
    });
  });
};

exports.verifyPostsAmount = (req, res, next) => {
    let userID = req.userId;
    
  mySqlConnection.getConnection((err, connection) => {
    if(err) {
        throw err;
    }else {
        console.log('Your Total Posts Count has been sent!');
    }

    connection.query('SELECT COUNT(post_id) AS postsCount FROM posts WHERE user_id = ?', [userID], (err, rows) => {
      
      connection.release();

      if(!err) {
        console.log(rows);
        res.send(rows);
      }else {
        console.log(err);
      }
    });
  });
};