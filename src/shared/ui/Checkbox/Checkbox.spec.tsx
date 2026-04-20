import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import * as React from 'react';

describe('Checkbox Component', () => {
    it('should render with a label and be linked correctly', () => {
        render(<Checkbox label='Accept Terms' />);

        const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
        expect(checkbox).toBeInTheDocument();

        const label = screen.getByText('Accept Terms');
        expect(checkbox.id).toBe(label.getAttribute('for'));
    });

    it('should change state when clicked', () => {
        render(<Checkbox label='Click me' />);
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

        expect(checkbox.checked).toBe(false);

        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);

        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false);
    });

    it('should call onChange handler when toggled', () => {
        const handleChange = vi.fn();
        render(<Checkbox onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should be disabled and not clickable when disabled prop is true', () => {
        render(<Checkbox label='Disabled Checkbox' disabled />);

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

        expect(checkbox).toBeDisabled();
        expect(checkbox).toHaveProperty('disabled', true);

        fireEvent.click(checkbox);
    });

    it('should forward ref to the native input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Checkbox ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current?.type).toBe('checkbox');
    });

    it('should support aria-invalid for error states', () => {
        render(<Checkbox aria-invalid='true' className='border-destructive' />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toHaveAttribute('aria-invalid', 'true');
        expect(checkbox).toHaveClass('aria-invalid:border-destructive');
    });
});
