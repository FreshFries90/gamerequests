'use server';

import { zfd } from 'zod-form-data';
import { z } from 'zod';

import prisma from '@/lib/prisma';

// 1. Schema definieren
const formSchema = zfd.formData({
	name: zfd.text(z.string().max(100)),
	email: zfd.text(z.string().email()),
	language: zfd.text(z.string()),
});

// 2. Server Action
export async function addPublisher(formData: FormData) {
	// 2.1 Daten parsen
	const result = formSchema.safeParse(formData);

	if (!result.success) {
		console.error('Formulardaten ungültig:', result.error.flatten());
		return { success: false, message: 'Ungültige Eingaben' };
	}

	const { name, email, language } = result.data;

	// 3. Prüfen ob E-Mail schon existiert
	const existing = await prisma.publisher.findUnique({
		where: { email },
	});

	if (existing) {
		return { success: false, message: 'Diese E-Mail wurde bereits verwendet.' };
	}

	// 4. In DB eintragen
	await prisma.publisher.create({
		data: {
			name,
			email,
			language,
		},
	});

	return {
		success: true,
		message:
			'Publisher erfolgreich eingetragen! Du hast genauere Kontaktinfos? Jetzt <a href="/kontakt/anlage">eintragen</a> ',
	};
}
