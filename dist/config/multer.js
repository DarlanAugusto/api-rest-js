"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const rand = () => Math.floor(Math.random() * 50000 + 50000);

exports. default = {
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return callback(new _multer2.default.MulterError('Arquivo precisa ser do tipo PNG ou JPEG.'));
    }
    return callback(null, true);
  },
  storage: _multer2.default.diskStorage({
    destination(req, file, callback) {
      callback(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}_${rand()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
