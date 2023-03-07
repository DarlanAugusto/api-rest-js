"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    console.log(req.userId, req.userEmail);

    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json({ users });
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      const { id, name, email } = user;
      return res.json({ user: { id, name, email } });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const user = await _User2.default.create(req.body);
      const { id, name, email } = user;
      return res.json({ user: { id, name, email } });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const userUpdated = await user.update(req.body);
      const { id, name, email } = userUpdated;
      return res.json({ user: { id, name, email } });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const userDeleted = await user.destroy();
      return res.json({ user: userDeleted });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();
