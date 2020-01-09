const db = require('../libs/database.lib');
const colNmBoard = 'board';
const { ObjectID } = require('mongodb');
// exports.regBoard = req => {
//   req.colName = colNmBoard;
//   return db.connect(req).then(col => col.insertOne(req.board));
// };

// exports.getBoardList = req => {
//   req.colName = colNmBoard;
//   return db.connect(req).then(col => col.find({}).toArray().then(console.log('ok')));
// };

// exports.findUser = req => {
//   req.colName = colNmBoard;
//   return db.connect(req).then(col => col.findOne({}).toArray().then(console.log('ok')));

// }
exports.boardModel = req => {
  req.colName = colNmBoard;

  return {
    regBoard : () => {
      return db.connect(req).then(col => col.insertOne(req.board));
    },
    getBoardList : () => {
      return db.connect(req).then(col => col.find({}).toArray().then(console.log('ok')));
    }
  }


}
// delete req.colName;
// console.log(req.colName);