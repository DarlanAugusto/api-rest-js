"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

const upload = _multer2.default.call(void 0, _multer4.default).single('file');
class PhotoController {
  store(req, res) {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      if (!req.body.alunoId) {
        return res.status(400).json({
          errors: ['Informe o ID do aluno'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(req.body.alunoId);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno informado não existe'],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const photo = await _Photo2.default.create({ originalname, filename, aluno_id: req.body.alunoId });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
    });
  }
}

exports. default = new PhotoController();
