import express from 'express';

class UsersController {
    async createUser(req: express.Request, res: express.Response) {
        res.status(201).send('Hello');
        console.log("hit");
    }
}
export default new UsersController();