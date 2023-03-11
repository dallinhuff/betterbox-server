import { AuthRequest } from './AuthRequest';

export class LogoutRequest extends AuthRequest {
	constructor(authToken: string, userId: string) {
		super(authToken, userId);
	}
}
