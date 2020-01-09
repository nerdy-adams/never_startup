const jwt = require('jsonwebtoken');
const secret = require('../.config/.nota.config').tokenScrK;
exports.createJWT = (user) => { 
  const token = new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id : user._id
      },
      secret,
      {
        expiresIn: '7d'
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);  
      }
    )
  })
  return token;
}