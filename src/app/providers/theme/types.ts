export type Theme = 'light' | 'dark' | 'system';

export type TThemeContext = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};
