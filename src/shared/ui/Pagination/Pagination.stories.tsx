import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './Pagination';

const meta = {
	title: 'Core/Pagination',
	component: Pagination,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => (
		<Pagination {...args}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink >1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink >3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
};

export const Complex: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink >1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink >10</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink isActive>
						11
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink >12</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink >20</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
};

export const MobileFriendly: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
	},
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink >2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
};
