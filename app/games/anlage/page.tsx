'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { addGame, getPublisherOptions } from './gameAnlageServerFunctions';

export default function GameCreateForm() {
	const [message, setMessage] = useState('');
	const [publisherOptions, setPublisherOptions] = useState<
		{ value: number; label: string }[]
	>([]);
	const [selectedPublisher, setSelectedPublisher] = useState<{
		value: number;
		label: string;
	} | null>(null);

	useEffect(() => {
		async function loadOptions() {
			const options = await getPublisherOptions();
			setPublisherOptions(options);
		}
		loadOptions();
	}, []);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!selectedPublisher) {
			setMessage('Bitte wähle einen Publisher aus.');
			return;
		}
		const formData = new FormData(e.currentTarget);
		formData.append('publisherId', String(selectedPublisher.value));
		const result = await addGame(formData);
		setMessage(result.message);
	}

	return (
		<form className="game-form" onSubmit={handleSubmit}>
			<div className="inputs">
				<div className="inputWrapper">
					<label htmlFor="name">Name</label>
					<input id="name" name="name" maxLength={100} required />
				</div>

				<div className="inputWrapper">
					<label htmlFor="description">Beschreibung</label>
					<textarea
						id="description"
						name="description"
						maxLength={1000}
						required
					/>
				</div>

				<div className="inputWrapper">
					<label htmlFor="releaseDate">Release-Datum</label>
					<input id="releaseDate" name="releaseDate" type="date" required />
				</div>

				<div className="inputWrapper">
					<label htmlFor="players">Spieleranzahl</label>
					<input id="players" name="players" required />
				</div>

				<div className="inputWrapper">
					<label htmlFor="consoles">Konsolen (kommagetrennt)</label>
					<input id="consoles" name="consoles" />
				</div>

				<div className="inputWrapper">
					<label htmlFor="tags">Tags (kommagetrennt)</label>
					<input id="tags" name="tags" />
				</div>

				<div className="inputWrapper">
					<label htmlFor="imageUrls">Bild-URLs (kommagetrennt)</label>
					<input id="imageUrls" name="imageUrls" />
				</div>

				<div className="inputWrapper">
					<label htmlFor="videoUrls">Video-URLs (kommagetrennt)</label>
					<input id="videoUrls" name="videoUrls" />
				</div>

				<div className="inputWrapper">
					<label>Publisher</label>
					<Select
						options={publisherOptions}
						value={selectedPublisher}
						onChange={setSelectedPublisher}
						placeholder="Publisher wählen..."
						isClearable
						noOptionsMessage={() => 'Kein Publisher gefunden'}
					/>
					Publisher nicht gefunden? <a href="/publisher/anlage">Hier</a>{' '}
					anlegen.
				</div>
			</div>

			<button type="submit">Spiel eintragen</button>
			<strong className="message">{message}</strong>
		</form>
	);
}
