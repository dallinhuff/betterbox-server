import { Request } from './Request';

export class LoginRequest extends Request {
	username: string;
	password: string;

	constructor(username: string, password: string) {
		super();
		this.username = username;
		this.password = password;
	}
}
