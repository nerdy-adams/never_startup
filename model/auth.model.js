const db = require('../libs/database.lib');
const colNmUser = "user";

exports.register = req => {
  req.colName = colNmUser;
  return db.connect(req).then(col => col.insertOne(req.user));
};

exports.findUserByEmail = req => {
  req.colName = colNmUser;
  return db.connect(req).then(col => col.findOne({email: req.user.email}));
};
exports.updateLoginDate = req => {
  req.colName = colNmUser;
  return db.connect(req).then(col => col.updateOne({email: req.user.email},{$set:{loginDate: Date.now()}}));
};

// delete req.colName;
// console.log(req.colName);