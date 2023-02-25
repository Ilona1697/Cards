import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createCard,
	deleteCard,
	getCard,
	getCards,
	updateCard,
} from './card.controller.js';

const router = express.Router();

router.route('/').post(protect, createCard).get(protect, getCards);
router
	.route('/:id')
	.post(protect, updateCard)
	.delete(protect, deleteCard)
	.get(protect, getCard);

export default router;
