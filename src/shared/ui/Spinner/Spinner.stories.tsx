import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Spinner } from './Spinner';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta = {
    title: 'Core/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Дополнительные Tailwind классы для стилизации',
        },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner className="size-4" />
            <Spinner className="size-8" />
            <Spinner className="size-12" />
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Spinner className="text-blue-500" />
            <Spinner className="text-red-500" />
            <Spinner className="text-green-500" />
            <Spinner className="text-yellow-500" />
        </div>
    ),
};

export const InsideButton: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Button disabled>
                <Spinner />
                Загрузка данных
            </Button>
            <Button disabled variant="outline">
                <Spinner className='text-primary' />
                Обновление
            </Button>
        </div>
    ),
};

export const InsideBadge: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Badge >
                <Spinner />
                Синхронизация
            </Badge>
            <Badge variant="outline">
                <Spinner className='text-primary' />
                Обновление
            </Badge>
        </div>
    ),
};

export const FullContainer: Story = {
    render: () => (
        <div className="relative h-40 w-80 border rounded-lg flex items-center justify-center bg-muted/20">
            <Spinner className="size-10 text-primary" />
            <span className="sr-only">Loading...</span>
        </div>
    ),
};