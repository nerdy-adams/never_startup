const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '/../', '/dist/public/img/uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, 'img' + Date.now());
  }
});

exports.upload = multer({ storage: storage }).fields([{ name: 'bdImage', maxCount: 5 }, { name: 'bdFile', maxCount: 2 }]);