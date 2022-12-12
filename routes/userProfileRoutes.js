import express from 'express';
import { addOrUpdateBio, addOrUpdateSkills } from '../controllers/userProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/bio', protect, addOrUpdateBio)
router.post('/skills', protect, addOrUpdateSkills)

export default router;
