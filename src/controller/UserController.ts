import { Handler } from 'express';
import { UserService } from '../service/UserService';
import { LoginRequest } from '../request/LoginRequest';
import { LogoutRequest } from '../request/LogoutRequest';
import { RegisterRequest } from '../request/RegisterRequest';
import { UpdateUserRequest } from '../request/UpdateUserRequest';
import { FollowService } from '../service/FollowService';
import { GetProfileRequest } from '../request/GetProfileRequest';
import { GetOwnProfileRequest } from '../request/GetOwnProfileRequest';

export const getOwnProfile: Handler = async (req, res) => {
	const authToken = req.header('authToken') || '';
	const getOwnProfileRequest = new GetOwnProfileRequest(authToken);
	const response = await new UserService().getOwnProfile(getOwnProfileRequest);
	res.status(response.status).send(response);
};

/**
 * find the publicly available profile info for a specific user
 */
export const getProfile: Handler = async (req, res) => {
	const getProfileRequest = new GetProfileRequest(req.params.username);
	const response = await new UserService().getProfile(getProfileRequest);
	res.status(response.status).send(response);
};

/**
 * attempt to log in as a user with a given username and password
 */
export const login: Handler = async (req, res) => {
	const loginRequest = new LoginRequest(req.body.username, req.body.password);
	const response = await new UserService().login(loginRequest);
	res.status(response.status).send(response);
};

/**
 * log out of an active user session
 */
export const logout: Handler = async (req, res) => {
	const authToken = req.header('authToken') || '';
	const logoutRequest = new LogoutRequest(authToken);
	const response = await new UserService().logout(logoutRequest);
	res.status(response.status).send(response);
};

/**
 * create a new user profile and log in with the newly registered user
 */
export const register: Handler = async (req, res) => {
	const registerRequest = RegisterRequest.from(req.body);
	const response = await new UserService().register(registerRequest);
	res.status(response.status).send(response);
};

/**
 * update a user's own profile info
 */
export const update: Handler = async (req, res) => {
	const authToken = req.header('authToken') || '';
	const updateRequest = UpdateUserRequest.from(authToken, req.body);
	const response = await new UserService().update(updateRequest);
	res.status(response.status).send(response);
};

/**
 * delete a user's own profile
 */
export const remove: Handler = async (req, res) => {
	res.status(200).send('deleted');
};

/**
 * get a page of followers for a given user
 */
export const getFollowers: Handler = async (req, res) => {
	res.status(200).send('followers');
};

/**
 * get a page of followees for a given user
 */
export const getFollowing: Handler = async (req, res) => {
	res.status(200).send('following');
};

/**
 * follow a given user as a logged-in user
 */
export const follow: Handler = async (req, res) => {
	const authToken = req.header('authToken') || '';
	const response = await new FollowService().follow(
		authToken,
		req.params.username
	);
	res.status(response.status).send(response);
};

/**
 * unfollow a given user as a logged-in user
 */
export const unfollow: Handler = async (req, res) => {
	res.status(200).send('unfollow');
};

/**
 * get a page of a logged-in user's feed
 */
export const getFeed: Handler = async (req, res) => {
	res.status(200).send('feed');
};

export default {
	getOwnProfile,
	getProfile,
	login,
	logout,
	register,
	update,
	remove,
	getFollowers,
	getFollowing,
	follow,
	unfollow,
	getFeed,
};
