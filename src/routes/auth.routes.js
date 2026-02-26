import { Router } from 'express';
import { register, login, getUsers, profile, logout } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers); // Ruta para ver todos
router.get('/verify', authRequired, profile);
router.post('/logout', logout);

export default router;