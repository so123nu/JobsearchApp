import express from 'express';
import { login, registerUser, deleteResume, getUserProfile, updateUserDetails } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/login', login)
router.post('/details', protect, updateUserDetails)
router.route('/').get(protect, getUserProfile).post(registerUser);
router.delete('/resume/:id', protect, deleteResume)

export default router;
