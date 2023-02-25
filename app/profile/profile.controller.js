import { hash, verify } from 'argon2';
import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
import { UserFields } from '../utils/user.utils.js';

// @desc    Get a profile
// @route   GET /api/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		select: UserFields,
	});

	if (!user) {
		res.status(404);
		throw new Error(`Profile not found`);
	}

	res.json(user);
});

// @desc    Update profile
// @route   POST /api/profile/edit
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	if (!user) {
		res.status(404);
		throw new Error(`Profile not updated`);
	}
	const profile = await prisma.user.update({
		where: {
			id: req.user.id,
		},
		data: {
			name,
		},
		select: UserFields,
	});
	res.json(profile);
});
// @desc    Update password
// @route   POST /api/profile/changePassword
// @access  Private
export const updatePassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const isPasswordConfirmed = await verify(user.password, oldPassword);

	if (!user) {
		res.status(404);
		throw new Error(`Profile not found`);
	}
	if (!isPasswordConfirmed) {
		res.status(400);
		throw new Error(`Password is incorrect`);
	}

	const profile = await prisma.user.update({
		where: {
			id: req.user.id,
		},
		data: {
			password: await hash(newPassword),
		},
		select: UserFields,
	});
	res.json(profile);
});
