import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { THEME_OPTIONS } from './constants';
import { ThemeContext } from '@/app/providers/theme';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
    const setThemeMock = vi.fn();

    const renderWithProvider = (currentTheme: 'light' | 'dark' | 'system' = 'system') => {
        return render(
            <ThemeContext value={{ theme: currentTheme, setTheme: setThemeMock }}>
                <ThemeToggle />
            </ThemeContext>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all theme options from constants', () => {
        renderWithProvider();

        THEME_OPTIONS.forEach(({ mode }) => {
            const button = screen.getByLabelText(new RegExp(`switch to ${mode} theme`, 'i'));
            expect(button).toBeInTheDocument();
        });
    });

    it('should call setTheme with correct mode when a button is clicked', () => {
        renderWithProvider('light');

        const darkButton = screen.getByLabelText(/switch to dark theme/i);
        fireEvent.click(darkButton);

        expect(setThemeMock).toHaveBeenCalledTimes(1);
        expect(setThemeMock).toHaveBeenCalledWith('dark');
    });

    it('should apply active styles to the currently selected theme button', () => {
        renderWithProvider('dark');

        const darkButton = screen.getByLabelText(/switch to dark theme/i);
        const lightButton = screen.getByLabelText(/switch to light theme/i);

        expect(darkButton).toHaveAttribute('data-variant', 'outline');
        expect(lightButton).toHaveAttribute('data-variant', 'ghost');
    });

    it('should apply rotation and scale classes to the active theme icon', () => {
        renderWithProvider('system');

        const systemButton = screen.getByLabelText(/switch to system theme/i);
        const icon = systemButton.querySelector('svg');

        expect(icon).toHaveClass('rotate-360');
        expect(icon).toHaveClass('scale-105');
    });

    it('should have correct accessibility attributes', () => {
        renderWithProvider('system');

        THEME_OPTIONS.forEach(({ mode }) => {
            const button = screen.getByLabelText(new RegExp(`switch to ${mode} theme`, 'i'));
            expect(button).toHaveAttribute('aria-description', `${mode} theme`);
        });
    });
});