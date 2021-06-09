const mySql = require('mysql');

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

