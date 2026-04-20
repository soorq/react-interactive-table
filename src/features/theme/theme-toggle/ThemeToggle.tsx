import { useTheme } from '@/app/providers/theme';
import { Button } from '@/shared/ui/Button';
import { Sun, Moon, Monitor, type LucideIcon } from 'lucide-react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const options: { mode: typeof theme; icon: LucideIcon }[] = [
        { mode: 'light', icon: Sun },
        { mode: 'dark', icon: Moon },
        { mode: 'system', icon: Monitor },
    ];

    return (
        <div className='flex items-center gap-1 p-0.5 border rounded-md bg-muted/30'>
            {options.map(({ mode, icon: Icon }) => (
                <Button
                    key={mode}
                    variant={theme === mode ? 'outline' : 'ghost'}
                    size='icon'
                    className='rounded-md'
                    onClick={() => setTheme(mode)}
                    aria-label={`Switch to ${mode} theme`}
                    aria-description={`${mode} theme`}>
                    <Icon
                        className={`size-4 transform will-change-transform transition-transform duration-500 cubic-bezier-[0.34,1.56,0.64,1] antialiased backface-visibility-hidden [transform-translate-z(0)] ${theme === mode ? 'rotate-360 scale-105' : 'rotate-0 scale-100'}`}
                    />
                </Button>
            ))}
        </div>
    );
}