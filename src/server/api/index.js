import { docker } from './docker';

export const api = app => {
	docker(app);
};