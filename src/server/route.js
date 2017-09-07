import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import passport from 'passport';
import { Strategy } from 'passport-local';

import { Template } from './template';
import { Application } from '../client';

import { api } from './api';
import { mustBeLoggedIn } from './middleware';

passport.use(new Strategy(
	function(username, password, done) {
		return done(null, { username, password });
	}
));

passport.serializeUser((user, done) => {
	done(null, JSON.stringify(user));
});
passport.deserializeUser((user, done) => {
	done(null, JSON.parse(user));
});

const setupRoutes = (app) => {
	api(app);
	app.post('/login',
		passport.authenticate('local'),
		(req, res) => {
			res.redirect('/');
		}
	);
	app.get('*',
		(req, res) => {
			const __html = renderToString(<StaticRouter context={{}} location={req.url}><Application/></StaticRouter>);
			res.send(
				renderToStaticMarkup(
					<Template __html={__html}/>
				)
			);
		}
	);
};

export { setupRoutes };