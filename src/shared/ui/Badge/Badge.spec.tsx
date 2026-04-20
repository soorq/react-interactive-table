import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('should render correctly with text content', () => {
    render(<Badge>Status Active</Badge>);
    const badge = screen.getByText('Status Active');

    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('SPAN');
  });

  it('should render as a div when "as" prop is provided', () => {
    render(<Badge as='div'>Div Badge</Badge>);
    const badge = screen.getByText('Div Badge');

    expect(badge.tagName).toBe('DIV');
  });

  it('should apply correct variant classes', () => {
    const { rerender } = render(<Badge variant='destructive'>Error</Badge>);
    let badge = screen.getByText('Error');

    expect(badge).toHaveAttribute('data-variant', 'destructive');
    expect(badge.className).toContain('border-transparent');

    rerender(<Badge variant='outline'>Outline</Badge>);
    badge = screen.getByText('Outline');
    expect(badge).toHaveAttribute('data-variant', 'outline');
    expect(badge.className).toContain('border-border');
  });

  it('should merge custom className with base classes', () => {
    render(<Badge className='custom-class'>Custom</Badge>);
    const badge = screen.getByText('Custom');

    expect(badge.className).toContain('custom-class');
    expect(badge.className).toContain('rounded');
  });

  it('should pass standard HTML attributes', () => {
    render(
      <Badge title='Status title' id='badge-1'>
        Tooltip
      </Badge>,
    );
    const badge = screen.getByText('Tooltip');

    expect(badge).toHaveAttribute('title', 'Status title');
    expect(badge).toHaveAttribute('id', 'badge-1');
  });
});
