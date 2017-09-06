import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import { setupRoutes } from '../src/server/route';
import webpackConfig from '../webpack.config';

const app = express();

const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.set('docker', docker);

app.use(
    '/static/',
    webpackDevMiddleware(
        webpack(webpackConfig)
    )
);

setupRoutes(app);

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
