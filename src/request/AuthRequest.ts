import { Request } from './Request';

export class AuthRequest extends Request {
	authToken: string;
	userId: string;

	constructor(token: string, userId: string) {
		super();
		this.authToken = token;
		this.userId = userId;
	}
}
