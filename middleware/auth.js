const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => { 
  try {
    const token = req.headers.authorization.split(' ')[1];
    //const token = req.params;
    console.log( 'this is the token',token);
    const decodedToken = jwt.verify(token, 'GROUPORAMA_SECRET_TOKEN_P7'); 
   
    const userId = decodedToken.userID;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      console.log('succeeded auth test');
      req.userId = userId;
      next();
    }
  } catch(err) {
    res.status(401).json({
      error: err
    });
  }
};