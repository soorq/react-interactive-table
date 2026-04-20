import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from './variants';
import { cn } from '@/shared/lib/utils';

export type BadgeProps<T extends React.ElementType = 'span'> = {
    as?: T;
    dataSlot?: string;
} & React.ComponentProps<T> &
    VariantProps<typeof badgeVariants>;

function Badge<T extends React.ElementType = 'span'>({
    className,
    as,
    variant = 'default',
    ...props
}: BadgeProps<T>) {
    const Comp = as || 'span';

    return (
        <Comp
            data-slot='badge'
            data-variant={variant}
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Badge };
