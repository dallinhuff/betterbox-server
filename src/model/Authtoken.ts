import { createHash } from 'node:crypto';
export class Authtoken {
	token: string;

	constructor(user: string) {
		const hash = createHash('sha3-256').update(user).digest('hex');
		this.token = hash.slice(0, 4) + Date.now();
	}

	static from(obj: Authtoken): Authtoken {
		return new Authtoken(obj.token);
	}
}
