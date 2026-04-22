import * as React from 'react';
import { buttonVariants } from './variants';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { Spinner } from '../Spinner';

export type ButtonProps<T extends React.ElementType = 'button'> = {
    as?: T;
    dataSlot?: string;
    isLoading?: boolean;
} & React.ComponentProps<T> &
    VariantProps<typeof buttonVariants>;

function Button<T extends React.ElementType = 'button'>({
    className,
    as,
    variant = 'default',
    size = 'default',
    dataSlot,
    isLoading,
    children,
    ref,
    ...props
}: ButtonProps<T>) {
    const Slot = as || 'button';

    return (
        <Slot
            ref={ref}
            data-slot={dataSlot}
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}>
            {isLoading && <Spinner className='shrink-0 animate-spin' />}
            {children}
        </Slot>
    );
}

export { Button };
