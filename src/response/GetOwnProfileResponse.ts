import { GetProfileResponse } from './GetProfileResponse';
import { User } from '../model/User';

export class GetOwnProfileResponse extends GetProfileResponse {
	email?: string;

	private constructor(
		success: boolean,
		status: number,
		error?: string,
		username?: string,
		name?: string,
		avatar?: string,
		email?: string
	) {
		super(success, status, error, username, name, avatar);
		this.email = email;
	}

	static override success(user: User) {
		return new GetOwnProfileResponse(
			true,
			200,
			undefined,
			user.username,
			user.name,
			user.avatar,
			user.email
		);
	}

	override get user(): Partial<User> {
		return {
			username: this.username,
			name: this.name,
			avatar: this.avatar,
			email: this.email,
		};
	}
}
