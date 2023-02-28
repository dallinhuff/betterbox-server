import { Application } from 'express';
import { RoutesConfig } from './RoutesConfig';
import UserController from '../controller/UserController';

/**
 * Route configuration class for User-related API endpoints
 */
export class UserRoutesConfig extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'UserRoutes', '/user');
	}

	configureRoutes(): Application {
		// register
		this.app.route(`${this.baseUrl}/register`).post(UserController.register);

		// login & logout
		this.app
			.route(`${this.baseUrl}/login`)
			.post(UserController.login)
			.delete(UserController.logout);

		// get and edit own profile
		this.app
			.route(`${this.baseUrl}/me`)
			.get(UserController.getOwnProfile)
			.patch(UserController.update)
			.delete(UserController.remove);

		// get any public profile info
		this.app.route(`${this.baseUrl}/:username`).get(UserController.getProfile);

		// followers
		this.app
			.route(`${this.baseUrl}/followers/:username`)
			.get(UserController.getFollowers)
			.post(UserController.follow)
			.delete(UserController.unfollow);

		// following
		this.app
			.route(`${this.baseUrl}/following/:username`)
			.get(UserController.getFollowing);

		// feed
		this.app.route(`${this.baseUrl}/feed`).get(UserController.getFeed);

		return this.app;
	}
}
