import { Router } from 'express';
import * as tableController from '../controllers/table.controller.js';
import { authRequired, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authRequired, tableController.getTables);
router.post('/', [authRequired, isAdmin], tableController.createTable);
router.put('/:id', [authRequired, isAdmin], tableController.updateTable);
router.delete('/:id', [authRequired, isAdmin], tableController.deleteTable);

export default router;