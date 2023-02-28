/**
 * a response object returned by a service method
 */
export class Response {
	success: boolean;
	status: number;
	error?: string;

	/**
	 * instead of using the 'new' keyword, response objects
	 * are created through static success and error methods
	 * subclasses should have private constructors unless
	 * they are also superclasses
	 */
	protected constructor(success: boolean, status: number, error?: string) {
		this.success = success;
		this.status = status;
		this.error = error;
	}

	/*
	 * subclasses should override this method with a typed method signature
	 */
	static success(content: any) {
		return new Response(true, 200);
	}

	/**
	 * subclasses may override this method if they need to
	 * (e.g., prepend or parse the error message with something before returning it)
	 */
	static error(status: number, error: string): Response {
		return new Response(false, status, error);
	}
}
