import { Service } from './Service';

export class FeedService extends Service {
	create(model: any): Promise<any> {
		return Promise.resolve(undefined);
	}
}
