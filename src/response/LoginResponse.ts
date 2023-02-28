import { Response } from './Response';

export class LoginResponse extends Response {
	authToken?: string;

	private constructor(success: boolean, status: number, result: string) {
		super(success, status);
		if (success) {
			this.authToken = result;
		} else {
			this.error = result;
		}
	}

	static override success(token: string) {
		return new LoginResponse(true, 200, token);
	}
}
