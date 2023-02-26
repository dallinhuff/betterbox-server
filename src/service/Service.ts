export abstract class Service {
	// TODO: probably can delete this method and just have services
	// implement whatever methods they need
	abstract create(model: any): Promise<any>;
}
