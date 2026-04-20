import type { Theme } from '@/app/providers/theme';
import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';

export const THEME_OPTIONS: { mode: Theme; icon: LucideIcon }[] = [
	{ mode: 'light', icon: Sun },
	{ mode: 'dark', icon: Moon },
	{ mode: 'system', icon: Monitor },
];
