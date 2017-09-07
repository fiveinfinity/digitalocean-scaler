import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { routes } from './';

render(
	<BrowserRouter>{routes}</BrowserRouter>,
	document.getElementById('root')
);
