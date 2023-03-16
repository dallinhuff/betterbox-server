import { User } from '../model/User';
import { UserDao } from '../dao/UserDao';
import { AuthDao } from '../dao/AuthDao';
import { LoginRequest } from '../request/LoginRequest';
import { LogoutRequest } from '../request/LogoutRequest';
import { UpdateUserRequest } from '../request/UpdateUserRequest';
import { LoginResponse } from '../response/LoginResponse';
import { RegisterRequest } from '../request/RegisterRequest';
import { UpdateUserResponse } from '../response/UpdateUserResponse';
import { LogoutResponse } from '../response/LogoutResponse';
import { GetProfileRequest } from '../request/GetProfileRequest';
import { GetOwnProfileRequest } from '../request/GetOwnProfileRequest';
import { GetProfileResponse } from '../response/GetProfileResponse';
import { GetOwnProfileResponse } from '../response/GetOwnProfileResponse';

export class UserService {
	/**
	 * Attempts to add a new user to the database
	 */
	async register(request: RegisterRequest): Promise<LoginResponse> {
		const dao = new UserDao();

		if (await dao.exists(request.username)) {
			const err = `User with username ${request.username} already exists.`;
			return LoginResponse.error(401, err);
		}

		try {
			const responseUser = await dao.create(request.user);
			const authToken = await new AuthDao().create(responseUser.id!);
			return LoginResponse.success(authToken);
		} catch (e) {
			return LoginResponse.error(500, `Internal server error: ${e}`);
		}
	}

	/**
	 * Attempts to initialize an authenticated session as an existing user
	 */
	async login(credentials: LoginRequest): Promise<LoginResponse> {
		const { username, password } = credentials;
		try {
			const foundUser = await new UserDao().findAndCheckPassword(
				username,
				password
			);
			if (foundUser) {
				const authToken = await new AuthDao().create(foundUser.id!);
				return LoginResponse.success(authToken);
			} else {
				return LoginResponse.error(401, 'Incorrect username or password');
			}
		} catch (e) {
			return LoginResponse.error(500, `Internal server error: ${e}`);
		}
	}

	async logout(request: LogoutRequest) {
		try {
			await new AuthDao().delete(request.authToken);
			return LogoutResponse.success();
		} catch (e) {
			return LogoutResponse.error(500, `Internal server error: ${e}`);
		}
	}

	async getProfile(request: GetProfileRequest) {
		try {
			const user = await this.find(request.username);
			if (!user) {
				return GetProfileResponse.error(
					401,
					`User with username ${request.username} does not exist.`
				);
			}
			return GetProfileResponse.success(user);
		} catch (e) {
			return GetProfileResponse.error(500, `Internal server error: ${e}`);
		}
	}

	async getOwnProfile(request: GetOwnProfileRequest) {
		try {
			const user = await this.findByAuthToken(request.authToken);
			return user
				? GetOwnProfileResponse.success(user)
				: GetOwnProfileResponse.error(400, 'bad authToken');
		} catch (e) {
			return GetOwnProfileResponse.error(500, `Internal server error: ${e}`);
		}
	}

	async update(request: UpdateUserRequest): Promise<UpdateUserResponse> {
		const existingUser = await this.findByAuthToken(request.authToken);

		if (!existingUser) {
			const err = 'Bad or expired authToken';
			return UpdateUserResponse.error(400, err);
		}

		// pre-processing for changing username
		if (request.username && request.username !== existingUser.username) {
			if (await new UserDao().exists(request.username)) {
				const err = `User with username ${request.username} already exists`;
				return UpdateUserResponse.error(401, err);
			}
		}

		try {
			await new UserDao().update(existingUser.id!, request.user);
			return UpdateUserResponse.success('');
		} catch (e) {
			const err = `Internal server error: ${e}`;
			return UpdateUserResponse.error(500, err);
		}
	}

	private async find(username: string) {
		return await new UserDao().find(username);
	}

	private async findByAuthToken(token: string): Promise<User | null> {
		const foundToken = await new AuthDao().find(token);
		if (foundToken) {
			return await new UserDao().findById(foundToken.userId);
		}
		return null;
	}
}
