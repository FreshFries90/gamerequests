import prisma from '@/lib/prisma';

export async function getPublishersWithContacts() {
	return await prisma.publisher.findMany({
		include: {
			contacts: true,
		},
		orderBy: {
			name: 'asc',
		},
	});
}
