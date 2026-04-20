import * as React from 'react';
import type { Theme, TThemeContext } from './types';

export const ThemeContext = React.createContext<TThemeContext | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<Theme>(
        () =>
            (typeof window !== 'undefined'
                ? (localStorage.getItem('app-theme') as Theme)
                : 'system') || 'system',
    );

    const syncTheme = React.useEffectEvent(() => {
        const root = window.document.documentElement;
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const resolvedTheme = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;

        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);

        localStorage.setItem('app-theme', theme);
    });

    React.useEffect(() => {
        syncTheme();

        if (theme === 'system') {
            const media = window.matchMedia('(prefers-color-scheme: dark)');
            media.addEventListener('change', syncTheme);
            return () => media.removeEventListener('change', syncTheme);
        }
    }, [theme]);

    return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}