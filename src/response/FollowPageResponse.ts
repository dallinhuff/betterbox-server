import { Response } from './Response';
export class FollowPageResponse extends Response {
	follow?: Array<Object>;

	private constructor(
		success: boolean,
		status: number,
		error?: string,
		follow?: Array<Object>
	) {
		super(success, status);
		this.follow = follow;
	}

	static override success(followObjects: Array<Object>) {
		return new FollowPageResponse(true, 200, undefined, followObjects);
	}
}
