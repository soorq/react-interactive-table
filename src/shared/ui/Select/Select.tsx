import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type SelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
    size?: 'sm' | 'default';
};

function Select({ className, size = 'default', ...props }: SelectProps) {
    return (
        <div
            className={cn(
                'group/select relative w-fit has-[select:disabled]:opacity-50',
                'has-[select:focus-visible]:ring-ring/50',
                className,
            )}
            data-slot='select-wrapper'
            data-size={size}>
            <select
                data-slot='select'
                data-size={size}
                className={cn(
                    'h-8 w-full min-w-0 appearance-none rounded-lg border border-input bg-transparent py-1 pr-8 pl-2.5 text-sm transition-all outline-none select-none',
                    'placeholder:text-muted-foreground',
                    'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                    'disabled:pointer-events-none disabled:cursor-not-allowed',
                    'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
                    size === 'sm' && 'h-7 py-0.5 text-xs',
                    'dark:bg-input/30 dark:hover:bg-input/50',
                )}
                {...props}
            />
            <ChevronDownIcon
                className={cn(
                    'pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground transition-transform duration-200',
                    'group-focus-within/select:text-foreground',
                    'select-none'
                )}
                aria-hidden='true'
                data-slot='select-icon'
            />
        </div>
    );
}

function SelectOption({ className, ...props }: React.ComponentProps<'option'>) {
    return (
        <option
            data-slot='select-option'
            className={cn('bg-[Canvas] text-[CanvasText]', className)}
            {...props}
        />
    );
}

function SelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
    return (
        <optgroup
            data-slot='select-optgroup'
            className={cn('bg-[Canvas] text-[CanvasText]', className)}
            {...props}
        />
    );
}

export { Select, SelectOptGroup, SelectOption };
