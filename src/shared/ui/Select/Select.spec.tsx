import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select, SelectOption } from './Select';

describe('Select Component', () => {
    it('renders correctly with options', () => {
        render(
            <Select data-testid="select-wrapper">
                <SelectOption value="v1">Value 1</SelectOption>
                <SelectOption value="v2">Value 2</SelectOption>
            </Select>
        );

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(screen.getByText('Value 1')).toBeInTheDocument();
        expect(screen.getByText('Value 2')).toBeInTheDocument();
    });

    it('changes value on selection', () => {
        const onChange = vi.fn();
        render(
            <Select onChange={onChange}>
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
            </Select>
        );

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '2' } });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect((select as HTMLSelectElement).value).toBe('2');
    });

    it('applies small size class when size="sm"', () => {
        render(
            <Select size="sm">
                <SelectOption value="1">One</SelectOption>
            </Select>
        );

        const select = screen.getByRole('combobox');

        expect(select).toHaveAttribute('data-size', 'sm');
    });

    it('is disabled when the disabled prop is passed', () => {
        render(
            <Select disabled>
                <SelectOption value="1">One</SelectOption>
            </Select>
        );

        const select = screen.getByRole('combobox');
        expect(select).toBeDisabled();
    });

    it('shows error styles when aria-invalid is true', () => {
        render(
            <Select aria-invalid="true">
                <SelectOption value="1">One</SelectOption>
            </Select>
        );

        const select = screen.getByRole('combobox');

        expect(select).toHaveAttribute('aria-invalid', 'true');
        expect(select).toHaveClass('aria-invalid:border-destructive');
    });

    it('renders chevron icon', () => {
        const { container } = render(
            <Select>
                <SelectOption value="1">One</SelectOption>
            </Select>
        );

        const icon = container.querySelector('[data-slot="select-icon"]');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('pointer-events-none');
    });
});