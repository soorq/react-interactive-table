import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from './Table';

describe('Table Component Group', () => {
    it('should render a full table structure correctly', () => {
        render(
            <Table>
                <TableCaption>Users List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>John Doe</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total: 1</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>,
        );

        expect(screen.getByRole('table')).toBeInTheDocument();

        const rowGroups = screen.getAllByRole('rowgroup');
        expect(rowGroups).toHaveLength(3);

        expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /john doe/i })).toBeInTheDocument();
        expect(screen.getByText('Users List')).toBeInTheDocument();
        expect(screen.getByText('Total: 1')).toBeInTheDocument();
    });

    it('should have a responsive wrapper with overflow-x-auto', () => {
        const { container } = render(<Table />);
        const wrapper = container.querySelector('[data-slot="table-container"]');

        expect(wrapper).toHaveClass('overflow-x-auto');
        expect(wrapper).toHaveClass('relative');
        expect(wrapper).toHaveClass('w-full');
    });

    it('should apply correct classes for TableRow states', () => {
        render(
            <Table>
                <TableBody>
                    <TableRow data-state='selected' className='custom-row'>
                        <TableCell>Selected Row</TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        );

        const row = screen.getByRole('row');

        expect(row).toHaveClass('border-b');
        expect(row).toHaveClass('transition-colors');
        expect(row).toHaveClass('custom-row');
        expect(row).toHaveClass('data-[state=selected]:bg-muted');
    });

    it('should have correct alignment and padding classes', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>,
        );

        const head = screen.getByRole('columnheader');
        expect(head).toHaveClass('text-right');
        expect(head).toHaveClass('align-middle');
        expect(head).toHaveClass('font-medium');
    });

    it('should pass down HTML attributes like colSpan', () => {
        render(
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2} id='wide-cell'>
                            Merged
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        );

        const cell = screen.getByRole('cell');
        expect(cell).toHaveAttribute('colspan', '2');
        expect(cell).toHaveAttribute('id', 'wide-cell');
    });

    it('should adjust padding if checkbox is present', () => {
        render(
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <input type='checkbox' role='checkbox' />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        );

        const cell = screen.getByRole('cell');

        expect(cell).toHaveClass('[&:has([role=checkbox])]:pr-0');
    });
});
