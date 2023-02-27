import { Response } from './Response';
import { User } from '../model/User';

export class GetProfileResponse extends Response {
	user?: User;
	constructor(success: boolean, status: number, user?: User, error?: string) {
		super(success, status);
		if (user) {
			this.user = user;
		}
		if (error) {
			this.error = error;
		}
	}

	static success(user: User) {
		return new GetProfileResponse(true, 200, user);
	}

	static error(status: number, error: string) {
		return new GetProfileResponse(false, status, undefined, error);
	}
}
