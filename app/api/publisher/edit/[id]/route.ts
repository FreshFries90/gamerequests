import { updatePublisher } from '@/app/publisher/edit/[id]/publisherEditServerFunctions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = parseInt(params.id);
	const formData = await req.formData();
	const name = formData.get('name')?.toString() || '';
	const language = formData.get('language')?.toString() || '';

	if (!name || !language || isNaN(id)) {
		return NextResponse.json(
			{ success: false, message: 'Ungültige Daten' },
			{ status: 400 }
		);
	}

	await updatePublisher(id, { name, language });

	return NextResponse.redirect(new URL('/publisher', req.nextUrl));
}
