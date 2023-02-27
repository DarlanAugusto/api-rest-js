import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['É necessário fazer o login'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({ where: { email: userData.email } });
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
