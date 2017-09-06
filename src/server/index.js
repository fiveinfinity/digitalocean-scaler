import React from 'react';
import express from 'express';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { Application } from '../client';
import { Template } from './template';

const app = express();

app.get('/', (req, res) => {
	res.send(
		renderToStaticMarkup(
			<Template __html={renderToString(<Application/>)}/>
		)
	)
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});