import { PostReviewRequest } from '../request/PostReviewRequest';
import { PostReviewResponse } from '../response/PostReviewResponse';
import { ReviewDao } from '../dao/ReviewDao';

export class ReviewService {
	constructor() {}
	async postReview(request: PostReviewRequest): Promise<PostReviewResponse> {
		try {
			await new ReviewDao().postReview(request.review);
			return PostReviewResponse.success();
		} catch (e) {
			console.log(e);
			return PostReviewResponse.error(
				500,
				"Internal server error: Couldn't post review"
			);
		}
	}
}
