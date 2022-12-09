import express from 'express';
import { login, registerUser, deleteResume } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.delete('/resume/:id', protect, deleteResume)

export default router;
