import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from './Table';

const meta = {
    title: 'Core/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Table {...args} className='min-w-150'>
            <TableCaption>Список ваших последних счетов.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-25'>Инвойс</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Метод оплаты</TableHead>
                    <TableHead className='text-right'>Сумма</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className='font-medium'>INV001</TableCell>
                    <TableCell>Оплачено</TableCell>
                    <TableCell>Кредитная карта</TableCell>
                    <TableCell className='text-right'>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className='font-medium'>INV002</TableCell>
                    <TableCell>В ожидании</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className='text-right'>$150.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className='font-medium'>INV003</TableCell>
                    <TableCell>Не оплачено</TableCell>
                    <TableCell>Банковский перевод</TableCell>
                    <TableCell className='text-right'>$350.00</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Итого</TableCell>
                    <TableCell className='text-right'>$750.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    ),
};

export const Empty: Story = {
    render: args => (
        <Table {...args} className='min-w-150'>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-25'>Инвойс</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Метод оплаты</TableHead>
                    <TableHead className='text-right'>Сумма</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={4} className='h-24 text-center'>
                        Нет данных для отображения.
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    ),
};
