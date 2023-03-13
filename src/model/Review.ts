export class Review {
	userId: string;
	movieId: string;
	rating: number;
	liked: boolean;
	body: string;
	numLikes: number;
	id?: string;

	constructor(
		userId: string,
		movieId: string,
		rating: number,
		liked?: boolean,
		body?: string,
		numLikes?: number,
		id?: string
	) {
		this.userId = userId;
		this.movieId = movieId;
		this.rating = rating;
		this.liked = liked || false;
		this.body = body || '';
		this.numLikes = numLikes || 0;
		this.id = id;
	}
}
