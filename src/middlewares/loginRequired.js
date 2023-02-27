import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['É necessário fazer o login'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);

    req.userId = userData.id;
    req.userEmail = userData.email;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token inválido.'],
    });
  }
};
