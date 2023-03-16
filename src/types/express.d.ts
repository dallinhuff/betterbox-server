declare namespace Express {
	export interface Request {
		authToken?: string;
		userId?: string;
	}
}
