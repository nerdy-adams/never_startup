const user = require('../model/user.model');
exports.page_main = (req, res) => {
  const { _id } = req.decoded;
  const findUserById = _id => {
    return new Promise((resolve, reject) => {
      if(!_id) reject(false);
      resolve(user.findUserById(req, _id));
    });
  }
  const respond = user => res.render('client/main', { hideNav: true , user: user}); 
  const onError = err => res.render('client/main', { hideNav: true, user: err });

  findUserById(_id)
  .then(respond)
  .catch(onError)
}
exports.page_home = (req,res) => {
  const { _id } = req.decoded;
  const findUserById = _id => {
    return new Promise((resolve, reject) => {
      if(!_id) reject(false);
      resolve(user.findUserById(req, _id));
    });
  }
  const respond = user => res.render('client/home', { hideNav: false , user: user}); 
  const onError = err => res.render('client/home', { hideNav: false , user: err });

  findUserById(_id)
  .then(respond)
  .catch(onError)
}
