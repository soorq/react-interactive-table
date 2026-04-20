import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from './Provider';
import { ThemeToggle } from '../../../features/theme/theme-toggle';

describe('ThemeProvider', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = '';

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    it('should initialize with default system theme and apply light class if system is light', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        expect(document.documentElement.classList.contains('light')).toBe(true);
    });

    it('should change theme to dark when dark button is clicked', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        const darkButton = screen.getByLabelText(/switch to dark theme/i);

        fireEvent.click(darkButton);

        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('app-theme')).toBe('dark');
    });

    it('should recover theme from localStorage on mount', () => {
        localStorage.setItem('app-theme', 'dark');

        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should update document class when system theme changes and mode is "system"', () => {
        let changeHandler: any;

        window.matchMedia = vi.fn().mockImplementation((_q) => ({
            matches: false,
            addEventListener: vi.fn((event, handler) => {
                if (event === 'change') changeHandler = handler;
            }),
            removeEventListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: true,
        }));

        act(() => {
            if (changeHandler) changeHandler();
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should reflect active theme in button styles', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        const lightButton = screen.getByLabelText(/switch to light theme/i);
        const darkButton = screen.getByLabelText(/switch to dark theme/i);

        fireEvent.click(darkButton);

        expect(darkButton).toHaveAttribute('data-variant', 'outline');
        expect(lightButton).toHaveAttribute('data-variant', 'ghost');
    });
});