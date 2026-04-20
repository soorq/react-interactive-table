import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';
import * as React from 'react';

describe('Input Component', () => {
    it('should render correctly with placeholder', () => {
        render(<Input placeholder='Search users...' />);
        const input = screen.getByPlaceholderText('Search users...');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('data-slot', 'input');
    });

    it('should update value on change', () => {
        render(<Input placeholder='Type here' />);
        const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'John Doe' } });
        expect(input.value).toBe('John Doe');
    });

    it('should support different input types', () => {
        render(<Input type='password' placeholder='Password' />);
        const input = screen.getByPlaceholderText('Password');
        expect(input).toHaveAttribute('type', 'password');
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Input disabled placeholder='Disabled input' />);
        const input = screen.getByPlaceholderText('Disabled input');

        expect(input).toBeDisabled();
        expect(input).toHaveClass('disabled:cursor-not-allowed');
    });

    it('should show error styles when aria-invalid is true', () => {
        render(<Input aria-invalid='true' />);
        const input = screen.getByRole('textbox');

        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveClass('aria-invalid:border-destructive');
    });

    it('should forward ref to the native input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current?.tagName).toBe('INPUT');
    });

    it('should merge custom className with default styles', () => {
        render(<Input className='custom-search-style' />);
        const input = screen.getByRole('textbox');

        expect(input).toHaveClass('custom-search-style');
        expect(input).toHaveClass('h-8');
    });
});
