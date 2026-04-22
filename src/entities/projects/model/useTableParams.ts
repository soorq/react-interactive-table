import * as React from 'react';
import type { TSortBy } from '../model/types';

export function useTableParams() {
	const [page, setPage] = React.useState(1);
	const [sortBy, setSortBy] = React.useState<TSortBy | null>(null);
	const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
	const [limit, setLimit] = React.useState(10);

	React.useEffect(() => {
		setPage(1);
	}, [sortBy, limit]);

	const onHandleSort = React.useCallback(
		(key: TSortBy) => {
			if (sortBy === key) {
				setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
			} else {
				setSortBy(key);
				setOrder('asc');
			}
		},
		[sortBy],
	);

	const onLimitChange = React.useCallback((l: string) => {
		const currentLimit = parseInt(l);
		if (currentLimit > 0 && currentLimit <= 100) {
			setLimit(currentLimit);
		}
	}, []);

	const onPageChange = React.useCallback((p: number) => {
		setPage(p);
	}, []);

	return {
		page,
		sortBy,
		order,
		limit,
		setPage,
		onHandleSort,
		onLimitChange,
		onPageChange,
	};
}
