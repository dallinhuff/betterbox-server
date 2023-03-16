import { Response } from './Response';

export class PostReviewResponse extends Response {
	private constructor(success: boolean, status: number, error?: string) {
		super(success, status, error);
	}

	static override success() {
		return new PostReviewResponse(true, 200);
	}

	static override error(status: number, error: string) {
		return new PostReviewResponse(false, status, error);
	}
}
