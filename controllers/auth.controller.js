const auth = require('../model/auth.model');
const crypto = require('../libs/crypto.lib');
const jwtLib = require('../libs/jwt.lib');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  let nickName = req.body.nickName; 
  let email = req.body.email; 
  let pw = req.body.pw; 

  const newUser = {
    nickName : nickName,
    email : email,
    pw : crypto.encryption(pw),
    role: 0,
    admin: false,
    profImg: null,
    status: 0,
    point: 0,
    like: 0,
    regDate : Date.now(),
    loginDate : null,
    modDate : null,
    blockDate : null,
    terminateDate : null
  }
  req.user = newUser;
  const dupEmail = (emailFromUser , emailFromDb) =>  emailFromUser == emailFromDb;
  const findUserByEmail = req => auth.findUserByEmail(req);
  const register = user => {
    if(user) res.redirect('/user');
    if(dupEmail(newUser.email , user)) res.redirect('/user');
    return auth.register(req);
  } 
  const respond = () => res.redirect('/user');
  const onError = (error) => {
    res.status(403).json({
        message: error.message
    })
  }
  findUserByEmail(req)
    .then(register)
    .then(respond)
    .catch(onError);
}

exports.login = (req, res) => {
  const loginUser = {
    email : req.body.email,
    pw : crypto.encryption(req.body.pw)
  }
  req.user = loginUser;
  let userFromDb = '';
  if(loginUser.email) {
    const dupPw = (pwFromUser, pwFromDb) => pwFromUser == pwFromDb;
    const findUserByEmail = req => auth.findUserByEmail(req);
    const updateLoginDate = user => {
      return new Promise((resolve, reject) => {
        if(!user) reject();
        if(!dupPw(loginUser.pw, user.pw)) reject();
        userFromDb = user;
        resolve(auth.updateLoginDate(req));
      });
    }
    const giveNewToken = () => jwtLib.createJWT(userFromDb);
    const respond = (token) => res.render('./client/include/_setToken',{token: token});
    const onError = (error) => {
      res.redirect('/user');
      // res.status(403).json({
      //     message: error.message
      // })
    }
    findUserByEmail(req)
      .then(updateLoginDate)
      .then(giveNewToken)
      .then(respond)
      .catch(onError)
  } 
  else res.redirect('/user');
}
exports.logout = (req, res) => {
  const token = req.cookies.token;
  res.render('./client/include/_deleteToken',{token: token});
}