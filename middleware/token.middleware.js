const { tokenScrK } = require('../.config/.nota.config');
const jwt = require('jsonwebtoken')
exports.verify = (req, res, next) => {
  // const token = req.headers['x-access-token'] || req.query.token
  const token = req.cookies.token;
  jwt.verify(token, tokenScrK, (err, decoded) => {
    if(err) decoded = {};
    req.decoded = decoded;
    next();
  });
}
