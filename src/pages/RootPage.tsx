import * as React from 'react';
import { Header } from '@/widgets/Layout/Header';
import { RecipesTable } from '@/entities/projects/ui';

export function RootPage() {
    return (
        <React.Fragment>
            <Header />
            <main className='max-w-5xl mx-auto px-5 py-10 space-y-5'>
                <header className='w-full h-auto'>
                    <h1 className='text-2xl text-left font-semibold tracking-tight'>Рецепты</h1>
                    <p className='text-sm mt-0 text-muted-foreground'>
                        Управляйте вашей книгой рецептов и кулинарными задачами.
                    </p>
                </header>

                <RecipesTable />
            </main>
        </React.Fragment>
    );
}
