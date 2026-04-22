import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { SortDescIcon, SortAscIcon } from 'lucide-react';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
    return (
        <div
            data-slot='table-container'
            className='relative w-full overflow-x-auto border rounded-lg'>
            <table
                data-slot='table'
                className={cn('w-full caption-bottom text-sm', className)}
                {...props}
            />
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return (
        <thead data-slot='table-header' className={cn('[&_tr]:border-b', className)} {...props} />
    );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot='table-body'
            className={cn('[&_tr:last-child]:border-0', className)}
            {...props}
        />
    );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot='table-footer'
            className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
            {...props}
        />
    );
}

function TableRow({
    className,
    isFocusable,
    ...props
}: React.ComponentProps<'tr'> & { isFocusable?: boolean }) {
    return (
        <tr
            role='row'
            data-slot='table-row'
            tabIndex={isFocusable ? -1 : undefined}
            className={cn(
                'border-b transition-colors outline-none',
                'focus-visible:bg-muted/20 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring',
                'data-[state=selected]:bg-muted',
                className,
            )}
            {...props}
        />
    );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot='table-head'
            className={cn(
                'h-10 px-0 text-left align-middle font-medium whitespace-nowrap text-muted-foreground transition-colors',
                '[&:has(button)]:p-0',
                className,
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot='table-cell'
            className={cn(
                'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0',
                className,
            )}
            {...props}
        />
    );
}

interface SortButtonProps extends React.ComponentProps<'button'> {
    isActive?: boolean;
    direction?: 'asc' | 'desc';
}

function TableButton({ children, isActive, direction, className, ...props }: SortButtonProps) {
    const sortDescription = isActive
        ? direction === 'asc'
            ? 'Сортирован по убыванию'
            : 'Сортирован по возрастанию'
        : 'Нажми для сортировки';

    return (
        <button
            type='button'
            className={cn(
                'flex h-full w-full items-center justify-start gap-2 px-2.5 py-2 text-left transition-all',
                'hover:bg-muted/50 focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive && 'text-foreground font-bold',
                className,
            )}
            aria-label={`${children}, ${sortDescription}`}
            {...props}>
            {children}
            <span className='flex items-center justify-center w-4 h-4'>
                {!isActive && <div className='opacity-0 group-hover:opacity-50 text-[10px]'>↕</div>}
                {isActive && (direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />)}
            </span>
        </button>
    );
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
    return (
        <caption
            data-slot='table-caption'
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableButton,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
