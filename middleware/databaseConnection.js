const mySql = require('mysql');

/*
******Local Database: Consult Readme file****
Local Database
const pool = mySql.createPool({ 
  connectionLimit : 50,  //Maximum connection allowed.
  host            : 'localhost', //Where database is hosted
  user            : '',          //username(Insert your username)
  password        : '',          //password(Insert your password)
  database        : '',          //Which database to access(Insert your database name)
  multipleStatements: true
});

module.exports = pool;
*/


//Remote Database
const pool = mySql.createPool({ 
  connectionLimit : 50,  //Maximum connection allowed.
  host            : 'us-cdbr-east-04.cleardb.com', //Where database is hosted
  user            : 'bf2afe28f844be',      //username
  password        : '6f821514',          //password
  database        : 'heroku_60b61fa467c9c1f', //Which database to access
  multipleStatements: true
});

module.exports = pool;

