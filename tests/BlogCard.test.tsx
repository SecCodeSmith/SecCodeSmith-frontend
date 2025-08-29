import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogCard } from '../src/components/BlogCard';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

describe('BlogCard Component', () => {
  const mockPost = {
    id: 1,
    slug: 'test-blog-post',
    title: 'Test Blog Post',
    author: { name: 'John Doe' },
    publish_at: '2024-01-01',
    comments: 5,
    tags: [{ name: 'testing', slug: 'testing' }, { name: 'react', slug: 'react' }],
    excerpt: 'This is a test summary.',
    image: '/path/to/thumbnail.jpg',
    category: { title: 'Test Category' },
    featured: false
  };

  it('renders the blog card with correct content', async () => {
    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogCard post={mockPost} setSearchTag={() => {}} searchTag={[]} />
        </Suspense>
      </BrowserRouter>
    );

    expect(await screen.findByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('This is a test summary.')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /continue reading/i })).toHaveAttribute('href', '/blog/test-blog-post');
  });
});
