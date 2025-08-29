import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogPost } from '../src/pages/BlogPost';
import * as blogData from '../src/data/blogPostsData';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

const mockPost = {
  id: 1,
  slug: 'post-1',
  title: 'Post 1',
  content: '## TOC 1\n\n**bold text**',
  image: '',
  category: { title: 'Category 1', slug: 'category-1' },
  author: { name: 'Author 1' },
  publish_at: '2024-01-01',
  comments: 0,
  tags: [{name: 'Tag 1', slug: 'tag-1'}],
  featured: false,
  read_time: '5 min read'
};

const mockRelatedPosts = [
  { id: 2, slug: 'post-2', title: 'Post 2', excerpt: 'Excerpt 2', image: '', category: { title: 'Category 1' }, author: { name: 'Author 2' }, publish_at: '2024-01-02', comments: 0, tags: [], featured: false },
];

vi.mock('../src/data/blogPostsData');
vi.mock('react-router-dom', async () => {
    const original = await vi.importActual('react-router-dom');
    return {
        ...original,
        useParams: () => ({
            slug: 'post-1',
        }),
    };
});

window.scrollTo = vi.fn();

describe('BlogPost Page', () => {
  beforeEach(() => {
    vi.spyOn(blogData, 'fetchBlogPost').mockResolvedValue(mockPost);
    vi.spyOn(blogData, 'fetchRelatedPostsByCategory').mockResolvedValue(mockRelatedPosts);
  });

  it('renders the blog post with content, toc, and related posts', async () => {
    render(
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogPost />
        </Suspense>
      </BrowserRouter>
    );

    expect(await screen.findByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('bold text')).toBeInTheDocument();
    expect(screen.getAllByText('TOC 1')).toHaveLength(2);
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });
});
