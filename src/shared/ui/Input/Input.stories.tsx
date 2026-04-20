import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { SearchIcon } from 'lucide-react';

const meta = {
    title: 'Core/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'tel'],
            description: 'Тип поля ввода',
        },
        disabled: {
            control: 'boolean',
            description: 'Состояние блокировки',
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Введите текст...',
    },
};

export const Search: Story = {
    render: (args) => (
        <div className="relative w-72">
            <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input {...args} className="pl-9" placeholder="Поиск по таблице..." />
        </div>
    ),
};

export const Invalid: Story = {
    args: {
        'aria-invalid': true,
        defaultValue: 'ошибочные данные',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Введите пароль',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Поле недоступно',
    },
};

export const Number: Story = {
    args: {
        type: 'number',
        placeholder: '0',
    },
};