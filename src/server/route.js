import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import passport from 'passport';
import { Strategy } from 'passport-digitalocean';
import config from 'config';
import fetch from 'node-fetch';

import { Template } from './template';
import { Application } from '../client';

import { api } from './api';

passport.use(new Strategy(
	{
		clientID: config.DIGITALOCEAN_CLIENT_ID,
		clientSecret: config.DIGITALOCEAN_CLIENT_SECRET,
		callbackURL: 'http://127.0.0.1:3000/auth/digitalocean/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(() => {
			done(null, { accessToken, refreshToken, profile });
		});
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
	app.get('/auth/digitalocean/callback',
		passport.authenticate('digitalocean', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/');
		}
	);
	app.get('/create-container', (req, res) => {
		const { accessToken } = JSON.parse(req.session.passport.user);
		const headers = {
			'Authorization': `Bearer ${accessToken}`
		};
		fetch('https://api.digitalocean.com/v2/droplets', {
			method: 'GET',
			headers,
			body: {
				'name': 'example.com',
				'region': 'nyc3',
				'size': '512mb',
				'image': 'ubuntu-14-04-x64',
				'ssh_keys': null,
				'backups': false,
				'ipv6': true,
				'user_data': null,
				'private_networking': null,
				'volumes': null,
				'tags': [
					'web'
				]
			}
		}).then(resp => {
			res.redirect(req.header('Referer'));
			return resp.json();
		}).then(console.log).catch(console.log);
	});
	app.get('*',
		(req, res) => {
			const __html = renderToString(
				<StaticRouter context={{}} location={req.url}>
					<Application/>
				</StaticRouter>
			);
			res.send(
				renderToStaticMarkup(
					<Template __html={__html}/>
				)
			);
		}
	);
};

export { setupRoutes };