import { Dao } from './Dao';
import { Schema } from 'mongoose';

const FollowSchema = new Schema({
	followee: String,
	follower: String,
});

export class FollowDao extends Dao {
	followersPerPage = 10;
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

	async following(followee: string, page: number) {
		return await this.model
			.find({
				followee: followee,
			})
			.skip(page * this.followersPerPage)
			.limit(this.followersPerPage);
	}

	async followers(follower: string, page: number) {
		return await this.model
			.find({
				follower: follower,
			})
			.skip(page * this.followersPerPage)
			.limit(this.followersPerPage);
	}
}
