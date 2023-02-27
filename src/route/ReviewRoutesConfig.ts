import { Application } from 'express';
import { RoutesConfig } from './RoutesConfig';
import controller from '../controller/ReviewController';

/**
 * Route configuration class for Review-related API endpoints
 */
export class ReviewRoutesConfig extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'ReviewRoutes', '/review');
	}

	configureRoutes(): Application {
		// get by user
		this.app.route(`${this.baseUrl}/user/:username`).get(controller.getByUser);

		// get by movie
		this.app.route(`${this.baseUrl}/movie/:movieId`).get(controller.getByMovie);

		// write a new review
		this.app.route(`${this.baseUrl}`).post(controller.postReview);

		// edit or delete an existing review
		this.app
			.route(`${this.baseUrl}/:reviewId`)
			.patch(controller.editReview)
			.delete(controller.deleteReview);

		// like a review
		this.app.route(`${this.baseUrl}/like/:reviewId`).put(controller.likeReview);

		// unlike a review
		this.app
			.route(`${this.baseUrl}/unlike/:reviewId`)
			.put(controller.unlikeReview);

		return this.app;
	}
}
