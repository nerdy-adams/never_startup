// Mongodb require
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const assert = require('assert');

// Database config
const DB_config = require('../.config/.database.config');

// Database info constant
const DB_name = DB_config.name;
const DB_url = DB_config.url;
const DB_user = DB_config.user;
const DB_pw = DB_config.pw;
const DB_port = DB_config.port;
const DB_info = `mongodb://${DB_user}:${DB_pw}@${DB_url}:${DB_port}/${DB_name}`;

// MongoClient 
  // Mongo connect
exports.connect = req => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DB_info, (err, client) => {
      if(!client) reject('err');
      req.client = client;
      resolve(client.db(DB_name).collection(req.colName));
    });
  });
}

  // 오류
// module.exports.connect = (req, function fn(col) {
//   MongoClient.connect(DB_info, (err, client) => {
//     assert.equal(err, null);
//     req.client = client;
//     let col =  client.db(DB_name).collection(req.colName);
//     return fn(col);
//   });
// });
  // auth.model
// return db.connect(req, (col) => { // undefined;
//   return col.insertOne(user); 
// })