const mySql = require('mysql');

/*
******Local Database: Consult Readme file****
Local Database
const pool = mySql.createPool({ 
  connectionLimit : 50,  //Maximum connection allowed.
  host            : 'localhost', //Where database is hosted
  user            : 'root',      //username(Change to your username)
  password        : '',          //password(Change to your password)
  database        : 'grouporama', //Which database to access
  multipleStatements: true
});

module.exports = pool;
*/


//Remote Database
  const pool = mySql.createPool({ 
    connectionLimit : 50,  //Maximum connection allowed.
    host            : 'remotemysql.com', //Where database is hosted
    user            : 'dOjC9ES8Sr',      //username
    password        : 'R3jYdjbT10',          //password
    database        : 'dOjC9ES8Sr', //Which database to access
    multipleStatements: true
  });

  module.exports = pool;

