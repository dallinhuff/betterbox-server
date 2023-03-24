import { Service } from './Service';
import { Response } from '../response/Response';
import { FollowPageResponse } from '../response/FollowPageResponse';
import { FollowDao } from '../dao/FollowDao';
import { UserDao } from '../dao/UserDao';
import { User } from '../model/User';
import { use } from 'chai';

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
		const alreadyFollows = !!(await followDao.find(userId, targetUserId));
		if (alreadyFollows) {
			return Response.error(208, `User already follows ${targetUsername}`);
		}
		await followDao.create(userId, targetUserId);
		return Response.success('followed ' + targetUsername);
	}

	async unfollow(userId: string, targetUsername: string): Promise<Response> {
		const userDao = new UserDao();
		const followDao = new FollowDao();
		const targetUserId = (await userDao.find(targetUsername))?.id;
		if (!targetUserId) {
			const err = `User with username ${targetUsername} does not exist`;
			return Response.error(401, err);
		}
		const alreadyFollows = !!(await followDao.find(userId, targetUserId));
		if (alreadyFollows) {
			const success = await followDao.delete(userId, targetUserId);
			return Response.success('Deleted ' + targetUsername);
		} else {
			return Response.error(
				208,
				`Follow relationship doesn't exist with ${targetUsername}`
			);
		}
	}

	async following(userId: string, page: any): Promise<FollowPageResponse> {
		try {
			const followDao = new FollowDao();
			const userDao = new UserDao();
			const following = await followDao.following(userId, page);
			const followIDS = following.map((id) => id.follower);
			const followingUsers = await userDao.findByArray(followIDS);
			return FollowPageResponse.success(followingUsers);
		} catch (e) {
			return FollowPageResponse.error(500, `Internal server error: ${e}`);
		}
	}

	async followers(userId: string, page: any): Promise<FollowPageResponse> {
		try {
			const followDao = new FollowDao();
			const userDao = new UserDao();
			const followers = await followDao.followers(userId, page);
			const followIDS = followers.map((id) => id.followee);
			const followersUsers = await userDao.findByArray(followIDS);
			return FollowPageResponse.success(followersUsers);
		} catch (e) {
			return FollowPageResponse.error(500, `Internal server error: ${e}`);
		}
	}
}
