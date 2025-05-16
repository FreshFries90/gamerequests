import prisma from '@/lib/prisma';

export async function getPublisherById(id: number) {
	return await prisma.publisher.findUnique({
		where: { id },
		include: { contacts: true },
	});
}

export async function updatePublisher(
	id: number,
	data: { name: string; language: string }
) {
	return await prisma.publisher.update({
		where: { id },
		data,
	});
}
