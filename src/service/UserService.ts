import bcrypt from 'bcrypt';

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
			request.password = await this.hashPassword(request.password);
			const responseUser = await dao.create(request.user);
			const authToken = await new AuthDao().create(responseUser.username);
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
			const foundUser = await new UserDao().find(username);
			if (await this.comparePassword(password, foundUser.password)) {
				const authToken = await new AuthDao().create(foundUser.username);
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

	/**
	 * Salts and hashes the password before storing it in the database
	 */
	private async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	/**
	 * Compares a user's plaintext password to the
	 * stored hashed & salted password in the database
	 */
	private async comparePassword(plainText: string, foundHash: string) {
		return await bcrypt.compare(plainText, foundHash);
	}

	async getProfile(request: GetProfileRequest) {
		try {
			const user = await this.find(request.username);
			return GetProfileResponse.success(user);
		} catch (e) {
			return GetProfileResponse.error(500, `Internal server error: ${e}`);
		}
	}

	async getOwnProfile(
		request: GetOwnProfileRequest
	): Promise<GetOwnProfileResponse> {
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
			return new UpdateUserResponse(false, 400, err);
		}

		// pre-processing for changing username
		if (request.username && request.username !== existingUser.username) {
			if (await new UserDao().exists(request.username)) {
				const err = `User with username ${request.username} already exists`;
				return new UpdateUserResponse(false, 401, err);
			}
		}

		// pre-processing for changing password
		if (request.password) {
			request.password = await this.hashPassword(request.password);
		}

		try {
			await new UserDao().update(request.user);
			return new UpdateUserResponse(true, 200);
		} catch (e) {
			const err = `Internal server error: ${e}`;
			return new UpdateUserResponse(false, 500, err);
		}
	}

	private async find(username: string) {
		// TODO: need to sanitize the email and password out of this
		return await new UserDao().find(username);
	}

	private async findByAuthToken(token: string): Promise<User | null> {
		// TODO: need to sanitize the password out of this
		const foundToken = await new AuthDao().find(token);
		if (foundToken) {
			return await this.find(foundToken.username);
		}
		return null;
	}
}
