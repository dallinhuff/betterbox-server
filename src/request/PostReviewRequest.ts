import { AuthRequest } from './AuthRequest';
import { Review } from '../model/Review';

export class PostReviewRequest extends AuthRequest {
	review: Review;

	constructor(
		token: string,
		userId: string,
		movieId: string,
		rating: number,
		liked?: boolean,
		body?: string
	) {
		super(token, userId);
		this.review = new Review(userId, movieId, rating, liked, body);
	}
}
