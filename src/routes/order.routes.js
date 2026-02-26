import { Router } from 'express';
import { create, updateStatus, getAllOrders } from '../controllers/order.controller.js';
import { authRequired, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Endpoint:
router.get('/', authRequired, getAllOrders);
router.post('/', authRequired, create);
router.patch('/:id/status', [authRequired, isAdmin], updateStatus);
export default router;