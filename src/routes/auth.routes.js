import { Router } from 'express';
import { register, login, getUsers } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers); // Ruta para ver todos


export default router;