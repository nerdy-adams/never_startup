const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const user = require('../controllers/user.controller');
const board = require('../controllers/board.controller');
const index = require('../controllers/index.controller');
const admin = require('../controllers/admin.controller');
const { verify } = require('../middleware/token.middleware');

router
  //------------//
  //--- auth ---//
  //------------//
  .post('/auth/register', auth.register)
  .post('/auth/login', auth.login)
  .get('/auth/logout', auth.logout)
 
  //------------//
  //--- user ---//
  //------------//
  .get('/user', verify, user.registerAndLoginForm)

  //-------------//
  //--- board ---//
  //-------------//
  .use('/board', verify)
  .get('/board', board.getBoardList)
  .get('/board/register', board.goBoardRegform)
  .post('/board/register', board.regBoard)
  .get('/board/:boardId', board.getBoardDetail)
  .get('/board/:boardId/modify', board.modifyBoardGet)
  .post('/board/:boardId/modify', board.modifyBoardPost)
  .get('/board/:boardId/delete', board.deleteBoard)

  //------------//
  //-- index  --//
  //------------//
  .get('/', verify, index.page_main)
  .get('/home', verify, index.page_home)

  //------------//
  //-- admin ---//
  //------------//
  .get('/admin', admin.page_dashboard) 
module.exports = router;
