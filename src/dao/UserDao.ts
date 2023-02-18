import { Dao } from './Dao';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
	username: String,
	password: String,
	email: String,
	name: String,
	avatar: String,
});

export class UserDao extends Dao {
	constructor() {
		super('User', UserSchema);
	}
}
