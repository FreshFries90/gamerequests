import prisma from '@/lib/prisma';

export async function getGames() {
	return await prisma.game.findMany({
		orderBy: { releaseDate: 'desc' },
		include: {
			publisher: {
				include: {
					contacts: true,
				},
			},
		},
	});
}
export async function getUpcomingGames() {
	const today = new Date();

	return await prisma.game.findMany({
		where: {
			releaseDate: {
				gte: today,
			},
		},
		orderBy: {
			releaseDate: 'asc',
		},
		take: 5,
		include: {
			publisher: {
				include: {
					contacts: true,
				},
			},
		},
	});
}
