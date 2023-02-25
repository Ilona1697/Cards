import express from 'express';

import { protect } from '../../middleware/auth.middleware.js';

import { createSetLog, deleteSetLog, getSetLogs } from './setLog.controller.js';

const router = express.Router();

router.route('/getSetLogs').get(protect, getSetLogs);
router.route('/:setId').post(protect, createSetLog);
router.route('/:setLogId').delete(protect, deleteSetLog);

export default router;
