import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = new Router();

router.get('/', UserController.index);
router.get('/:userId', UserController.show);
router.post('/store', UserController.store);
router.put('/:userId', UserController.update);
router.delete('/:userId', UserController.delete);

export default router;
