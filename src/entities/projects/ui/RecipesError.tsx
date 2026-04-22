import { Button } from '@/shared/ui/Button';
import { AlertCircle } from 'lucide-react';
import { useId } from 'react';

interface RecipesErrorProps {
    message: string;
    onRetry: () => void;
    isRetrying?: boolean;
}

export function RecipesError({ message, onRetry, isRetrying }: RecipesErrorProps) {
    const titleId = useId();
    const descriptionId = useId();

    return (
        <div
            role='alert'
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className='flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-destructive/20 rounded-lg bg-destructive/5 animate-in fade-in zoom-in duration-300'>
            <div
                inert
                aria-hidden='true'
                className='flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4'>
                <AlertCircle className='w-6 h-6 text-destructive' />
            </div>

            <h3 id={titleId} className='text-lg font-semibold text-foreground mb-1'>
                Что-то пошло не так
            </h3>

            <p
                id={descriptionId}
                className='text-sm text-muted-foreground text-center max-w-xs mb-6'>
                {message || 'Не удалось загрузить список проектов. Пожалуйста, попробуйте позже.'}
            </p>

            <Button
                variant='outline'
                size='sm'
                aria-busy={isRetrying}
                onClick={onRetry}
                disabled={isRetrying}
                isLoading={isRetrying}
                className='gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors'>
                Повторить попытку
            </Button>
        </div>
    );
}
