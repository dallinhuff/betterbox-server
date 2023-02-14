import express from 'express';

/**
 * The base RoutesConfig class any route configuration classes must
 * override and implement
 */
export abstract class RoutesConfig {
	app: express.Application;
	name: string;
	readonly baseUrl: string;

	protected constructor(
		app: express.Application,
		name: string,
		baseUrl: string
	) {
		this.app = app;
		this.name = name;
		this.baseUrl = baseUrl;
		this.configureRoutes();
	}

	getName() {
		return this.name;
	}

	abstract configureRoutes(): express.Application;
}
