"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['É necessário fazer o login'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const userData = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

    const user = await _User2.default.findOne({ where: { email: userData.email } });
    if (!user) {
      return res.status(400).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = userData.id;
    req.userEmail = userData.email;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token inválido.'],
    });
  }
};
