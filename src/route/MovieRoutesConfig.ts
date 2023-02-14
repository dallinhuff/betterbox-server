import { RoutesConfig } from './RoutesConfig';
import { Application } from 'express';
import controller from '../controller/MovieController';

/**
 * Route configuration class for Movie-related API endpoints
 */
export class MovieRoutesConfig extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'MovieRoutes', '/movie');
	}

	configureRoutes(): Application {
		this.app.route(`${this.baseUrl}/:movieId`).get(controller.getMovieInfo);

		return this.app;
	}
}
