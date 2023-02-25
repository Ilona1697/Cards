import express from 'express';

import { authUser, register } from './auth.controller.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(authUser);
export default router;
