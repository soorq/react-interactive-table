import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { Button, type ButtonProps } from '../Button';
import { cn } from '@/shared/lib/utils';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
    return (
        <nav
            role='navigation'
            aria-label='Пагинация'
            data-slot='pagination'
            className={cn('mx-auto w-auto flex justify-center', className)}
            {...props}
        />
    );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
    return (
        <ul
            data-slot='pagination-content [&>li]:mt-0'
            className={cn('flex items-center gap-0.5', className)}
            {...props}
        />
    );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
    return <li data-slot='pagination-item' {...props} />;
}

type PaginationLinkProps = {
    isActive?: boolean;
} & ButtonProps<'button'>;

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
    return (
        <Button
            variant={isActive ? 'outline' : 'ghost'}
            size={size}
            aria-current={isActive ? 'page' : undefined}
            data-slot='pagination-link'
            className={cn(isActive && 'pointer-events-none', className)}
            data-active={isActive}
            {...props}
        />
    );
}

function PaginationPrevious({
    className,
    text = 'Назад',
    ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
    return (
        <PaginationLink
            aria-label='Перейти на предыдущую страницу'
            size='default'
            className={cn('pl-1.5!', className)}
            {...props}>
            <ChevronLeftIcon data-icon='inline-start' className='cn-rtl-flip' />
            <span className='hidden sm:block'>{text}</span>
        </PaginationLink>
    );
}

function PaginationNext({
    className,
    text = 'Вперед',
    ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
    return (
        <PaginationLink
            aria-label='Перейти на следующую страницу'
            size='default'
            className={cn('pr-1.5!', className)}
            {...props}>
            <span className='hidden sm:block'>{text}</span>
            <ChevronRightIcon data-icon='inline-end' className='cn-rtl-flip' />
        </PaginationLink>
    );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            aria-hidden
            inert
            data-slot='pagination-ellipsis'
            className={cn(
                "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}>
            <MoreHorizontalIcon />
            <span className='sr-only'>Больше страниц</span>{' '}
        </span>
    );
}

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
