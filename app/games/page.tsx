import { getGames } from './gamesServerFunctions';
import { MailButton } from './mail';

export default async function GamePage() {
	const games = await getGames();

	if (games.length === 0) return <p>Keine Spiele gefunden.</p>;

	return (
		<main>
			<h1>Spieleübersicht</h1>
			<table className="games-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Beschreibung</th>
						<th>Veröffentlichungsdatum</th>
						<th>Publisher</th>
					</tr>
				</thead>
				<tbody>
					{games.map((game) => (
						<tr key={game.id}>
							<td>{game.name}</td>
							<td>{game.description}</td>
							<td>{new Date(game.releaseDate).toLocaleDateString()}</td>
							<td>{game.publisher.name}</td>
							<MailButton
								gameName={game.name}
								emails={game.publisher.contacts
									.map((c) => c.email)
									.filter(Boolean)}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
