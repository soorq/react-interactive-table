import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
    it('should have correct accessibility roles and labels', () => {
        render(<Spinner />);

        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    it('should have animation class', () => {
        render(<Spinner />);
        const spinner = screen.getByRole('status');

        expect(spinner).toHaveClass('animate-spin');
    });

    it('should merge custom className for sizing', () => {
        render(<Spinner className='size-8 text-blue-500' />);
        const spinner = screen.getByRole('status');

        expect(spinner).toHaveClass('size-8');
        expect(spinner).toHaveClass('text-blue-500');
        expect(spinner).toHaveClass('animate-spin');
    });

    it('should pass through standard SVG props', () => {
        render(<Spinner id='main-spinner' strokeWidth={3} />);
        const spinner = screen.getByRole('status');

        expect(spinner).toHaveAttribute('id', 'main-spinner');
        expect(spinner).toHaveAttribute('stroke-width', '3');
    });
});
