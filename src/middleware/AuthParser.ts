import { Request as eReq, Response as eRes, NextFunction } from 'express';
import { Response } from '../response/Response';
import { AuthDao } from '../dao/AuthDao';

/**
 * Middleware for parsing the authToken header from a request and making it accessible via req.authToken!
 */
export async function parseAuthToken(req: eReq, res: eRes, next: NextFunction) {
	const token = req.header('authToken');
	if (!token || !(await new AuthDao().exists(token))) {
		const response = Response.error(401, 'Bad or missing authToken');
		res.status(response.status).send(response);
	} else {
		req.authToken = token;
	}
	next();
}

export default parseAuthToken;
