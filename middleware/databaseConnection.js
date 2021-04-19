const mySql = require('mysql');

const pool = mySql.createPool({ 
    connectionLimit : 10,  //Maximum connection allowed. See Documentation
    host            : 'localhost', //Where database is hosted
    user            : 'root',      //username
    password        : '',          //password
    database        : 'grouporama' //Which database to access
  });

  module.exports = pool;