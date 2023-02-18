import { connect, Schema, model, Model } from 'mongoose';

export abstract class Dao {
	model: Model<any>;
	protected constructor(
		name: string,
		schema: Schema,
		collectionName?: string
	) {
		connect(process.env.DB_CONN);
		this.model = model(name, schema, collectionName);
	}
}
