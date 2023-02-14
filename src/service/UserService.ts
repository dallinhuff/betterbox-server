import { Service } from './Service';
import { User } from '../model/User';

export class UserService extends Service {
	async create(user: User): Promise<User> {
		return user;
	}
}
