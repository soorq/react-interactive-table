import { z } from 'zod/v4';
import type { COLUMNS } from './columns';
import { RecipeResponseSchema, RecipeSchema } from './schema';

export type TSortBy = Extract<keyof typeof COLUMNS, string>;

export type IRecipe = z.infer<typeof RecipeSchema>;
export type IRecipeResponse = z.infer<typeof RecipeResponseSchema>;

export interface IPaginationMeta {
	page: number;
	limit: number;
	total: number;
	pages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export interface IProjectResponse {
	data: IRecipe[];
	meta: IPaginationMeta;
}

export interface IParams {
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: TSortBy | null;
	sortOrder?: 'asc' | 'desc';
}
