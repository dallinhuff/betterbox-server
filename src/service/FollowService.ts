import { AuthDao } from '../dao/AuthDao';
import { Service } from './Service';
import { Response } from '../response/Response';
import { FollowDao } from '../dao/FollowDao';
import { UserDao } from '../dao/UserDao';

export class FollowService extends Service {
	create(model: any): Promise<any> {
		return Promise.resolve(undefined);
	}

	async follow(authTokenString: string, username: string): Promise<Response> {
		const authDao = new AuthDao();
		const userDao = new UserDao();
		const authToken = await authDao.find(authTokenString);
		if (authToken != null) {
			const follow = await userDao.exists(username);
			if (follow != null) {
				return Response.error(401, 'Incorrect username');
			}
			const followDao = new FollowDao();
			const exist = await followDao.find(username, authToken.username);
			if (exist != null) {
				return Response.error(401, 'Relationship exist');
			}
			const followRelationship = await followDao.create(
				username,
				authToken.username
			);
			return Response.success('');
		}
		return Response.error(401, 'Incorrect username');
	}
}
