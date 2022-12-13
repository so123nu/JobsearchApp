import express from 'express';
import {
    addOrUpdateBio,
    addOrUpdateEducation,
    addOrUpdateExperience,
    addOrUpdateSkills
} from '../controllers/userProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/bio', protect, addOrUpdateBio)
router.post('/skills', protect, addOrUpdateSkills)
router.post('/education', protect, addOrUpdateEducation)
router.post('/experience', protect, addOrUpdateExperience)

export default router;
