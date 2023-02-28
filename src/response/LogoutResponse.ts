import { Response } from './Response';

export class LogoutResponse extends Response {
	private constructor(success: boolean, status: number, error?: string) {
		super(success, status, error);
	}

	static success() {
		return new LogoutResponse(true, 200);
	}

	static error(status: number, error: string) {
		return new LogoutResponse(false, status, error);
	}
}
