import prisma from '@/lib/prisma';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

export async function getContactById(id: number) {
	return await prisma.contact.findUnique({ where: { id } });
}

export async function getPublisherOptions() {
	const publishers = await prisma.publisher.findMany({
		orderBy: { name: 'asc' },
		select: { id: true, name: true },
	});

	return publishers.map((p) => ({
		value: p.id,
		label: p.name,
	}));
}

const contactFormSchema = zfd.formData({
	id: zfd.text(z.string().regex(/^\d+$/)).transform(Number),
	salutation: zfd.text(z.string().max(50)),
	firstName: zfd.text(z.string().max(100).optional()),
	lastName: zfd.text(z.string().max(100).optional()),
	email: zfd.text(z.string().email()),
	formOfAddress: zfd.text(z.string().max(100)),
	language: zfd.text(z.string().max(50)),
	publisherId: zfd.text(z.string().regex(/^\d+$/)).transform(Number),
});

export async function updateContact(formData: FormData) {
	const result = contactFormSchema.safeParse(formData);

	if (!result.success) {
		console.error('Ungültige Eingaben:', result.error.flatten());
		return { success: false, message: 'Ungültige Eingaben' };
	}

	const { id, ...data } = result.data;

	try {
		await prisma.contact.update({
			where: { id },
			data,
		});

		return { success: true, message: 'Kontakt erfolgreich aktualisiert!' };
	} catch (error) {
		console.error('Fehler beim Aktualisieren:', error);
		return { success: false, message: 'Fehler beim Aktualisieren' };
	}
}
