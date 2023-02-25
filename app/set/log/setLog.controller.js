import asyncHandler from 'express-async-handler';

import { prisma } from '../../prisma.js';

// @desc    Create setLog
// @route   POST /api/sets/:setId
// @access  Private
export const createSetLog = asyncHandler(async (req, res) => {
	const set = await prisma.set.findUnique({
		where: {
			id: +req.params.setId,
		},
	});

	if (!set) {
		res.status(404);
		throw new Error(`Set not found`);
	}
	const isSetLog = await prisma.setLog.findUnique({
		where: {
			setId: +req.params.setId,
		},
	});
	if (isSetLog) {
		await prisma.setLog.delete({
			where: {
				id: isSetLog.id,
			},
		});
	}
	const setLog = await prisma.setLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id,
				},
			},
			set: {
				connect: {
					id: set.id,
				},
			},
		},
		include: {
			set: true,
			user: true,
		},
	});

	res.json(setLog);
});

// @desc    Get setLogs
// @route   GET /api/sets/log
// @access  Private
export const getSetLogs = asyncHandler(async (req, res) => {
	const setsLog = await prisma.setLog.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			set: true,
		},
	});

	if (!setsLog) {
		res.status(404);
		throw new Error(`SetLogs not found`);
	}

	res.json(setsLog);
});
// @desc    Delete a setLog
// @route   DELETE /api/sets/log/:setLogId
// @access  Private
export const deleteSetLog = asyncHandler(async (req, res) => {
	const setLog = await prisma.setLog.findUnique({
		where: {
			id: +req.params.setLogId,
		},
	});

	if (!setLog) {
		res.status(404);
		throw new Error(`SetLog not found`);
	}
	await prisma.setLog.delete({
		where: {
			id: +req.params.setLogId,
		},
	});
	res.json({ message: 'SetLog deleted!' });
});
