export class Review {
	userId: string;
	movieId: string;
	rating: number;
	liked: boolean;
	body: string;
	timestamp: number;
	numLikes: number;
	id?: string;

	constructor(
		userId: string,
		movieId: string,
		rating: number,
		liked?: boolean,
		body?: string,
		timestamp?: number,
		numLikes?: number,
		id?: string
	) {
		this.userId = userId;
		this.movieId = movieId;
		this.rating = rating;
		this.liked = liked || false;
		this.body = body || '';
		this.timestamp = timestamp || Date.now();
		this.numLikes = numLikes || 0;
		this.id = id;
	}

	static from(review: Review) {
		return new Review(
			review.userId,
			review.movieId,
			review.rating,
			review.liked,
			review.body,
			review.timestamp,
			review.numLikes,
			review.id
		);
	}
}
