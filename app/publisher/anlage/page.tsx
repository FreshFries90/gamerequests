'use client';
import { useState } from 'react';
import { addPublisher } from './publisherAnlageServerFunctions';

export default function PublisherCreateForm() {
	const [message, setMessage] = useState('');

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const result = await addPublisher(formData);
		setMessage(result.message);
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
			<button type="submit">Absenden</button>
			<strong className="message">{message}</strong>
		</form>
	);
}
