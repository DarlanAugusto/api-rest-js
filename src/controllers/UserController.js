import User from '../models/User';

class UserController {
  // async index(req, res) {
  //   console.log(req.userId, req.userEmail);

  //   try {
  //     const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
  //     return res.json({ users });
  //   } catch (error) {
  //     return res.json(null);
  //   }
  // }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);
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
      const user = await User.create(req.body);
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
      const user = await User.findByPk(req.userId);
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
      const user = await User.findByPk(req.userId);
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
