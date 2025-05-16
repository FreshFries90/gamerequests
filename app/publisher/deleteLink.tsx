'use client';

type Props = {
	id: number;
};

export default function DeleteLink({ id }: Props) {
	const handleClick = (e: React.MouseEvent) => {
		if (
			!confirm(
				'Der Publisher wird mit all seinen Games und Kontaktpersonen gelöscht. Wirklich fortfahren?'
			)
		) {
			e.preventDefault();
		}
	};

	return (
		<a href={`/publisher/delete/${id}`} onClick={handleClick}>
			Löschen
		</a>
	);
}
