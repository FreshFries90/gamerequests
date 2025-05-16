import type { Metadata } from 'next';
import { getUpcomingGames } from './games/gamesServerFunctions';
import { MailButton } from './games/mail';

export const metadata: Metadata = {
	title: 'Startseite',
};

export default async function Home() {
	const games = await getUpcomingGames();
	return (
		<main className="default-layout">
			<h1>Hier könnt ihr die neuesten Games anfragen</h1>
			<h2>Baldige Releases:</h2>
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
		</main>
	);
}
