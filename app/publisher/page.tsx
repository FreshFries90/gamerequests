import Link from 'next/link';
import { getPublishersWithContacts } from './publisherServerFunctions';

export default async function PublisherPage() {
	const publishers = await getPublishersWithContacts();
	if (publishers.length === 0) return <p>Keine Publisher gefunden.</p>;

	return (
		<main>
			<h1>Publisherübersicht</h1>
			<ul className="publisher-list">
				{/* Header-Zeile */}
				<li className="publisher-header">
					<span className="publisher-name">Publisher</span>
					<span className="publisher-language">Sprache</span>
					<span className="publisher-contacts">Kontaktpersonen</span>
				</li>

				{/* Daten-Zeilen */}
				{publishers.map((pub) => (
					<li key={pub.id} className="publisher-row">
						<span className="publisher-name">{pub.name}</span>
						<span className="publisher-language">{pub.language}</span>
						<span className="publisher-contacts">
							{pub.contacts.length === 0
								? 'Keine'
								: pub.contacts.map((c, index) => (
										<span key={c.id}>
											{c.salutation} {c.firstName ?? ''} {c.lastName ?? ''}{' '}
											<a href={`mailto:${c.email}`}>{c.email}</a>
											{index < pub.contacts.length - 1 && ', '}
										</span>
								  ))}
						</span>
					</li>
				))}
			</ul>
			Publisher nicht gefunden? <Link href="/publisher/anlage">Hier</Link>{' '}
			hinzufügen
		</main>
	);
}
