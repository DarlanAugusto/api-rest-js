import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', alunoController.index);
router.get('/:alunoId', alunoController.show);
router.post('/', loginRequired, alunoController.store);
router.put('/:alunoId', loginRequired, alunoController.update);
router.delete('/:alunoId', loginRequired, alunoController.delete);

export default router;
