export class User {
	username: string;
	password: string;
	email: string;
	name: string;
	avatar: string;

	constructor(
		username: string,
		password: string,
		email: string,
		name: string,
		avatar: string
	) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.name = name;
		this.avatar = avatar;
	}

	static from(obj: User): User {
		return new User(obj.username, obj.password, obj.email, obj.name, obj.avatar);
	}
}
