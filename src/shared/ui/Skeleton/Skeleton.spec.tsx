import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
    it('should render correctly', () => {
        const { container } = render(<Skeleton />);
        const skeleton = container.querySelector('[data-slot="skeleton"]');

        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveClass('animate-pulse');
        expect(skeleton).toHaveClass('bg-muted');
    });

    it('should apply custom classes for sizing and shape', () => {
        render(<Skeleton className='h-12 w-12 rounded-full' data-testid='skeleton-circle' />);
        const skeleton = screen.getByTestId('skeleton-circle');

        expect(skeleton).toHaveClass('h-12');
        expect(skeleton).toHaveClass('w-12');
        expect(skeleton).toHaveClass('rounded-full');
    });

    it('should have correct aria attributes for loading state', () => {
        render(<Skeleton aria-label='Loading profile' />);
        const skeleton = screen.getByLabelText('Loading profile');

        expect(skeleton).toBeInTheDocument();
    });

    it('should pass through standard HTML attributes', () => {
        render(<Skeleton id='user-loader' title='Content is loading' />);
        const skeleton = document.getElementById('user-loader');

        expect(skeleton).toBeDefined();
        expect(skeleton).toHaveAttribute('title', 'Content is loading');
    });
});
