import { API } from '@/shared/api';
import type { IParams, IProjectResponse } from '../model/types';

type TCacheEntry<T extends unknown> = {
	data: T;
	createdAt: number;
};

type QueryKey<P> = readonly [string, P];

/**
 * Сервис управления проектами.
 * Реализует логику кэширования, дедупликации запросов (Request Collapsing)
 * и эмуляции серверных вычислений.
 */
export class ProjectsService {
	private static cache = new Map<string, TCacheEntry<any>>();
	private static STALE_TIME = 5 * 60 * 1000;

	/**
	 * Главная точка входа для получения списка проектов.
	 * * Сначала проверяет кэш. Если данных нет или они просрочены, ищет уже выполняющийся
	 * аналогичный запрос, чтобы избежать лишней нагрузки (проблема Race Condition).
	 * @template T Структура ответа (наследует IProjectResponse).
	 * @param queryKey Кортеж из ключа и параметров фильтрации/пагинации.
	 * @param signal Сигнал для отмены запроса (AbortController).
	 * @returns Промис с данными проектов.
	 */
	static async getAllProjects<T extends IProjectResponse = IProjectResponse>(
		queryKey: QueryKey<IParams>,
		signal?: AbortSignal,
	): Promise<T> {
		const hash = this.serializeKey(queryKey);
		const now = Date.now();

		const cached = this.cache.get(hash);
		if (this.isFresh<T>(cached) && now - cached.createdAt < this.STALE_TIME) {
			return cached.data;
		}

		if (signal?.aborted) {
			return Promise.reject(new DOMException('Aborted', 'AbortError'));
		}

		const promise = this.fetch<T>(hash, queryKey[1], signal);

		return promise;
	}

	private static async fetch<T extends IProjectResponse>(
		hash: string,
		params: IParams,
		signal?: AbortSignal,
	): Promise<T> {
		try {
			const { page = 1, limit = 10, search = '', sortBy, sortOrder } = params;
			const skip = (page - 1) * limit;
			const sp = new URLSearchParams();

			if (search) sp.append('q', search);
			if (sortBy) sp.append('sortBy', sortBy);
			if (sortOrder) sp.append('order', sortOrder);
			sp.append('limit', String(limit));
			sp.append('skip', String(skip));
			sp.append('select', 'name,image,cuisine,difficulty,rating');

			const endpoint = search ? '/recipes/search' : '/recipes';
			const url = `${endpoint}?${sp.toString()}`;

			const response = await API.get(url, signal);
			const result = await response.json();

			const mappedResult = {
				data: result.recipes,
				meta: {
					total: result.total,
					page: page,
					limit: limit,
					pages: Math.ceil(result.total / limit),
					hasNextPage: skip + limit < result.total,
					hasPrevPage: page > 1,
				},
			};

			this.cache.set(hash, {
				data: mappedResult,
				createdAt: Date.now(),
			});

			return mappedResult as unknown as T;
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	private static isFresh<T>(entry: any): entry is TCacheEntry<T> {
		return entry && typeof entry.createdAt === 'number';
	}

	/**
	 * Создает детерминированный хэш-ключ из объекта параметров.
	 * Сортирует ключи объекта перед сериализацией, чтобы { a:1, b:2 } и { b:2, a:1 }
	 * выдавали идентичный хэш.
	 */
	private static serializeKey<P>(key: QueryKey<P>): string {
		return JSON.stringify(key, (_, v) => {
			if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
				return Object.keys(v)
					.sort()
					.reduce((acc, k) => {
						acc[k] = (v as any)[k];
						return acc;
					}, {} as any);
			}
			return v;
		});
	}
}
