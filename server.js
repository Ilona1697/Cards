import 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { errorHandler, notFound } from './app/middleware/error.middleware.js';

import authRoutes from './app/auth/auth.routes.js';
import cardRoutes from './app/card/card.routes.js';
import { prisma } from './app/prisma.js';
import profileRoutes from './app/profile/profile.routes.js';
import setLogRoutes from './app/set/log/setLog.routes.js';
import setRoutes from './app/set/set.routes.js';

dotenv.config();

const app = express();

async function main() {
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	app.use(cors());
	app.use(express.json());
	app.use('/api/auth', authRoutes);
	app.use('/api/sets', setRoutes);
	app.use('/api/cards', cardRoutes);
	app.use('/api/sets/log', setLogRoutes);
	app.use('/api/profile', profileRoutes);

	app.use(errorHandler);
	app.use(notFound);
	const PORT = process.env.PORT || 5000;

	app.listen(PORT, () => {
		console.log(
			`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
				.bold,
		);
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
