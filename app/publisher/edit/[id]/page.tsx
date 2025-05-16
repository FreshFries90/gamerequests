import DeleteLink from '../../deleteLink';
import { getPublisherById } from './publisherEditServerFunctions';

type Props = {
	params: { id: string };
};
export default async function EditPublisherPage({ params }: Props) {
	const id = parseInt(params.id);
	const publisher = await getPublisherById(id);

	if (!publisher) return <p>Publisher nicht gefunden.</p>;

	return (
		<main>
			<h1>Publisher bearbeiten</h1>
			<form action={`/api/publisher/edit/${id}`} method="POST">
				<input type="hidden" name="id" value={publisher.id} />
				<div>
					<label>Publisher-Name</label>
					<input name="name" defaultValue={publisher.name} required />
				</div>
				<div>
					<label>Sprache</label>
					<input name="language" defaultValue={publisher.language} required />
				</div>
				<button type="submit">Speichern</button>
				<a href="/publisher">Zurück</a>
			</form>
			<DeleteLink id={publisher.id} />
		</main>
	);
}
