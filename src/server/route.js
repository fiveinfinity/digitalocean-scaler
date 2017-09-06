import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import passport from 'passport';

import { Template } from './template';
import { Application } from '../client';

import { api } from './api';

const setupRoutes = (app) => {
    api(app);
    app.get('/', (req, res) => {
        res.send(
            renderToStaticMarkup(
                <Template __html={renderToString(<Application/>)}/>
            )
        )
    });
    app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
};

export { setupRoutes };