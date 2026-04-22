import * as React from 'react';
import type { IParams, IRecipe } from './types';
import { ProjectsService } from '../api';

interface IUseRecipesState {
	data: IRecipe[];
	total: number;
	pages: number;
	isLoading: boolean;
	error: string | null;
}

export function useRepices(params?: IParams) {
	const abortRef = React.useRef<AbortController | null>(null);
	const [state, setState] = React.useState<IUseRecipesState>({
		data: [],
		total: 0,
		pages: 0,
		isLoading: true,
		error: null,
	});

	const executer = async (signal: AbortSignal) => {
		try {
			setState(prev => ({ ...prev, isLoading: true, error: null }));

			const response = await ProjectsService.getAllProjects(
				['get-projects', { ...params }],
				signal,
			);

			if (signal.aborted) return;

			setState({
				data: response.data,
				total: response.meta.total,
				pages: response.meta.pages,
				isLoading: false,
				error: null,
			});
		} catch (err) {
			if (err instanceof Error && err.name === 'AbortError') return;

			setState(prev => ({
				...prev,
				isLoading: false,
				error: err instanceof Error ? err.message : 'Unknown error',
			}));
		}
	};

	const onFetchEvent = React.useEffectEvent((signal: AbortSignal) => executer(signal));

	const refetch = React.useCallback(() => {
		console.log('trigger');
		abortRef.current?.abort();

		const controller = new AbortController();
		abortRef.current = controller;

		executer(controller.signal);
	}, []);

	React.useEffect(() => {
		const controller = new AbortController();
		abortRef.current = controller;

		onFetchEvent(controller.signal);

		return () => {
			controller.abort();
		};
	}, [params?.limit, params?.page, params?.search, params?.sortBy, params?.sortOrder]);

	return { ...state, refetch };
}
