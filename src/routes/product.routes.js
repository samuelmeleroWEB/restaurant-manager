import { Router } from 'express';
import { create, getAll, update, remove } from '../controllers/product.controller.js';
import { authRequired, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// El GET se queda abierto (cualquier cliente puede ver el menú)
router.get('/', getAll);

// Ahora para crear, necesitas estar logueado Y ser admin
router.post('/', [authRequired, isAdmin], create);
router.put('/:id', [authRequired, isAdmin], update);
router.delete('/:id', [authRequired, isAdmin], remove);

export default router;