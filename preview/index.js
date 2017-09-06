import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import { setupRoutes } from '../src/server/route';
import webpackConfig from '../webpack.config';

const app = express();

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
