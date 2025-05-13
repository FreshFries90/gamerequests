'use server';

import { zfd } from 'zod-form-data';
import { z } from 'zod';

import prisma from '@/lib/prisma';

const formSchema = zfd.formData({
	name: zfd.text(z.string().max(100)),
	language: zfd.text(z.string()),
});

export async function addPublisher(formData: FormData) {
	const result = formSchema.safeParse(formData);

	if (!result.success) {
		console.error('Formulardaten ungültig:', result.error.flatten());
		return { success: false, message: 'Ungültige Eingaben' };
	}

	const { name, language } = result.data;

	// 4. In DB eintragen
	const newPublisher = await prisma.publisher.create({
		data: {
			name,
			language,
		},
	});

	return {
		success: true,
		message: 'Publisher erfolgreich eingetragen! ',
		id: newPublisher.id,
	};
}
