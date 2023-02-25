import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createSet,
	deleteSet,
	getSet,
	getSets,
	updateSet,
} from './set.controller.js';

const router = express.Router();

router.route('/').post(protect, createSet).get(protect, getSets);
router
	.route('/:id')
	.post(protect, updateSet)
	.get(protect, getSet)
	.delete(protect, deleteSet);

export default router;
