import { Input } from '@/shared/ui/Input';

export function RecipesSearch({
    onChange,
    value,
}: {
    onChange: (v: string) => void;
    value: string;
}) {
    return (
        <div className='flex w-full items-center justify-between h-auto'>
            <Input
                placeholder='Поиск рецепта...'
                className='max-w-sm'
                onChange={e => onChange(e.target.value)}
                defaultValue={value}
            />
        </div>
    );
}
