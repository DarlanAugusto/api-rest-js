"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      console.log(email, password);

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const user = await _User2.default.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      const token = _jsonwebtoken2.default.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        },
      );

      return res.json({ token });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new TokenController();
