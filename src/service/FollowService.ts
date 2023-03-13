import { Service } from './Service';
import { Response } from '../response/Response';
import { FollowPageResponse } from '../response/FollowPageResponse';
import { FollowDao } from '../dao/FollowDao';
import { UserDao } from '../dao/UserDao';

export class FollowService extends Service {
	create(model: any): Promise<any> {
		return Promise.resolve(undefined);
	}

	async follow(userId: string, targetUsername: string): Promise<Response> {
		const userDao = new UserDao();
		const followDao = new FollowDao();
		const targetUserId = (await userDao.find(targetUsername))?.id;
		if (!targetUserId) {
			const err = `User with username ${targetUsername} does not exist`;
			return Response.error(401, err);
		}
		if (userId === targetUserId) {
			return Response.error(401, `User cannot follow self`);
		}
		const alreadyFollows = !!(await followDao.find(targetUserId, userId));
		if (alreadyFollows) {
			return Response.error(208, `User already follows ${targetUsername}`);
		}
		await followDao.create(userId, targetUserId);
		return Response.success('followed ' + targetUsername);
	}

	async delete(userId: string, targetUsername: string): Promise<Response> {
		const userDao = new UserDao();
		const followDao = new FollowDao();
		const targetUserId = (await userDao.find(targetUsername))?.id;
		if (!targetUserId) {
			const err = `User with username ${targetUsername} does not exist`;
			return Response.error(401, err);
		}
		const alreadyFollows = !!(await followDao.find(targetUserId, userId));
		if (alreadyFollows) {
			const success = await followDao.delete(targetUserId, userId);
			return Response.success('Deleted ' + targetUsername);
		} else {
			return Response.error(
				208,
				`Follow relationship doesn't exist with ${targetUsername}`
			);
		}
	}

	async following(userId: string, page: number): Promise<FollowPageResponse> {
		const followDao = new FollowDao();
		const following = followDao.following(userId, page);
	}
}
