import { AuthRequest } from './AuthRequest';

export class GetOwnProfileRequest extends AuthRequest {
	constructor(authToken: string, userId: string) {
		super(authToken, userId);
	}
}
