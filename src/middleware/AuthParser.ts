import { Request as eReq, Response as eRes, NextFunction } from 'express';
import { Response } from '../response/Response';
import { AuthDao } from '../dao/AuthDao';

/**
 * Middleware for parsing the authToken header from a request and
 * making it and its associated userId accessible via req.authToken! and req.userId!
 */
export async function parseAuthToken(req: eReq, res: eRes, next: NextFunction) {
	const token = req.header('authToken');
	if (!token) {
		const response = Response.error(401, 'Missing authToken');
		res.status(response.status).send(response);
	} else {
		const authTokenObj = await new AuthDao().find(token);
		if (!authTokenObj) {
			const response = Response.error(401, 'Bad or expired authToken');
			res.status(response.status).send(response);
		} else {
			req.authToken = token;
			req.userId = authTokenObj.userId.toString();
		}
	}
	next();
}

export default parseAuthToken;
