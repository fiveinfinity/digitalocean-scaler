import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { Template } from './template';
import { Application } from '../client';

const setupRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send(
            renderToStaticMarkup(
                <Template __html={renderToString(<Application/>)}/>
            )
        )
    });
};

export { setupRoutes };