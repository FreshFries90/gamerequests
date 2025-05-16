import {
	getContactById,
	getPublisherOptions,
} from './contactEditServerFunctions';

type Props = {
	params: { id: string };
};

export default async function EditContactPage({ params }: Props) {
	const id = parseInt(params.id);
	const contact = await getContactById(id);
	const publisherOptions = await getPublisherOptions();

	if (!contact) return <p>Kontakt nicht gefunden.</p>;

	publisherOptions.find((p) => p.value === contact.publisherId);

	return (
		<main>
			<h1>Kontakt bearbeiten</h1>
			<form action={`/api/kontaktpersonen/edit/${id}`} method="POST">
				<input type="hidden" name="id" value={contact.id} />
				<div>
					<label>Anrede</label>
					<input name="salutation" defaultValue={contact.salutation} required />
				</div>
				<div>
					<label>Vorname</label>
					<input name="firstName" defaultValue={contact.firstName || ''} />
				</div>
				<div>
					<label>Nachname</label>
					<input name="lastName" defaultValue={contact.lastName || ''} />
				</div>
				<div>
					<label>E-Mail</label>
					<input
						name="email"
						type="email"
						defaultValue={contact.email}
						required
					/>
				</div>
				<div>
					<label>Anredeform</label>
					<input
						name="formOfAddress"
						defaultValue={contact.formOfAddress}
						required
					/>
				</div>
				<div>
					<label>Sprache</label>
					<input
						name="language"
						defaultValue={contact.language || ''}
						required
					/>
				</div>
				<div>
					<label>Publisher</label>
					<select name="publisherId" defaultValue={contact.publisherId}>
						{publisherOptions.map((p) => (
							<option key={p.value} value={p.value}>
								{p.label}
							</option>
						))}
					</select>
				</div>
				<button type="submit">Änderungen speichern</button>
			</form>
		</main>
	);
}
