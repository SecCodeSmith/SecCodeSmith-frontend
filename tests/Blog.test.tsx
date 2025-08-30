import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Blog } from '../src/pages/Blog';
import * as blogData from '../src/data/blogPostsData';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockPosts = [
  { id: 1, slug: 'post-1', title: 'Post 1', excerpt: 'Excerpt 1', image: '', category: { title: 'Category 1' }, author: { name: 'Author 1' }, publish_at: '2024-01-01', comments: 0, tags: [], featured: false, read_time: 5, content: 'Content for Post 1' },
  { id: 2, slug: 'post-2', title: 'Post 2', excerpt: 'Excerpt 2', image: '', category: { title: 'Category 2' }, author: { name: 'Author 2' }, publish_at: '2024-01-02', comments: 0, tags: [], featured: false, read_time: 7, content: 'Content for Post 2' },
];

const mockCategories = [
  { id: 1, title: 'Category 1', slug: 'category-1', BlogCount: 1 },
  { id: 2, title: 'Category 2', slug: 'category-2', BlogCount: 1 },
];

const mockTags = [
  { id: 1, name: 'Tag 1', slug: 'tag-1' },
  { id: 2, name: 'Tag 2', slug: 'tag-2' },
];

vi.mock('../src/data/blogPostsData');

describe.skip('Blog Page', () => {
  beforeEach(() => {
    vi.spyOn(blogData, 'fetchBlogPostsPage').mockResolvedValue({ posts: mockPosts, totalPages: 1 });
    vi.spyOn(blogData, 'fetchBlogPagesCount').mockResolvedValue(1);
    vi.spyOn(blogData, 'fetchBlogCategories').mockResolvedValue(mockCategories);
    vi.spyOn(blogData, 'fetchBlogTags').mockResolvedValue(mockTags);
  });

  it('renders the blog page with posts, categories, and tags', async () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    expect(await screen.findAllByText('Post 1')).toHaveLength(2);
    expect(await screen.findAllByText('Post 2')).toHaveLength(2);
    expect(await screen.findAllByText(/Category 1/)).toHaveLength(2);
    expect(await screen.findAllByText(/Category 2/)).toHaveLength(2);
    expect(await screen.findAllByText('Tag 1')).toHaveLength(1);
    expect(await screen.findAllByText('Tag 2')).toHaveLength(1);
  });

  it('filters posts by search query', async () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    const searchInput = await screen.findByPlaceholderText('Search articles...');
    await userEvent.type(searchInput, 'Post 1');

    await waitFor(() => {
      expect(blogData.fetchBlogPostsPage).toHaveBeenCalledWith(1, 6, { title: 'Post 1', tags: [], category: '' });
    });
  });

  it('filters posts by category', async () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    const categoryLink = (await screen.findAllByText('Category 1'))[1];
    await userEvent.click(categoryLink);

    await waitFor(() => {
      expect(blogData.fetchBlogPostsPage).toHaveBeenCalledWith(1, 6, { title: '', tags: [], category: 'category-1' });
    });
  });

  it('filters posts by tag', async () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    const tagLink = await screen.findByText('Tag 1');
    await userEvent.click(tagLink);

    await waitFor(() => {
      expect(blogData.fetchBlogPostsPage).toHaveBeenCalledWith(1, 6, { title: '', tags: ['tag-1'], category: '' });
    });
  });
});
