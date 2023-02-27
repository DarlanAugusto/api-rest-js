import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, UserController.index);
router.get('/:userId', UserController.show);
router.post('/store', loginRequired, UserController.store);
router.put('/:userId', loginRequired, UserController.update);
router.delete('/:userId', loginRequired, UserController.delete);

export default router;
