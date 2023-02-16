export {};

/**
 * These are all the environment variables that should be set in
 * your .env file before running the application
 */
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			APP_PORT: string;
			DB_CONN: string;
		}
	}
}
