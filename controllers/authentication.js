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
        }else {
          if(results.length > 0) {
            if(password === results[0].password) {
                console.log(results[0].user_id);
                const token = jwt.sign(
                    {userID: results[0].user_id},
                    'GROUPORAMA_SECRET_TOKEN_P7',
                    { expiresIn: '24h'}
                );
                //res.send("User successfully logged in");
                res.status(200).json({
                    message: "User succesfully logged in",
                    token: token,
                    profileImage: results[0].profile_image
                });
            }else {
                //res.send("Password does not match");
              res.status(401).json({
                message: "Password does not match"
              });
            }
          }else {
            //res.send("Username does not exist");
            res.status(401).json({
              message: "Username does not exist"
            });
          }
        }
      });
    });
  };