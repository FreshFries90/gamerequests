'use client';
import { useState } from 'react';
import { addPublisher } from './publisherAnlageServerFunctions';
import { useRouter } from 'next/navigation';

export default function PublisherCreateForm() {
	const [message, setMessage] = useState('');
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const result = await addPublisher(formData);
		if (result.success && result.id) {
			router.push(`/kontaktpersonen/anlage?publisherId=${result.id}`);
		} else {
			setMessage(result.message || 'Fehler beim Speichern.');
		}
	}
	return (
		<form className="publisher-form" onSubmit={handleSubmit}>
			<div className="inputs">
				{/* Kein Autocomplete weil Daten nicht aus bereits bekannten Daten geladen werden */}
				<div className="inputWrapper">
					<label htmlFor="name">Name</label>
					<input id="name" name="name" maxLength={100} required />
				</div>
				<div className="inputWrapper">
					<label htmlFor="email">Sprache</label>
					<select id="language" name="language" required>
						<option value="">Bitte wählen</option>
						<option value="de">Deutsch</option>
						<option value="en">Englisch</option>
					</select>
				</div>
			</div>
			<button type="submit">Weiter</button>
			<strong className="message">{message}</strong>
		</form>
	);
}
