import { Dao } from './Dao';
import { Schema } from 'mongoose';
import { stat } from 'fs';

const Follow = new Schema({
	follow: String,
	follower: String,
});

export class FollowDao extends Dao {
	constructor() {
		super('Follow', Follow, 'follow');
	}

	// async exists(token: string) {
	// 	return !!(await this.find(token));
	// }

	async create(follow: string, follower: string) {
		const followRelationship = await this.model.create({
			follow: follow,
			follower: follower,
		});
		return followRelationship;
	}

	async find(token: string) {
		// const foundToken = await this.model.findOne({ token });
		// if (foundToken && foundToken.expire > Date.now()) {
		// 	if (foundToken.expire > Date.now()) {
		// 		foundToken.expire = Date.now() + 2 * 60 * 60 * 1000;
		// 		this.model.findByIdAndUpdate(foundToken);
		// 		return foundToken;
		// 	} else {
		// 		this.model.findByIdAndDelete(foundToken);
		// 		return null;
		// 	}
		// }
		// return null;
	}

	async delete(token: string) {
		this.model.findOneAndDelete({ token });
	}
}
