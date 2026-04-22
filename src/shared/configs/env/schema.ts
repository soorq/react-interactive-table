import { z } from 'zod/v4';

export const ENV_SCHEMA = z.object({
	VITE_API_URL: z.string().url().nonempty({ error: 'VITE_API_URL is required', abort: true }),
});
