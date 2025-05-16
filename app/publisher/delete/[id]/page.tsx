import { redirect } from 'next/navigation';

export default async function DeletePublisherPage({
	params,
}: {
	params: { id: string };
}) {
	const id = params.id;

	await fetch(`http://localhost:3000/api/publisher/delete/${id}`, {
		method: 'DELETE',
		cache: 'no-store',
	});

	redirect('/publisher');
}
