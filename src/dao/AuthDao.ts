import { Dao } from './Dao';
import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

const AuthTokenSchema = new Schema({
	token: String,
	username: String,
	expire: String,
});

export class AuthDao extends Dao {
	constructor() {
		super('AuthToken', AuthTokenSchema, 'authTokens');
	}

	async exists(token: string) {
		return !!(await this.find(token));
	}

	async create(username: string) {
		const expire = Date.now() + 2 * 60 * 60 * 1000;
		const authToken = await this.model.create({
			token: uuid(),
			username,
			expire,
		});
		return authToken.token;
	}

	async find(token: string) {
		const foundToken = await this.model.findOne({ token });
		if (foundToken && foundToken.expire > Date.now()) {
			if (foundToken.expire > Date.now()) {
				foundToken.expire = Date.now() + 2 * 60 * 60 * 1000;
				this.model.findByIdAndUpdate(foundToken);
				return foundToken;
			} else {
				this.model.findByIdAndDelete(foundToken);
				return null;
			}
		}
		return null;
	}

	async delete(token: string) {
		this.model.findOneAndDelete({ token });
	}
}
