import { Router } from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { authRequired, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', [authRequired, isAdmin], categoryController.create);
router.put('/:id', [authRequired, isAdmin], categoryController.update);
router.delete('/:id', [authRequired, isAdmin], categoryController.remove);

export default router;