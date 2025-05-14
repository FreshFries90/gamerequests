import prisma from '@/lib/prisma';

export async function getGames() {
	return await prisma.game.findMany({
		orderBy: { releaseDate: 'desc' },
		include: {
			publisher: true,
		},
	});
}
