import Link from 'next/link';
import { getGames } from './gamesServerFunctions';
import { MailButton } from './mail';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Spieleübersicht',
};

export default async function GamePage() {
	const games = await getGames();

	if (games.length === 0) return <p>Keine Spiele gefunden.</p>;

	return (
		<main>
			<h1>Spieleübersicht</h1>
			<ul className="game-list">
				<li>Name</li>
				<li>Beschreibung</li>
				<li>Veröffentlichungsdatum</li>
				<li>Publisher</li>
				<li>Anfrage</li>
			</ul>
			{games.map((game) => (
				<ul className="game-list" key={game.id}>
					<li>{game.name}</li>
					<li>{game.description}</li>
					<li>{new Date(game.releaseDate).toLocaleDateString()}</li>
					<li>{game.publisher.name}</li>
					<MailButton
						gameName={game.name}
						emails={game.publisher.contacts.map((c) => c.email).filter(Boolean)}
					/>
				</ul>
			))}
			Game nicht gefunden? <Link href="/games/anlage">Hier</Link> hinzufügen
		</main>
	);
}
