import { Request } from './Request';

export class GetProfileRequest extends Request {
	username: string;

	constructor(username: string) {
		super();
		this.username = username;
	}
}
