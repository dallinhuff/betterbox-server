import bcrypt from 'bcrypt';

import { Service } from './Service';
import { User } from '../model/User';
import { UserDao } from '../dao/UserDao';
import { AuthDao } from '../dao/AuthDao';

interface LoginResponse {
	success: boolean;
	status: number;
	authToken?: string;
	error?: string;
}

export class UserService extends Service {
	/**
	 * Attempts to add a new user to the database
	 */
	async create(user: User): Promise<LoginResponse> {
		const dao = new UserDao();

		if (await dao.exists(user)) {
			return {
				success: false,
				status: 400,
				error: `User with username ${user.username} already exists.`,
			};
		}

		try {
			await this.hashPassword(user);
			const responseUser = await new UserDao().create(user);
			const authToken = await new AuthDao().create(responseUser.username);
			return {
				success: true,
				status: 200,
				authToken,
			};
		} catch (e) {
			return {
				success: false,
				status: 500,
				error: `Internal server error: ${e}`,
			};
		}
	}

	/**
	 * Attempts to initialize an authenticated session as an existing user
	 */
	async login(username: string, password: string): Promise<LoginResponse> {
		const dao = new UserDao();
		try {
			const foundUser = await dao.find(username);
			if (await this.comparePassword(password, foundUser.password)) {
				const authToken = await new AuthDao().create(foundUser.username);
				return {
					success: true,
					status: 200,
					authToken,
				};
			} else {
				return {
					success: false,
					status: 401,
					error: `Unauthorized`,
				};
			}
		} catch (e) {
			return {
				success: false,
				status: 500,
				error: `Internal server error: ${e}`,
			};
		}
	}

	/**
	 * Salts and hashes the password before storing it in the database
	 */
	private async hashPassword(user: User) {
		user.password = await bcrypt.hash(user.password, 10);
	}

	/**
	 * Compares a user's plaintext password to the
	 * stored hashed & salted password in the database
	 */
	private async comparePassword(plainText: string, foundHash: string) {
		return await bcrypt.compare(plainText, foundHash);
	}
}
