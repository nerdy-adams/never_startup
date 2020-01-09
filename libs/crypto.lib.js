const crypto = require('crypto');

exports.encryption = (value) => {
  return crypto.createHmac('sha256', `${value}helloworld`).update(value).digest('hex');
} 
