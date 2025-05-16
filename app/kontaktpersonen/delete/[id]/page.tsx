import { redirect } from 'next/navigation';

export default async function DeleteContactPage({
	params,
}: {
	params: { id: string };
}) {
	const id = params.id;

	await fetch(`http://localhost:3000/api/kontaktpersonen/delete/${id}`, {
		method: 'DELETE',
		cache: 'no-store',
	});

	redirect('/kontaktpersonen');
}
