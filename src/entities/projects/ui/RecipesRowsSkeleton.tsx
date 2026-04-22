import * as React from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TableCell, TableRow } from '@/shared/ui/Table';

export const RecipesSkeleton = ({ limit = 10 }: { limit: number }) => (
    <React.Fragment>
        {[...Array(limit)].map((_, i) => (
            <TableRow key={i}>
                <TableCell>
                    <Skeleton className='size-10 rounded-lg' />
                </TableCell>
                <TableCell>
                    <Skeleton className='h-4 w-48 rounded' />
                </TableCell>
                <TableCell>
                    <Skeleton className='h-4 w-24 rounded' />
                </TableCell>
                <TableCell>
                    <Skeleton className='h-6 w-16 rounded-md' />
                </TableCell>
                <TableCell>
                    <div className='flex items-center gap-2'>
                        <Skeleton className='size-4 rounded-full' />
                        <Skeleton className='h-4 w-8 rounded' />
                    </div>
                </TableCell>
                <TableCell className='text-right'>
                    <Skeleton className='h-4 w-16 ml-auto rounded' />
                </TableCell>
            </TableRow>
        ))}
    </React.Fragment>
);
