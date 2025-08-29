import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TagField from '../src/components/TagField';
import style from '@styles/Blog.module.scss';

describe('TagField Component', () => {
  const mockTag = { name: 'react', slug: 'react' };

  it('renders a tag', () => {
    render(<TagField tag={mockTag} setSearchTag={() => {}} searchTag={[]} />);
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('calls setSearchTag when clicked', async () => {
    const setSearchTagMock = vi.fn();
    render(<TagField tag={mockTag} setSearchTag={setSearchTagMock} searchTag={[]} />);

    await userEvent.click(screen.getByText('react'));
    expect(setSearchTagMock).toHaveBeenCalledTimes(1);
  });

  it('has active class when tag is in searchTag', () => {
    render(<TagField tag={mockTag} setSearchTag={() => {}} searchTag={['react']} />);
    expect(screen.getByText('react')).toHaveClass(style.active);
  });
});
