export abstract class Service {
	abstract create(model: any): Promise<any>;
}
