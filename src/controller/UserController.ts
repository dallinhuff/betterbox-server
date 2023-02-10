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

export default {
	getProfile,
	login,
	logout,
	register,
	update,
	remove,
};
