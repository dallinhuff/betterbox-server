import { Application } from 'express';
import { RoutesConfig } from './RoutesConfig';
import UserController from '../controller/UserController';

export class UserRoutesConfig extends RoutesConfig {
	constructor(app: Application, name: string) {
		super(app, name);
	}

	configureRoutes(): Application {
		this.app.route('/user/register').post(UserController.register);
		this.app.route('user/login').post(UserController.login);
		this.app
			.route('/user/:username')
			.get(UserController.getProfile)
			.patch(UserController.update)
			.delete(UserController.remove);

		return this.app;
	}
}
