import { AuthRequest } from './AuthRequest';

export class LogoutRequest extends AuthRequest {
	constructor(authToken: string) {
		super(authToken);
	}
}
