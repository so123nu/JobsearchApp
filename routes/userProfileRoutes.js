import express from 'express';
import { addOrUpdateBio } from '../controllers/userProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/bio', protect, addOrUpdateBio)

export default router;
