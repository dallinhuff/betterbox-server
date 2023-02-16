const uri =
	'mongodb+srv://Betterbox:KABRcv0DeDbsie7D@cluster0.j0pczwb.mongodb.net/test';
import { MongoClient } from 'mongodb';

const client = new MongoClient(uri);

async function run() {
	try {
		const database = client.db('insertDB');
		const Users = database.collection('Users');
		// create a document to insert
		const User = {
			name: 'string',
			email: 'string',
			username: 'string',
			password: 'string',
			avatar: 'url',
		};
		const result = await Users.insertOne(User);
		console.log(
			`A document was inserted with the _id: ${result.insertedId}`
		);
	} finally {
		await client.close();
	}
}
run().catch(console.dir);
