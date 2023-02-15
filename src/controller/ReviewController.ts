import { Handler } from 'express';

export const getByUser: Handler = async (req, res) => {
	res.status(200).send('reviews by user');
};

export const getByMovie: Handler = async (req, res) => {
	res.status(200).send('reviews by movie');
};

export const postReview: Handler = async (req, res) => {
	res.status(200).send('new review');
};

export const editReview: Handler = async (req, res) => {
	res.status(200).send('edit review');
};

export const deleteReview: Handler = async (req, res) => {
	res.status(200).send('delete review');
};

export const likeReview: Handler = async (req, res) => {
	res.status(200).send('like review');
};

export const unlikeReview: Handler = async (req, res) => {
	res.status(200).send('unlike review');
};

export default {
	getByUser,
	getByMovie,
	postReview,
	editReview,
	deleteReview,
	likeReview,
	unlikeReview,
};
