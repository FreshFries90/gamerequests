'use client';

type Props = {
	id: number;
};

export default function DeleteLink({ id }: Props) {
	const handleClick = (e: React.MouseEvent) => {
		if (!confirm('Die Kontaktperson wird gelöscht. Wirklich fortfahren?')) {
			e.preventDefault();
		}
	};

	return (
		<a href={`/kontaktpersonen/delete/${id}`} onClick={handleClick}>
			Löschen
		</a>
	);
}
