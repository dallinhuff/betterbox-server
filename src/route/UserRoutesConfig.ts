import { Application } from 'express';
import { RoutesConfig } from './RoutesConfig';
import UserController from '../controller/UserController';
import AuthParser from '../middleware/AuthParser';

/**
 * Route configuration class for User-related API endpoints
 */
export class UserRoutesConfig extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'UserRoutes', '/user');
	}

	configureRoutes(): Application {
		// register
		const registerEndpoint = `${this.baseUrl}/register`;
		this.app.route(registerEndpoint).post(UserController.register);

		// login
		const loginEndpoint = `${this.baseUrl}/login`;
		this.app.route(loginEndpoint).post(UserController.login);

		// logout
		const logoutEndpoint = `${this.baseUrl}/logout`;
		this.app
			.use(logoutEndpoint, AuthParser)
			.route(logoutEndpoint)
			.delete(UserController.logout);

		// get and edit own profile
		const meEndpoint = `${this.baseUrl}/me`;
		this.app
			.use(meEndpoint, AuthParser)
			.route(meEndpoint)
			.get(UserController.getOwnProfile)
			.patch(UserController.update)
			.delete(UserController.remove);

		// get any public profile info
		const getUserEndpoint = `${this.baseUrl}/:username`;
		this.app.route(getUserEndpoint).get(UserController.getProfile);

		// followers
		const followersEndpoint = `${this.baseUrl}/followers/:username`;
		this.app
			.use(followersEndpoint, AuthParser)
			.route(followersEndpoint)
			.get(UserController.getFollowers)
			.post(UserController.follow)
			.delete(UserController.unfollow);

		// following
		const followingEndpoint = `${this.baseUrl}/following/:username`;
		this.app.route(followingEndpoint).get(UserController.getFollowing);

		// feed
		const feedEndpoint = `${this.baseUrl}/feed`;
		this.app
			.use(feedEndpoint, AuthParser)
			.route(feedEndpoint)
			.get(UserController.getFeed);

		return this.app;
	}
}
