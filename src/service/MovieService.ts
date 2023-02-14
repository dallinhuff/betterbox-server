import { Service } from './Service';

export class MovieService extends Service {
	create(model: any): Promise<any> {
		return Promise.resolve(undefined);
	}
}
