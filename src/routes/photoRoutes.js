import { Router } from 'express';
import multer from 'multer';

import photoController from '../controllers/PhotoController';
import multerConfig from '../config/multer';

const router = new Router();
const upload = multer(multerConfig);

router.post('/', upload.single('file'), photoController.store);

export default router;
