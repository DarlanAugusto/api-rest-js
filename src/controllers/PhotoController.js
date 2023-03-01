import multer from 'multer';
import multerConfig from '../config/multer';
import Photo from '../models/Photo';
import Aluno from '../models/Aluno';

const upload = multer(multerConfig).single('file');
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

      const aluno = await Aluno.findByPk(req.body.alunoId);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno informado não existe'],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const photo = await Photo.create({ originalname, filename, aluno_id: req.body.alunoId });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
    });
  }
}

export default new PhotoController();
