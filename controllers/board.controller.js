const moment = require('moment');
const { boardModel } = require('../model/board.model');
const { userModel } = require('../model/user.model');
const form = require('formidable').IncomingForm();

// go to board register form
exports.goBoardRegform = (req, res) => {
  const onError = err => res.send('<script> alert("잘못된 접근"); document.location.href="/";</script>');
  const { _id } = req.decoded;

  if(!_id) onError();
  res.render('client/add');
}
exports.regBoard = (req, res) => {
  console.log(' >>> board.controller :) regBoard start <<< ');

  const onError = err => res.send('<script> alert("잘못된 접근"); document.location.href="/";</script>');
  const { _id } = req.decoded;
  console.log('req.decoded : ', _id);
  if(!_id) onError();
  req.userId = _id;

  // get login userInfo
  userModel(req).getUserInfo()
  .then(result => {
    req.loginUser = result;
    console.log('ddddd', result);
    console.log('findeuser : ', req.loginUser);
  });

  form.parse(req, (err, fields, files) => {
    console.log('hello req - : ', req);
    // console.log('req.body - : ', fields);
    // console.log('req.body - : ', files);
    const newBoard = {
      userId : _id,
      bdCate : fields.bdCate,
      bdTitle : fields.bdTitle,
      bdContent : fields.bdContent,
      bdReg_at : Date.now()
    }
    req.board = newBoard;
    boardModel(req).regBoard()
      .then(result => {
        if(result) {
          // console.log('regBoard : ',result);
          res.redirect('/board');
        }
      });
  });
}
exports.getBoardList = (req, res) => {
  const chngDate = result => {
    return new Promise((resolve, reject) => {
      if(result) {
        // console.log(' >>> chngDate basic result : ', result);
        for(let i = 0; i < result.length; i++) {
          result[i].bdAddDate = moment(result[i].bdAddDate).format('YYYY-MM-DD');
        }
        // console.log(' >>> chngDate change result : ', result);
        resolve(result);
      }
    });
  }
  boardModel(req).getBoardList()
  .then(chngDate)
  .then(result => {
    // console.log(result);
    res.render('client/list', { boardList: result });
  });
}
exports.getBoardDetail = (req, res) => {
  const boardId = req.params.boardId;
  MongoClient.connect(dbInfo, (err, client) => {
    assert.equal(err, null);
    const db = client.db(dbName).collection(colName);
    db.findOne({'_id': ObjectID(boardId)}, (err, result) => {
      let imgNm = result.bdImage.imgChageNm;
      result.bdAddDate = moment(result.bdAddDate).format('YYYY-MM-DD');
      res.render('client/detail', { board: result, imgNm });
    });
    client.close();
  });
}
exports.modifyBoardGet = (req, res) => {
  const boardId = req.params.boardId;
  MongoClient.connect(dbInfo, (err, client) => {
    assert.equal(err, null);
    const db = client.db(dbName).collection(colName);
    db.findOne({'_id': ObjectID(boardId)}, (err, result) => {
      result.bdAddDate = moment(result.bdAddDate).format('YYYY-MM-DD');
      res.render('client/add', { board: result });
    });
    client.close();
  });
}
exports.modifyBoardPost = (req, res) => {
  const boardId = req.params.boardId;
  req.body.bdModifyDate = Date.now();
  MongoClient.connect(dbInfo, (err, client) => {
    assert.equal(err, null);
    const db = client.db(dbName).collection(colName);
    db.updateOne({'_id': ObjectID(boardId), 'bdAuthor': req.body.bdAuthor}, {$set: req.body}, (err, result) => {
      assert.equal(null, err);
      res.redirect(`client/board/${ boardId }`);
    });
    client.close();
  });
}
exports.deleteBoard = (req, res) => {
  const boardId = req.params.boardId;
  console.log(boardId);
  MongoClient.connect(dbInfo, (err, client) => {
    assert.equal(err, null);
    const db = client.db(dbName).collection(colName);
    db.deleteOne({'_id': ObjectID(boardId)}, (err, result) => {
      assert.equal(null, err);
      if(result.deletedCount === 1) res.redirect(`client/board`);
      else res.redirect(`client/board/${ boardId }`); 
    });
    client.close();
  });
}