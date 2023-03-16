import { Dao } from './Dao';
import { Schema } from 'mongoose';
import { Review } from '../model/Review';

const ReviewSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	movieId: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	liked: {
		type: Boolean,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Number,
		required: true,
	},
	numLikes: {
		type: Number,
		required: true,
	},
});

export class ReviewDao extends Dao {
	constructor() {
		super('ReviewDao', ReviewSchema, 'reviews');
	}

	async postReview(review: Review) {
		return await this.model.create(review);
	}
}
