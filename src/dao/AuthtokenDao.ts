import { Dao } from './Dao';
import { Schema } from 'mongoose';
import { Authtoken } from '../model/Authtoken';

const AuthtokenSchema = new Schema({
	Authtoken: String,
});

export class AuthtokenDao extends Dao {
	constructor() {
		super('Authtoken', AuthtokenSchema);
	}

	async exists(authtoken: Authtoken) {
		return this.model.exists({ Authtoken: authtoken });
	}

	async create(authtoken: Authtoken) {
		if (await this.exists(authtoken)) {
			throw new Error(
				`Cannot create Authtoken. Authtoken ${authtoken.token} already exists.`
			);
		}
		return await this.model.create(authtoken);
	}

	async delete(authtoken: Authtoken) {
		return this.model.deleteOne({ Authtoken: authtoken });
	}
}
