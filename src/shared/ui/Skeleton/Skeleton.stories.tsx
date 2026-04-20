import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Skeleton } from './Skeleton';

const meta = {
    title: 'Core/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'h-4 w-[250px]',
    },
};

export const Circle: Story = {
    args: {
        className: 'size-12 rounded-full',
    },
};

export const CardPreview: Story = {
    render: () => (
        <div className='flex items-center space-x-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
            </div>
        </div>
    ),
};

export const TextBlock: Story = {
    render: () => (
        <div className='grid gap-2 w-[400px]'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-[75%]' />
        </div>
    ),
};
