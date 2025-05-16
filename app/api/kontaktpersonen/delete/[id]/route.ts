import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	const id = parseInt(params.id);
	if (isNaN(id)) {
		return NextResponse.json(
			{ success: false, message: 'Ungültige ID' },
			{ status: 400 }
		);
	}

	try {
		await prisma.contact.delete({
			where: { id },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Fehler beim Löschen:', error);
		return NextResponse.json(
			{ success: false, message: 'Fehler beim Löschen' },
			{ status: 500 }
		);
	}
}
