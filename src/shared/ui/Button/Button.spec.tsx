import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import * as React from 'react';

describe('Button Component', () => {
    it('should render correctly with children', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('should render as a different element when "as" prop is provided', () => {
        render(
            <Button as='a' href='https://google.com'>
                Link Button
            </Button>,
        );
        const link = screen.getByRole('link', { name: /link button/i });
        expect(link).toBeInTheDocument();
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', 'https://google.com');
    });

    it('should call onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('disabled:opacity-50');
    });

    it('should apply variant and size classes', () => {
        const { rerender } = render(
            <Button variant='destructive' size='lg'>
                Destructive
            </Button>,
        );
        let button = screen.getByRole('button');

        expect(button.className).toContain('bg-destructive');
        expect(button).toHaveAttribute('data-variant', 'destructive');

        rerender(
            <Button variant='outline' size='sm'>
                Outline
            </Button>,
        );
        expect(button.className).toContain('border-input');
    });

    it('should forward ref to the underlying DOM element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<Button ref={ref}>Ref Button</Button>);

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current?.textContent).toBe('Ref Button');
    });
});
