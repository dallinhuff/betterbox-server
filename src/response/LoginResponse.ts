import { Response } from './Response';

export class LoginResponse extends Response {
	authToken?: string;

	constructor(success: boolean, status: number, result: string) {
		super(success, status);
		if (success) {
			this.authToken = result;
		} else {
			this.error = result;
		}
	}

	static success(token: string) {
		return new LoginResponse(true, 200, token);
	}

	static error(status: number, error: string) {
		return new LoginResponse(false, status, error);
	}
}
