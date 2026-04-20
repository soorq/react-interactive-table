import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Spinner } from '../Spinner';

const meta = {
    title: 'Core/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            description: 'Визуальный стиль бейджа',
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline'],
            table: {
                defaultValue: { summary: 'default' },
            },
        },
        as: {
            description: 'HTML-тег или компонент, который будет отрендерен',
            control: false,
        },
        children: {
            description: 'Текст или элементы внутри бейджа',
            control: 'text',
        },
    },
    args: {
        children: 'Badge',
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Alert',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className='flex items-center gap-2'>
            <Badge variant='default'>Default</Badge>
            <Badge variant='secondary'>Secondary</Badge>
            <Badge variant='destructive'>Destructive</Badge>
            <Badge variant='outline'>Outline</Badge>
        </div>
    ),
};

export const AsLink: Story = {
    args: {
        as: 'a',
        href: 'https://github.com',
        children: 'GitHub Link',
        className: 'cursor-pointer hover:opacity-80',
    },
};

export const Loading: Story = {
    render: () => (
        <Badge variant='outline'>
            <Spinner className='text-primary' />
            Обновление
        </Badge>
    ),
};

export const Counter: Story = {
    render: () => (
        <div className='flex items-center gap-4'>
            <div className='relative inline-flex'>
                <span className='text-sm font-medium'>Messages</span>
                <Badge className='ml-1.5 h-5 min-w-5 flex items-center justify-center rounded-full px-1 text-[10px]'>
                    99+
                </Badge>
            </div>
        </div>
    ),
};
