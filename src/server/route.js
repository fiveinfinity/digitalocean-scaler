import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
// import passport from 'passport';

import { Template } from './template';
import { routes } from '../client';

import { api } from './api';

const setupRoutes = (app) => {
	api(app);
	app.get('*', (req, res) => {
		const __html = renderToString(<StaticRouter location={req.url}>{routes}</StaticRouter>);
		res.send(
			renderToStaticMarkup(
				<Template __html={__html}/>
			)
		);
	});
};

export { setupRoutes };