import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	getProfile,
	updatePassword,
	updateProfile,
} from './profile.controller.js';

const router = express.Router();
router.route('/').get(protect, getProfile);
router.route('/edit').post(protect, updateProfile);
router.route('/changePassword').post(protect, updatePassword);

export default router;
