import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogCard } from '../src/components/BlogCard';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const mockPost = {
  id: '1',
  slug: 'test-blog-post',
  title: 'Test Blog Post',
  excerpt: 'This is a test summary.',
  image: '/test-image.jpg',
  category: { title: 'Technology', slug: 'technology' },
  author: { name: 'John Doe', bio: 'Test bio', avatar: '/avatar.jpg' },
  publish_at: '2024-01-01',
  comments: 5,
  tags: [
    { name: 'testing', slug: 'testing' },
    { name: 'react', slug: 'react' }
  ],
  featured: false,
  read_time: '5',
  content: 'Full content here'
};

describe('BlogCard Component', () => {
  it('renders the blog card with correct content', async () => {
    const mockSetSearchTag = vi.fn();
    const mockSearchTag: string[] = [];

    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogCard 
            post={mockPost} 
            setSearchTag={mockSetSearchTag} 
            searchTag={mockSearchTag} 
          />
        </Suspense>
      </BrowserRouter>
    );

    expect(await screen.findByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('This is a test summary.')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('5 Comments')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /continue reading/i })).toHaveAttribute('href', '/blog/test-blog-post');
  });
});
