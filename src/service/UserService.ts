import { Service } from './Service';
import { User } from '../model/User';
import { UserDao } from '../dao/UserDao';

interface RegisterResponse {
	success: boolean;
	status: number;
	user?: User;
	error?: string;
}

export class UserService extends Service {
	async create(user: User): Promise<RegisterResponse> {
		const dao = new UserDao();

		if (await dao.exists(user)) {
			return {
				success: false,
				status: 400,
				error: `User with username ${user.username} already exists.`,
			};
		}

		try {
			const responseUser = await new UserDao().create(user);
			return {
				success: true,
				status: 200,
				user: responseUser,
			};
		} catch (e) {
			return {
				success: false,
				status: 500,
				error: `Internal server error: ${e}`,
			};
		}
	}
}
