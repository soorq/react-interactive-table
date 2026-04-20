import * as React from 'react';
import { buttonVariants } from './variants';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

export type ButtonProps<T extends React.ElementType = 'button'> = {
    as?: T;
    dataSlot?: string;
} & React.ComponentProps<T> &
    VariantProps<typeof buttonVariants>;

function Button<T extends React.ElementType = 'button'>({
    className,
    as,
    variant = 'default',
    size = 'default',
    dataSlot,
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
            {...props}
        />
    );
}

export { Button };
