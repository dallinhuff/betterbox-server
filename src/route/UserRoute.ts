import express from 'express';
import { RoutesConfig } from './RoutesConfig';
import UsersController from '../controllers/UserController';

export  class UserRoute extends RoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }
    configureRoutes(): express.Application {
        this.app
            .route('/users')
            .post(UsersController.createUser)
        return this.app;
    }
}