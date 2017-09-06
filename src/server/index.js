import express from 'express';

import { setupRoutes } from './route';

const app = express();

setupRoutes(app);

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});