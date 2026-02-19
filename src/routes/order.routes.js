import { Router } from 'express';
import { create } from '../controllers/order.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = Router();

// Endpoint: POST /api/orders
router.post('/', authRequired, create);

export default router;