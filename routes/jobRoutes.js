import express from 'express';
import { addJob, getJobs } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getJobs).post(protect, addJob);

export default router;