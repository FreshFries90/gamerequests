import prisma from '@/lib/prisma';

export async function getAllContacts() {
	return await prisma.contact.findMany({
		include: {
			publisher: true,
		},
		orderBy: {
			lastName: 'asc',
		},
	});
}
