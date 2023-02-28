import { Response } from './Response';
import { User } from '../model/User';

export class GetProfileResponse extends Response {
	username?: string;
	name?: string;
	avatar?: string;

	protected constructor(
		success: boolean,
		status: number,
		error?: string,
		username?: string,
		name?: string,
		avatar?: string
	) {
		super(success, status);
		if (error) {
			this.error = error;
		} else {
			this.username = username;
			this.name = name;
			this.avatar = avatar;
		}
	}

	static override success(user: User) {
		return new GetProfileResponse(
			true,
			200,
			undefined,
			user.username,
			user.name,
			user.avatar
		);
	}

	get user(): Partial<User> {
		return {
			username: this.username,
			name: this.name,
			avatar: this.avatar,
		};
	}
}
