/// <reference types="vite/client" />
import { z } from 'zod/v4';
import type { ENV_SCHEMA } from './schema';

type EnvSchemaType = z.infer<typeof ENV_SCHEMA>;

interface ImportMetaEnv extends EnvSchemaType {}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
