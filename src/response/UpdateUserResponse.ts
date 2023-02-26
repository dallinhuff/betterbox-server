import { Response } from './Response';

export class UpdateUserResponse extends Response {
	constructor(success: boolean, status: number, error?: string) {
		super(success, status, error);
	}
}
