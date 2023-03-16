import { Application } from 'express';
import { RoutesConfig } from './RoutesConfig';
import controller from '../controller/ReviewController';
import AuthParser from '../middleware/AuthParser';

/**
 * Route configuration class for Review-related API endpoints
 */
export class ReviewRoutesConfig extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'ReviewRoutes', '/review');
	}

	configureRoutes(): Application {
		// get by user
		const byUserEndpoint = `${this.baseUrl}/user/:username`;
		this.app
			.use(byUserEndpoint, AuthParser)
			.route(byUserEndpoint)
			.get(controller.getByUser);

		// get by movie
		const byMovieEndpoint = `${this.baseUrl}/movie/:movieId`;
		this.app
			.use(byMovieEndpoint, AuthParser)
			.route(byMovieEndpoint)
			.get(controller.getByMovie);

		// write a new review
		const writeReviewEndpoint = `${this.baseUrl}`;
		this.app
			.use(writeReviewEndpoint, AuthParser)
			.route(writeReviewEndpoint)
			.post(controller.postReview);

		// edit or delete an existing review
		const editDelEndpoint = `${this.baseUrl}/:reviewId`;
		this.app
			.use(editDelEndpoint, AuthParser)
			.route(editDelEndpoint)
			.patch(controller.editReview)
			.delete(controller.deleteReview);

		// like a review
		const likeEndpoint = `${this.baseUrl}/like/:reviewId`;
		this.app
			.use(likeEndpoint, AuthParser)
			.route(likeEndpoint)
			.put(controller.likeReview);

		// unlike a review
		const unlikeEndpoint = `${this.baseUrl}/unlike/:reviewId`;
		this.app
			.use(unlikeEndpoint, AuthParser)
			.route(unlikeEndpoint)
			.put(controller.unlikeReview);

		return this.app;
	}
}
