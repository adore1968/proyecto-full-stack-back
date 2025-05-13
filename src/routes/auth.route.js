import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getUser,
} from '../controllers/auth.controllers.js';
import autenticarToken from '../middleware/autenticarToken.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', autenticarToken, getUser);

export default router;
