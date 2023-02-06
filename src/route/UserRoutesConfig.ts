import { Application } from "express";
import {RoutesConfig} from "./RoutesConfig";
import UserController from "../controller/UserController";

export class UserRoutesConfig extends RoutesConfig {
    constructor(app: Application, name: string) {
        super(app, name);
    }
    configureRoutes(): Application {
        this.app.route(`/user`)
            .post(UserController.register)
        this.app.route('/user/:username')
            .get(UserController.getProfile)
            .patch(UserController.update)
            .delete(UserController.remove)
        this.app.route('/user/auth')
            .post(UserController.login)
            .delete(UserController.logout)
        return this.app;
    }
}