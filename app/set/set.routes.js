import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import { createSet } from './set.controller.js';

const router = express.Router();

router.route('/').post(protect, createSet);

export default router;
