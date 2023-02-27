import { Request } from './Request';

export class GetOwnProfileRequest extends Request {
	authToken: string;

	constructor(authToken: string) {
		super();
		this.authToken = authToken;
	}
}
