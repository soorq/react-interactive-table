import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import React from 'react';

const meta = {
    title: 'Core/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { description: 'Текст подписи' },
        disabled: { description: 'Блокировка элемента' },
    }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Запомнить меня',
    },
};

export const Invalid: Story = {
    args: {
        label: 'Я согласен с условиями (обязательно)',
        'aria-invalid': true,
    },
};

export const RefExample: Story = {
    render: () => {
        const checkboxRef = React.useRef<HTMLInputElement>(null);
        return (
            <div className="flex flex-col gap-2">
                <Checkbox ref={checkboxRef} label="Нажми на кнопку рядом" />
                <button
                    onClick={() => checkboxRef.current?.click()}
                    className="text-xs text-blue-500 underline text-left"
                >
                    Переключить через Ref
                </button>
            </div>
        );
    }
};