import { TableCell, TableRow } from '@/shared/ui/Table';
import { RecipesSkeleton } from './RecipesRowsSkeleton';
import * as React from 'react';
import type { IRecipe } from '../model/types';
import { Star } from 'lucide-react';

const RecipesError = React.lazy(() =>
    import('./RecipesError').then(m => ({ default: m.RecipesError })),
);

interface TableContentProps {
    data: IRecipe[];
    isLoading: boolean;
    error: string | null;
    limit: number;
    refetch: () => void;
}

const RecipesRow = React.memo(({ item }: { item: IRecipe }) => {
    const difficultyColor = {
        Easy: 'bg-green-100 text-green-700 border-green-200',
        Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        Hard: 'bg-red-100 text-red-700 border-red-200',
    }[item.difficulty];

    return (
        <TableRow className='hover:bg-muted/10 transition-colors'>
            <TableCell>
                <img
                    src={item.image}
                    loading='lazy'
                    alt={item.name}
                    decoding='async'
                    width={40}
                    onLoad={(e) => e.currentTarget.style.opacity = '1'}
                    height={40}
                    crossOrigin="anonymous"
                    className='size-10 rounded-lg object-cover border opacity-0 transition-opacity duration-300 border-border shadow-sm'
                />
            </TableCell>
            <TableCell className='font-semibold'>{item.name}</TableCell>
            <TableCell className='text-muted-foreground'>{item.cuisine}</TableCell>
            <TableCell>
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${difficultyColor}`}>
                    {item.difficulty.toUpperCase()}
                </span>
            </TableCell>
            <TableCell>
                <div className='flex items-center gap-1 text-muted-foreground'>
                    <Star className='w-3.5 h-3.5 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm font-medium'>{item.rating}</span>
                </div>
            </TableCell>
            <TableCell className='text-muted-foreground font-mono text-xs'>
                {item.caloriesPerServing} kcal
            </TableCell>
        </TableRow>
    );
});

export function TableContent({ isLoading, error, data, limit, refetch }: TableContentProps) {
    if (isLoading) return <RecipesSkeleton limit={limit} />;

    if (error)
        return (
            <TableRow>
                <TableCell colSpan={7}>
                    <RecipesError message={error ?? 'Непредвиденная ошибка'} onRetry={refetch} />
                </TableCell>
            </TableRow>
        );

    if (data.length === 0)
        return (
            <TableRow>
                <TableCell colSpan={6} className='h-32 text-center'>
                    Рецептов не найдено. Попробуйте изменить параметры поиска.
                </TableCell>
            </TableRow>
        );

    return (
        <React.Fragment>
            {data.map(item => (
                <RecipesRow key={item.id} item={item} />
            ))}
        </React.Fragment>
    );
}
