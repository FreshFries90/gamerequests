'use server';

import { zfd } from 'zod-form-data';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const formSchema = zfd.formData({
	name: zfd.text(z.string().max(100)),
	description: zfd.text(z.string().max(1000)),
	releaseDate: zfd.text(
		z.string().refine((date) => !isNaN(Date.parse(date)), {
			message: 'Ungültiges Datum',
		})
	),
	players: zfd.text(z.string()),
	consoles: zfd.repeatableOfType(z.string()).optional(),
	tags: zfd.repeatableOfType(z.string()).optional(),
	imageUrls: zfd.repeatableOfType(z.string()).optional(),
	videoUrls: zfd.repeatableOfType(z.string()).optional(),
	publisherId: zfd.text(z.string().regex(/^\d+$/)).transform(Number),
});

export async function addGame(formData: FormData) {
	const result = formSchema.safeParse(formData);

	if (!result.success) {
		console.error('Formulardaten ungültig:', result.error.flatten());
		return { success: false, message: 'Ungültige Eingaben' };
	}

	const {
		name,
		description,
		releaseDate,
		players,
		consoles = [],
		tags = [],
		imageUrls = [],
		videoUrls = [],
		publisherId,
	} = result.data;

	const existing = await prisma.game.findUnique({
		where: {
			name_publisherId: {
				name,
				publisherId,
			},
		},
	});

	if (existing) {
		return {
			success: false,
			message: 'Dieses Spiel existiert bereits.',
		};
	}

	await prisma.game.create({
		data: {
			name,
			description,
			releaseDate: new Date(releaseDate),
			players,
			consoles,
			tags,
			imageUrls,
			videoUrls,
			publisherId,
		},
	});

	return {
		success: true,
		message: 'Spiel erfolgreich eingetragen!',
	};
}

export async function getPublisherOptions() {
	const publishers = await prisma.publisher.findMany({
		orderBy: { name: 'asc' },
		select: {
			id: true,
			name: true,
		},
	});

	return publishers.map((p) => ({
		value: p.id,
		label: p.name,
	}));
}
