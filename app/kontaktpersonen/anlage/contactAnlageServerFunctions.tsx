'use server';

import { zfd } from 'zod-form-data';
import { z } from 'zod';
import prisma from '@/lib/prisma';

// Validierung für das Kontaktformular
const contactFormSchema = zfd.formData({
	salutation: zfd.text(z.string().max(50)),
	firstName: zfd.text(z.string().max(100)),
	lastName: zfd.text(z.string().max(100)),
	email: zfd.text(z.string().email()),
	formOfAddress: zfd.text(z.string().max(100)),
	language: zfd.text(z.string().max(50)),
	publisherId: zfd.text(z.string().regex(/^\d+$/)).transform(Number),
});

// Kontakt anlegen
export async function addContact(formData: FormData) {
	const result = contactFormSchema.safeParse(formData);

	if (!result.success) {
		console.error('Formulardaten ungültig:', result.error.flatten());
		return { success: false, message: 'Ungültige Eingaben' };
	}

	const {
		salutation,
		firstName,
		lastName,
		email,
		formOfAddress,
		language,
		publisherId,
	} = result.data;

	try {
		await prisma.contact.create({
			data: {
				salutation,
				firstName,
				lastName,
				email,
				formOfAddress,
				language,
				publisherId,
			},
		});

		return {
			success: true,
			message: 'Kontakt erfolgreich eingetragen!',
		};
	} catch (error) {
		console.error('Fehler beim Erstellen des Kontakts:', error);
		return {
			success: false,
			message: 'Ein Fehler ist aufgetreten.',
		};
	}
}

// Publisher-Auswahl für das Select
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
