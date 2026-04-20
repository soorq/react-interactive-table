import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { CpuIcon } from 'lucide-react';
import { Spinner } from '../Spinner';

const meta = {
	title: 'Core/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			description: 'Визуальный стиль кнопки',
			control: 'select',
			options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
			table: {
				defaultValue: { summary: 'default' },
			},
		},
		size: {
			description: 'Размер кнопки и её внутренние отступы',
			control: 'select',
			options: ['default', 'sm', 'lg', 'xs', 'icon', 'icon-sm', 'icon-lg', 'icon-xs'],
			table: {
				defaultValue: { summary: 'default' },
			},
		},
		as: {
			description: 'Позволяет изменить HTML-тег (например, на "a" или "span")',
			control: false,
		},
		children: {
			description: 'Содержимое кнопки',
			control: 'text',
		},
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Button',
	},
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		size: 'default',
		children: 'Ghost',
	},
};

export const Link: Story = {
	args: {
		variant: 'link',
		size: 'default',
		children: 'Link',
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		size: 'default',
		children: 'Destructive',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		size: 'default',
		children: 'Outline',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		size: 'default',
		children: 'Secondary',
	},
};

export const Large: Story = {
	args: {
		variant: 'default',
		size: 'lg',
		children: 'Large',
	},
};

export const Small: Story = {
	args: {
		variant: 'default',
		size: 'sm',
		children: 'Small',
	},
};

export const ExtraSmall: Story = {
	args: {
		variant: 'default',
		size: 'xs',
		children: 'ExtraSmall',
	},
};

export const Icon: Story = {
	args: {
		variant: 'default',
		size: 'icon',
		children: <CpuIcon />,
	},
};

export const LargeIcon: Story = {
	args: {
		variant: 'default',
		size: 'icon-lg',
		children: <CpuIcon />,
	},
};

export const SmallIcon: Story = {
	args: {
		variant: 'default',
		size: 'icon-sm',
		children: <CpuIcon />,
	},
};

export const ExtraSmallIcon: Story = {
	args: {
		variant: 'default',
		size: 'icon-xs',
		children: <CpuIcon />,
	},
};

export const Loading: Story = {
	render: () => (
		<Button disabled>
			<Spinner />
			Загрузка данных
		</Button>
	),
};
