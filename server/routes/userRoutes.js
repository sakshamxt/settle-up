// server/routes/userRoutes.js

import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController.js';

// Route for /api/users/register
router.post('/register', registerUser);

// Route for /api/users/login
router.post('/login', loginUser);

export default router;