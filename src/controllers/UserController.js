import User from '../models/User';

class UserController {
  async index(req, res) {
    console.log(req.userId, req.userEmail);

    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.userId);
      return res.json({ user });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.userId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(req.params.userId);
      if (!user) {
        res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const userUpdated = await user.update(req.body);
      return res.json({ user: userUpdated });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.userId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(req.params.userId);
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

export default new UserController();
