export interface Publisher {
	id: number;
	name: string;
	email: string;
	contacts?: Contact[];
	games?: Game[];
}

export interface Contact {
	id: number;
	salutation: string;
	firstName: string;
	lastName: string;
	formOfAddress: string;
	publisherId: number;
	publisher?: Publisher;
}

export interface Game {
	id: number;
	name: string;
	description?: string;
	releaseDate?: string;
	consoles?: string[];
	imageUrls?: string[];
	videoUrls?: string[];
	publisherId: number;
	publisher?: Publisher;
}
