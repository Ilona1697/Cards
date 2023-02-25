import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

// @desc    Create a new set
// @route   POST /api/sets
// @access  Private
export const createSet = asyncHandler(async (req, res) => {
	const { name, cardsIds } = req.body;

	const isSet = await prisma.set.findUnique({
		where: {
			name,
		},
	});

	if (isSet) {
		res.status(400);
		throw new Error(`Set name "${name}" already exists`);
	}
	const set = await prisma.set.create({
		data: {
			name,
			cards: {
				connect: cardsIds.map(card => ({ id: +card.id })),
			},
		},
		include: {
			cards: true,
		},
	});
	res.json(set);
});
