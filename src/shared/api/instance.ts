import { ENV_VARIABLES } from '../configs/env';

export const API = {
	get(url: string, signal?: AbortSignal): Promise<Response> {
		return fetch(`${ENV_VARIABLES.VITE_API_URL}${url}`, {
			method: 'GET',
			signal,
			cache: 'force-cache',
		});
	},
};
