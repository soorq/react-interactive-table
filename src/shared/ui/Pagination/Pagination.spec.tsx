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
                        <PaginationPrevious />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>,
        );

        const nav = screen.getByRole('navigation');

        expect(nav).toHaveAttribute('aria-label', 'Пагинация');
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should apply active styles and aria-current to the active link', () => {
        render(<PaginationLink isActive>2</PaginationLink>);

        const activeBtn = screen.getByRole('button', { name: '2' });

        expect(activeBtn).toHaveAttribute('aria-current', 'page');
        expect(activeBtn).toHaveAttribute('data-active', 'true');
        expect(activeBtn).toHaveClass('pointer-events-none');
    });

    it('should render Previous and Next buttons with Russian text and icons', () => {
        render(
            <>
                <PaginationPrevious text="Назад" />
                <PaginationNext text="Вперед" />
            </>,
        );

        const prev = screen.getByRole('button', { name: /перейти на предыдущую страницу/i });
        const next = screen.getByRole('button', { name: /перейти на следующую страницу/i });

        expect(prev).toBeInTheDocument();
        expect(next).toBeInTheDocument();
        expect(screen.getByText('Назад')).toBeInTheDocument();
        expect(screen.getByText('Вперед')).toBeInTheDocument();
    });

    it('should render ellipsis with screen-reader text in Russian', () => {
        render(<PaginationEllipsis />);

        const srText = screen.getByText('Больше страниц');
        expect(srText).toHaveClass('sr-only');

        const ellipsis = document.querySelector('[data-slot="pagination-ellipsis"]');
        expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
    });

    it('should support custom class names for all sub-components', () => {
        render(
            <Pagination className="custom-nav">
                <PaginationContent className="custom-content">
                    <PaginationItem className="custom-item">
                        <PaginationLink className="custom-link">1</PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>,
        );

        expect(screen.getByRole('navigation')).toHaveClass('custom-nav');
        expect(screen.getByRole('list')).toHaveClass('custom-content');
        expect(screen.getByRole('listitem')).toHaveClass('custom-item');
        expect(screen.getByRole('button')).toHaveClass('custom-link');
    });
});