'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import {
	addContact,
	getPublisherOptions,
} from './contactAnlageServerFunctions';
import { useSearchParams } from 'next/navigation';

const salutationOptions = [
	{ value: 'Herr', label: 'Herr' },
	{ value: 'Frau', label: 'Frau' },
	{ value: 'Divers', label: 'Divers' },
	{ value: 'Keine Angabe', label: 'Keine Angabe' },
];

const formOfAddressOptions = [
	{ value: 'Du', label: 'Du' },
	{ value: 'Sie', label: 'Sie' },
];

export default function ContactPersonCreateForm() {
	const searchParams = useSearchParams();
	const publisherIdFromUrl = searchParams.get('publisherId');
	const [message, setMessage] = useState('');
	const [publisherOptions, setPublisherOptions] = useState<
		{ value: number; label: string }[]
	>([]);
	const [selectedPublisher, setSelectedPublisher] = useState<{
		value: number;
		label: string;
	} | null>(null);
	const [selectedSalutation, setSelectedSalutation] = useState<{
		value: string;
		label: string;
	} | null>(null);
	const [selectedFormOfAddress, setSelectedFormOfAddress] = useState<{
		value: string;
		label: string;
	} | null>(null);

	useEffect(() => {
		async function loadOptions() {
			const options = await getPublisherOptions();
			setPublisherOptions(options);

			if (publisherIdFromUrl) {
				const preselected = options.find(
					(option) => option.value === parseInt(publisherIdFromUrl, 10)
				);
				if (preselected) {
					setSelectedPublisher(preselected);
				}
			}
		}
		loadOptions();
	}, [publisherIdFromUrl]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!selectedPublisher || !selectedSalutation || !selectedFormOfAddress) {
			setMessage('Bitte alle Pflichtfelder ausfüllen.');
			return;
		}
		const formData = new FormData(e.currentTarget);
		formData.append('publisherId', String(selectedPublisher.value));
		formData.append('salutation', selectedSalutation.value);
		formData.append('formOfAddress', selectedFormOfAddress.value);

		const result = await addContact(formData);
		setMessage(result.message);
	}

	return (
		<form className="contact-form" onSubmit={handleSubmit}>
			<div className="inputs">
				<div className="inputWrapper">
					<label htmlFor="salutation">Anrede</label>
					<Select
						options={salutationOptions}
						value={selectedSalutation}
						onChange={setSelectedSalutation}
						placeholder="Anrede wählen..."
						isClearable
					/>
				</div>
				<div className="inputWrapper">
					<label htmlFor="firstName">Vorname</label>
					<input id="firstName" name="firstName" />
				</div>
				<div className="inputWrapper">
					<label htmlFor="lastName">Nachname</label>
					<input id="lastName" name="lastName" />
				</div>
				<div className="inputWrapper">
					<label htmlFor="email">E-Mail</label>
					<input id="email" name="email" required type="email" />
				</div>
				<div className="inputWrapper">
					<label htmlFor="formOfAddress">Anredeform</label>
					<Select
						options={formOfAddressOptions}
						value={selectedFormOfAddress}
						onChange={setSelectedFormOfAddress}
						placeholder="Anredeform wählen..."
						isClearable
					/>
				</div>
				<div className="inputWrapper">
					<label htmlFor="language">Sprache</label>
					<input id="language" name="language" required />
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

			<button type="submit">Kontaktperson eintragen</button>
			<strong className="message">{message}</strong>
		</form>
	);
}
