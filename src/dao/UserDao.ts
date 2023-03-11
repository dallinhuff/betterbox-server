import { Dao } from './Dao';
import { Schema } from 'mongoose';
import { User } from '../model/User';

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

	async exists(username: string) {
		return this.model.exists({ username });
	}

	async create(user: User) {
		if (await this.exists(user.username)) {
			throw new Error(
				`Cannot create user. Username ${user.username} already exists.`
			);
		}
		const { username, email, name, avatar, _id } = await this.model.create(user);
		return { username, email, name, avatar, id: _id };
	}

	async update(userId: string, user: Partial<User>) {
		return this.model.findByIdAndUpdate(userId, user);
	}

	async delete(user: User) {
		return this.model.deleteOne({ username: user.username });
	}

	async find(username: string) {
		const dbModel = await this.model.findOne({ username });
		return dbModel ? User.from({ ...dbModel, id: dbModel._id }) : null;
	}

	async findById(id: string) {
		const dbModel = await this.model.findById(id);
		return dbModel ? User.from({ ...dbModel, id: dbModel._id }) : null;
	}
}
