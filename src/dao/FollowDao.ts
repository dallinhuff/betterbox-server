import { Dao } from './Dao';
import { Schema } from 'mongoose';

const Follow = new Schema({
	follow: String,
	follower: String,
});

export class FollowDao extends Dao {
	followersPerPage = 10;
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

	async delete(follow: string, follower: string) {
		return this.model.deleteOne({
			follow: follow,
			follower: follower,
		});
	}

	async followers(follow: string, page: number) {
		this.model
			.find({
				where: {
					follow: follow,
				},
			})
			.skip(page * this.followersPerPage)
			.limit(this.followersPerPage);
	}

	async following(follower: string, page: number) {
		this.model
			.find({
				where: {
					follower: follower,
				},
			})
			.skip(page * this.followersPerPage)
			.limit(this.followersPerPage);
	}
}
