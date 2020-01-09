const db = require('../libs/database.lib');
const { ObjectID } = require('mongodb');
const colNmUser = 'user';

exports.findUserById = (req, _id)=> {
  req.colName = colNmUser;
  return db.connect(req).then(col => col.findOne({'_id': ObjectID(_id)}));
};

// User Model
exports.userModel = req => {
  req.colName = colNmUser;

  return {
    getUserInfo : () => {
      console.log('>>> user.model :) findUser - ', req.userId);
      return db.connect(req).then(col => col.findOne({"_id": ObjectID(req.userId)}).then(result => console.log('ddddddddddddd',result)));
    }
  }

}