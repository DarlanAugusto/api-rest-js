"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });
      return res.json({ alunos });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      return res.json({ aluno });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.alunoId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(req.params.alunoId, {
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      return res.json({ aluno });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.alunoId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(req.params.alunoId);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      const alunoUpdated = await aluno.update(req.body);
      return res.json({ aluno: alunoUpdated });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.alunoId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(req.params.alunoId);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      const alunoDeleted = await aluno.destroy();
      return res.json({ aluno: alunoDeleted });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AlunoController();
