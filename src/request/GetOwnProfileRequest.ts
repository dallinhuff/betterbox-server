import { AuthRequest } from './AuthRequest';

export class GetOwnProfileRequest extends AuthRequest {
	constructor(authToken: string) {
		super(authToken);
	}
}
