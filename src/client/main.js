import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { Application } from './';

render(
	<BrowserRouter><Application/></BrowserRouter>,
	document.getElementById('root')
);
