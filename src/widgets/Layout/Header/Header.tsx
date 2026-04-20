import { LayoutDashboard } from 'lucide-react';

export function Header() {
    return (
        <header className='sticky top-0 z-50 w-full container mx-auto backdrop-blur-md bg-background/90'>
            <div className='flex h-auto p-3.5 border-b border-x rounded-b-lg border-border items-center justify-between'>
                <div className='flex items-center gap-2.5'>
                    <div className='flex rounded-md bg-linear-to-br from-primary to-purple-600 p-1.5 shadow-lg shadow-indigo-500/20'>
                        <LayoutDashboard size={22} className='text-white' />
                    </div>
                    <div className='flex flex-col leading-none'>
                        <span className='text-lg font-bold tracking-tight text-foreground'>
                            Gaba Test Task
                        </span>
                        <span className='text-[10px] font-medium uppercase tracking-wider text-primary'>
                            by soorq
                        </span>
                    </div>
                </div>

                <div className='flex items-center gap-2.5'>{/* <ThemeToggle /> */}</div>
            </div>
        </header>
    );
}