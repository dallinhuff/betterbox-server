import { Request } from './Request';
import { User } from '../model/User';

export class RegisterRequest extends Request {
	username: string;
	password: string;
	name: string;
	email: string;
	avatar: string;

	constructor(
		username: string,
		password: string,
		name: string,
		email: string,
		avatar: string
	) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.avatar = avatar;
	}

	static from(user: User) {
		return new RegisterRequest(
			user.username,
			user.password,
			user.name,
			user.email,
			user.avatar
		);
	}

	get user() {
		return new User(
			this.username,
			this.password,
			this.email,
			this.name,
			this.avatar
		);
	}
}
