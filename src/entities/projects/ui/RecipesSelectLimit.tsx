import { Select, SelectOption } from '@/shared/ui/Select';

export function RecipesSelectLimit({
    onChange,
    value,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <Select className='w-full md:w-1/3' defaultValue={value} onChange={v => onChange(v.target.value)}>
            <SelectOption disabled value=''>Выберите кол-во элеметов</SelectOption>
            <SelectOption value='10'>10</SelectOption>
            <SelectOption value='25'>25</SelectOption>
            <SelectOption value='50'>50</SelectOption>
        </Select>
    );
}
