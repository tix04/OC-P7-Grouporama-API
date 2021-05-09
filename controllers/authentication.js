const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');

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
                res.send("User successfully logged in");
                /*res.send({
                    "code": 200,
                    "message": "User succesfully logged in",
                    "data" : {
                    "userID": results[0].user_id
                    }
                });*/
            }else {
                res.send("Password does not match");
              /*res.send({
                "code": 206,
                "message": "Password does not match"
              });*/
            }
          }else {
            res.send("Username does not exist");
            /*res.send({
              "code": 206,
              "message": "Username does not exist"
            });*/
          }
        }
      });
    });
  };