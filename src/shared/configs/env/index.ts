import { ENV_SCHEMA } from './schema';

const parsedEnv = ENV_SCHEMA.safeParse(import.meta.env);

if (!parsedEnv.success || parsedEnv.error) {
	const errorMessages = parsedEnv.error.issues
		.map(issue => `[ENV] ${issue.path.join('.')}: ${issue.message}`)
		.join('\n');

	console.error('Ошибка конфигурации окружения:\n' + errorMessages);
	throw new Error('Invalid environment variables');
}

export const ENV_VARIABLES = parsedEnv.data;
