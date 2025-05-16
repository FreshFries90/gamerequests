import { updateContact } from '@/app/kontaktpersonen/edit/[id]/contactEditServerFunctions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const formData = await req.formData();
	const result = await updateContact(formData);

	if (result.success) {
		return NextResponse.redirect('http://localhost:3000/kontaktpersonen');
	}

	return NextResponse.json(result, { status: 400 });
}
