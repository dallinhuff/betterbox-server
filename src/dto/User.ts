export class User {
	name: String;
	handle: String;
	email: String;
	password: String;

	constructor(name: string, handle: String, email: String, password: String) {
		this.name = name;
		this.handle = handle;
		this.email = email;
		this.password = password;
	}
}
