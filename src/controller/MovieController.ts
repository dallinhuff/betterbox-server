import { Handler } from 'express';

export const getMovieInfo: Handler = async (req, res) => {
	res.status(200).send('movie info');
};

export default { getMovieInfo };
