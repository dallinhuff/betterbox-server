import { AuthRequest } from './AuthRequest';
import { User } from '../model/User';

export class UpdateUserRequest extends AuthRequest {
	username?: string;
	password?: string;
	name?: string;
	email?: string;
	avatar?: string;

	constructor(
		authToken: string,
		userId: string,
		username?: string,
		password?: string,
		name?: string,
		email?: string,
		avatar?: string
	) {
		super(authToken, userId);
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.avatar = avatar;
	}

	static from(authToken: string, user: Partial<User>) {
		return new UpdateUserRequest(
			authToken,
			user.id!,
			user.username,
			user.password,
			user.name,
			user.email,
			user.avatar
		);
	}

	get user(): Partial<User> {
		return {
			...(this.username && { username: this.username }),
			...(this.password && { password: this.password }),
			...(this.name && { name: this.name }),
			...(this.email && { email: this.email }),
			...(this.avatar && { avatar: this.avatar }),
		};
	}
}
