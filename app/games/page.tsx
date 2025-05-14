import { getGames } from './gamesServerFunctions';

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
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
