import { Dao } from './Dao';
import { ObjectId, Schema } from 'mongoose';
import { User } from '../model/User';
import bcrypt from 'bcrypt';

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
		user.password = await this.hashPassword(user.password);
		const { username, email, name, avatar, _id } = await this.model.create(user);
		return { username, email, name, avatar, id: _id };
	}

	async update(userId: string, user: Partial<User>) {
		if (user.password) {
			user.password = await this.hashPassword(user.password);
		}
		return this.model.findByIdAndUpdate(userId, user);
	}

	async delete(user: User) {
		return this.model.deleteOne({ username: user.username });
	}

	async find(username: string) {
		const dbModel = await this.model.findOne({ username });
		return dbModel ? User.from({ ...dbModel, id: dbModel._id }) : null;
	}

	async findAndCheckPassword(username: string, password?: string) {
		const dbModel = await this.model.findOne({ username });
		if (dbModel && (await bcrypt.compare(password || '', dbModel.password))) {
			return User.from({ ...dbModel, id: dbModel._id });
		}
		return null;
	}

	/**
	 * Salts and hashes the password before storing it in the database
	 */
	private async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	async findById(id: string) {
		const dbModel = await this.model.findById(id);
		return dbModel ? User.from(dbModel) : null;
	}

	async findByArray(ids: Array<String>) {
		console.log(ids);
		const dbModels = await await this.model.find({
			_id: { $in: ids },
		});
		return dbModels.map(
			(user) =>
				new User(user.username, '', '', user.name, user.avatar, user.id)
		);
	}
}
