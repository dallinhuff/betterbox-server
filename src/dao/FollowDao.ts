import { Dao } from './Dao';
import { Schema } from 'mongoose';

const Follow = new Schema({
	follow: String,
	follower: String,
});

export class FollowDao extends Dao {
	constructor() {
		super('Follow', Follow, 'follows');
	}

	async create(follow: string, follower: string) {
		const followRelationship = await this.model.create({
			follow: follow,
			follower: follower,
		});
		return followRelationship;
	}

	async find(follow: string, follower: string) {
		const dbModel = await this.model.findOne({
			follow: follow,
			follower: follower,
		});
		return dbModel;
	}
}
