import { Dao } from './Dao';
import { Schema } from 'mongoose';

const FollowSchema = new Schema({
	followee: String,
	follower: String,
});

export class FollowDao extends Dao {
	constructor() {
		super('Follow', FollowSchema, 'follows');
	}

	async create(followee: string, follower: string) {
		return await this.model.create({ followee, follower });
	}

	async find(followee: string, follower: string) {
		return this.model.findOne({ followee, follower });
	}

	async delete(followee: string, follower: string) {
		return this.model.deleteOne({ followee, follower });
	}
}
