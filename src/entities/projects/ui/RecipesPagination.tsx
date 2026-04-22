import * as React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shared/ui/Pagination';
import { calcPaginationRange } from '../model';

export function RecipesPagination({
    page,
    total,
    isLoading = false,
    onChange,
}: {
    page: number;
    total: number;
    isLoading?: boolean;
    onChange: (p: number) => void;
}) {
    const paginationRange = React.useMemo(() => calcPaginationRange(page, total), [page, total]);

    return (
        <Pagination className='mx-0'>
            <PaginationContent>
                {page !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onChange(page - 1)}
                            className={
                                isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>
                )}

                {paginationRange.map((p, idx) => (
                    <PaginationItem key={idx}>
                        {p === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                disabled={isLoading}
                                onClick={() => onChange(Number(p))}
                                isActive={page === p}
                                className='cursor-pointer'>
                                {p}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {page !== total && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onChange(page + 1)}
                            className={
                                isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
