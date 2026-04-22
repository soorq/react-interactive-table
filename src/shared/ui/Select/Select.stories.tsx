import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectOption, SelectOptGroup } from './Select';

const meta: Meta<typeof Select> = {
    title: 'Core/Select',
    component: Select,
    argTypes: {
        size: {
            control: 'select',
            options: ['default', 'sm'],
        },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    render: (args) => (
        <Select {...args}>
            <SelectOption value="1">Option 1</SelectOption>
            <SelectOption value="2">Option 2</SelectOption>
            <SelectOption value="3">Option 3</SelectOption>
        </Select>
    ),
};

export const Small: Story = {
    args: {
        size: 'sm',
    },
    render: (args) => (
        <Select {...args}>
            <SelectOption value="sm1">Small Option</SelectOption>
        </Select>
    ),
};

export const WithGroups: Story = {
    render: (args) => (
        <Select {...args}>
            <SelectOptGroup label="Fruits">
                <SelectOption value="apple">Apple</SelectOption>
                <SelectOption value="banana">Banana</SelectOption>
            </SelectOptGroup>
            <SelectOptGroup label="Vegetables">
                <SelectOption value="carrot">Carrot</SelectOption>
                <SelectOption value="potato">Potato</SelectOption>
            </SelectOptGroup>
        </Select>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => (
        <Select {...args}>
            <SelectOption value="1">Disabled Select</SelectOption>
        </Select>
    ),
};

export const Invalid: Story = {
    args: {
        'aria-invalid': true,
    },
    render: (args) => (
        <Select {...args}>
            <SelectOption value="1">Invalid State</SelectOption>
        </Select>
    ),
};