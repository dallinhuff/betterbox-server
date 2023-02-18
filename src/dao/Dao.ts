import mongoose, { Schema, model, Model } from 'mongoose';

export abstract class Dao {
	connection: any;
	model: Model<any>;
	protected constructor(
		name: string,
		schema: Schema,
		collectionName?: string
	) {
		this.connect().then((r) => (this.connection = r));
		this.model = model(name, schema, collectionName);
	}

	async connect() {
		mongoose.set('strictQuery', false);
		await mongoose.connect(`${process.env.DB_CONN}`);
		return mongoose.connection;
	}
}
