import Link from 'next/link';
import { getAllContacts } from './contactServerFunctions';
import type { Metadata } from 'next';
import DeleteLink from './deleteLink';

export const metadata: Metadata = {
	title: 'Kontaktübersicht',
};

export default async function ContactPage() {
	const contacts = await getAllContacts();

	if (contacts.length === 0) return <p>Keine Kontaktpersonen gefunden.</p>;

	return (
		<main>
			<h1>Kontaktpersonen</h1>
			<ul className="contact-list">
				{/* Header-Zeile */}
				<li className="contact-header">
					<span className="contact-name">Name</span>
					<span className="contact-language">Sprache</span>
					<span className="contact-email">E-Mail</span>
					<span className="contact-publisher">Publisher</span>
					<span className="publisher-actions">Aktionen</span>
				</li>

				{/* Daten-Zeilen */}
				{contacts.map((c) => (
					<li key={c.id} className="contact-row">
						<span className="contact-name">
							{c.salutation} {c.firstName ?? ''} {c.lastName ?? ''}
						</span>
						<span className="contact-language">{c.language ?? '—'}</span>
						<span className="contact-email">
							<a href={`mailto:${c.email}`}>{c.email}</a>
						</span>
						<span className="contact-publisher">
							{c.publisher?.name ?? '—'}
						</span>
						<span className="contact-actions">
							<Link href={`/kontaktpersonen/edit/${c.id}`}>Bearbeiten</Link> |{' '}
							<DeleteLink id={c.id} />
						</span>
					</li>
				))}
			</ul>
			Kontaktperson nicht gefunden?{' '}
			<Link href="/kontaktpersonen/anlage">Hier</Link> hinzufügen
		</main>
	);
}
