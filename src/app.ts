import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import {RoutesConfig} from './route/RoutesConfig';
import debug from 'debug';
import {UserRoutesConfig} from "./route/UserRoutesConfig";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<RoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());
app.use(expressWinston.logger({
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
	meta: !!process.env.DEBUG // when not debugging, log requests as one-liners
}));

// push route configurations to route
routes.push(new UserRoutesConfig(app, 'userRoutes'));

// simple route to make sure everything is working
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
	res.status(200).send(runningMessage)
});

server.listen(port, () => {
	routes.forEach((route) => {
		debugLog(`Routes configured for ${route.getName()}`);
	});

	console.log(runningMessage);
})