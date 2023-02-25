import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const aluno = await Aluno.create({
      name: 'João',
      lastname: 'Luiz',
      email: 'joao@email.com',
      age: 27,
      weight: 65,
      height: 1.80,
    });

    res.json(aluno);
  }
}

export default new HomeController();
