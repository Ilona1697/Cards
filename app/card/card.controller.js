import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

// @desc    Get card
// @route   GET /api/cards/:id
// @access  Private
export const getCard = asyncHandler(async (req, res) => {
	const isCard = await prisma.card.findUnique({
		where: {
			id: +req.params.id,
		},
	});

	if (!isCard) {
		res.status(404);
		throw new Error(`Card not found`);
	}

	res.json(isCard);
});
// @desc    Get cards
// @route   GET /api/cards
// @access  Private
export const getCards = asyncHandler(async (req, res) => {
	const cards = await prisma.card.findMany();

	if (!cards) {
		res.status(404);
		throw new Error(`Cards not found`);
	}

	res.json(cards);
});
// @desc    Create a new card
// @route   POST /api/cards
// @access  Private
export const createCard = asyncHandler(async (req, res) => {
	const { term, explanation } = req.body;

	const isCard = await prisma.card.findUnique({
		where: {
			term,
		},
	});

	if (isCard) {
		res.status(400);
		throw new Error(`Card name "${term}" already exists`);
	}

	const card = await prisma.card.create({
		data: {
			term,
			explanation,
		},
	});
	res.json(card);
});

// @desc    Update card
// @route   UPDATE /api/cards/:id
// @access  Private
export const updateCard = asyncHandler(async (req, res) => {
	const { term, explanation } = req.body;

	const isCard = await prisma.card.findUnique({
		where: {
			id: +req.params.id,
		},
	});

	if (!isCard) {
		res.status(404);
		throw new Error(`Card not found`);
	}

	const card = await prisma.card.update({
		where: {
			id: +req.params.id,
		},
		data: {
			term,
			explanation,
		},
	});
	res.json(card);
});

// @desc    Delete card
// @route   DELETE /api/cards/:id
// @access  Private
export const deleteCard = asyncHandler(async (req, res) => {
	const isCard = await prisma.card.findUnique({
		where: {
			id: +req.params.id,
		},
	});

	if (!isCard) {
		res.status(404);
		throw new Error(`Card not found`);
	}

	await prisma.card.delete({
		where: {
			id: +req.params.id,
		},
	});
	res.json({ message: 'Card deleted!' });
});
