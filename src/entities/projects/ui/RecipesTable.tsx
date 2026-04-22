import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/Table';
import { COLUMNS } from '../model';
import { useRepices } from '../model/useRecipes';
import { TableButton } from '@/shared/ui/Table/Table';
import { RecipesPagination } from './RecipesPagination';
import { useDebounceValue } from '@/shared/hooks/use-debounce-value';
import { useTableParams } from '../model/useTableParams';
import * as React from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import { RecipesSkeleton } from './RecipesRowsSkeleton';

const RecipesSearch = React.lazy(() =>
    import('./RecipesSearch').then(m => ({ default: m.RecipesSearch })),
);
const RecipesSelectLimit = React.lazy(() =>
    import('./RecipesSelectLimit').then(m => ({ default: m.RecipesSelectLimit })),
);
const TableContent = React.lazy(() =>
    import('./RecipesContent').then(m => ({ default: m.TableContent })),
);

export function RecipesTable() {
    const { limit, onHandleSort, onLimitChange, onPageChange, order, page, sortBy } =
        useTableParams();
    const [search, setSearch] = useDebounceValue('', 500);

    const { data, isLoading, pages, error, refetch } = useRepices({
        sortBy,
        sortOrder: order,
        page,
        search,
        limit,
    });

    return (
        <section aria-labelledby='projects-title' className='w-full h-auto space-y-2.5'>
            <h2 className='sr-only'>Список проектов</h2>

            <React.Suspense fallback={<Skeleton className='h-8 max-w-sm' />}>
                <RecipesSearch onChange={setSearch} value={search} />
            </React.Suspense>

            <Table>
                <TableHeader className='bg-muted/30'>
                    <TableRow>
                        {Object.entries(COLUMNS).map(([key, config]) => {
                            const isCurrentSort = sortBy === key;
                            const ariaSort = isCurrentSort
                                ? order === 'asc'
                                    ? 'ascending'
                                    : 'descending'
                                : 'none';

                            return (
                                <TableHead key={key} aria-sort={ariaSort}>
                                    {config.isSortable ? (
                                        <TableButton
                                            isActive={isCurrentSort}
                                            direction={order}
                                            onClick={() => onHandleSort(key)}>
                                            {config.label}
                                        </TableButton>
                                    ) : (
                                        <span className='px-2.5 py-2 block text-sm font-medium'>
                                            {config.label}
                                        </span>
                                    )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <React.Suspense fallback={<RecipesSkeleton limit={10} />}>
                        <TableContent
                            data={data}
                            error={error}
                            isLoading={isLoading}
                            limit={limit}
                            refetch={refetch}
                        />
                    </React.Suspense>
                </TableBody>
                <TableCaption className='py-3 border-t border-border'>
                    Страница {page} из {pages || 1}
                </TableCaption>
            </Table>

            {!error && data.length > 0 && (
                <div className='flex flex-col items-center gap-y-2.5 md:gap-0 justify-between md:flex-row'>
                    <React.Suspense fallback={<Skeleton className='w-full h-8 md:w-1/3' />}>
                        <RecipesSelectLimit value={limit.toString()} onChange={onLimitChange} />
                    </React.Suspense>
                    <RecipesPagination
                        page={page}
                        isLoading={isLoading}
                        total={pages}
                        onChange={onPageChange}
                    />
                </div>
            )}
        </section>
    );
}
