import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = new Router();

router.post('/store', UserController.store);

export default router;
