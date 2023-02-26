export class Response {
	success: boolean;
	status: number;
	error?: string;

	constructor(success: boolean, status: number, error?: string) {
		this.success = success;
		this.status = status;
		this.error = error;
	}
}
