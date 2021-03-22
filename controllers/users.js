const mySqlConnection = require('../middleware/databaseConnection');

//POST Create User Account
exports.createUser = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('New User has been added!');
        }

        const params = req.body;

        connection.query('INSERT INTO users SET ?', params, (err,rows) => { 
      
            connection.release();
      
            if(!err) {
              res.send(`New record with username: ${params.username} has been added!!`);
            }else {
              console.log(err);
            }
      
            console.log(req.body);
        }); 
    });

};

//Get one User by id
exports.getOneUser = (req, res, next) => {
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
            console.log('User Account has been deleted!!');
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
};

