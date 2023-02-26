import { Request } from './Request';

export class AuthRequest extends Request {
	authToken: string;

	constructor(token: string) {
		super();
		this.authToken = token;
	}
}
