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
			user: {
				connect: {
					id: +req.user.id,
				},
			},
			cards: {
				connect: cardsIds.map(id => ({ id: +id })),
			},
		},
		include: {
			cards: true,
			user: true,
		},
	});
	res.json(set);
});

// @desc    Get set
// @route   GET /api/sets/:id
// @access  Private
export const getSet = asyncHandler(async (req, res) => {
	const isSet = await prisma.set.findUnique({
		where: {
			id: +req.params.id,
		},
	});

	if (!isSet) {
		res.status(404);
		throw new Error(`Set not found`);
	}

	res.json(isSet);
});
// @desc    Get sets
// @route   GET /api/sets
// @access  Private
export const getSets = asyncHandler(async (req, res) => {
	const sets = await prisma.set.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});

	if (!sets) {
		res.status(404);
		throw new Error(`Sets not found`);
	}

	res.json(sets);
});

// @desc    Update set
// @route   UPDATE /api/sets/:id
// @access  Private
export const updateSet = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const isSet = await prisma.set.findUnique({
		where: {
			name,
		},
	});

	if (isSet) {
		res.status(404);
		throw new Error(`Set name "${name}" already exists`);
	}

	const set = await prisma.set.update({
		where: {
			id: +req.params.id,
		},
		data: {
			name,
		},
	});
	res.json(set);
});

// @desc    Delete set
// @route   DELETE /api/sets/log/:id
// @access  Private
export const deleteSet = asyncHandler(async (req, res) => {
	const isSet = await prisma.set.findUnique({
		where: {
			id: +req.params.id,
		},
	});

	if (!isSet) {
		res.status(404);
		throw new Error(`Set not found`);
	}
	// await prisma.card.delete({
	// 	where: {
	// 		setId: +req.params.id,
	// 	},
	// });

	await prisma.set.delete({
		where: {
			id: +req.params.id,
		},
	});
	res.json({ message: 'Set deleted!' });
});
