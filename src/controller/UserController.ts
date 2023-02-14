import { Handler } from 'express';

export const getProfile: Handler = async (req, res) => {
	res.status(200).send('get user');
};

export const login: Handler = async (req, res) => {
	res.status(200).send('logged in');
};

export const logout: Handler = async (req, res) => {
	res.status(200).send('logged out');
};

export const register: Handler = async (req, res) => {
	res.status(200).send('registered');
};

export const update: Handler = async (req, res) => {
	res.status(200).send('updated');
};

export const remove: Handler = async (req, res) => {
	res.status(200).send('deleted');
};

export const getFollowers: Handler = async (req, res) => {
	res.status(200).send('followers');
};

export const getFollowing: Handler = async (req, res) => {
	res.status(200).send('following');
};

export const follow: Handler = async (req, res) => {
	res.status(200).send('follow');
};

export const unfollow: Handler = async (req, res) => {
	res.status(200).send('unfollow');
};

export const getFeed: Handler = async (req, res) => {
	res.status(200).send('feed');
};

export default {
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
