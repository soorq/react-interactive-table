import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from './Pagination';

describe('Pagination Component Group', () => {
    it('should render navigation with correct aria-label', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href='#' />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href='#' isActive>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href='#' />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>,
        );

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveAttribute('aria-label', 'pagination');
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should apply active styles and aria-current to the active link', () => {
        render(
            <PaginationLink href='#' isActive>
                2
            </PaginationLink>,
        );

        const activeLink = screen.getByRole('link', { name: '2' });

        expect(activeLink).toHaveAttribute('aria-current', 'page');
        expect(activeLink).toHaveAttribute('data-active', 'true');
        expect(activeLink.className).toContain('border');
    });

    it('should render Previous and Next buttons with text and icons', () => {
        render(
            <>
                <PaginationPrevious href='/prev' text='Back' />
                <PaginationNext href='/next' text='Forward' />
            </>,
        );
        const prev = screen.getByRole('link', { name: /go to previous page/i });
        const next = screen.getByRole('link', { name: /go to next page/i });

        expect(prev).toHaveAttribute('href', '/prev');
        expect(next).toHaveAttribute('href', '/next');
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Forward')).toBeInTheDocument();
    });

    it('should render ellipsis with screen-reader text', () => {
        render(<PaginationEllipsis />);

        const srText = screen.getByText('More pages');
        expect(srText).toHaveClass('sr-only');
    });

    it('should support custom class names for all sub-components', () => {
        render(
            <Pagination className='custom-nav'>
                <PaginationContent className='custom-content'>
                    <PaginationItem className='custom-item'>
                        <PaginationLink href='#' className='custom-link'>
                            1
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>,
        );

        expect(screen.getByRole('navigation')).toHaveClass('custom-nav');
        expect(screen.getByRole('list')).toHaveClass('custom-content');
        expect(screen.getByRole('listitem')).toHaveClass('custom-item');
        expect(screen.getByRole('link')).toHaveClass('custom-link');
    });
});
