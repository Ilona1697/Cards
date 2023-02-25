import { hash, verify } from 'argon2';
import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
import { UserFields } from '../utils/user.utils.js';

import { generateToken } from './generate-token.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	const isUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (isUser) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name,
		},
		select: UserFields,
	});

	const token = generateToken(user.id);

	res.json({ user, token });
});
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const isUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!isUser) {
		res.status(400);
		throw new Error('User not registered');
	}

	const isValidPassword = await verify(isUser.password, password);

	if (isUser && isValidPassword) {
		const token = generateToken(isUser.id);
		res.json({ isUser, token });
	} else {
		res.status(400);
		throw new Error('login or password is incorrect');
	}
});
