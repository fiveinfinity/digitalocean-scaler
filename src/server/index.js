import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import passport from 'passport';
import session from 'express-session';

import { setupRoutes } from './route';
import webpackConfig from '../../webpack.config';

const app = express();

const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.set('docker', docker);

app.use(bodyParser());

app.use(
	'/static/',
	webpackDevMiddleware(
		webpack(webpackConfig),
		{ noInfo: true }
	)
);

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

setupRoutes(app);

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

