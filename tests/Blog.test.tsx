import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Blog } from '../src/pages/Blog';
import * as blogData from '../src/data/blogPostsData';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockPosts = [
  { 
    id: '1', 
    slug: 'post-1', 
    title: 'Post 1', 
    excerpt: 'Excerpt 1', 
    image: '', 
    category: { title: 'Category 1', slug: 'category-1' }, 
    author: { name: 'Author 1', bio: 'Bio 1', avatar: '' }, 
    publish_at: '2024-01-01', 
    comments: 0, 
    tags: [], 
    featured: false, 
    read_time: '5', 
    content: 'Content for Post 1' 
  },
  { 
    id: '2', 
    slug: 'post-2', 
    title: 'Post 2', 
    excerpt: 'Excerpt 2', 
    image: '', 
    category: { title: 'Category 2', slug: 'category-2' }, 
    author: { name: 'Author 2', bio: 'Bio 2', avatar: '' }, 
    publish_at: '2024-01-02', 
    comments: 0, 
    tags: [], 
    featured: false, 
    read_time: '7', 
    content: 'Content for Post 2' 
  },
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

describe('Blog Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(blogData, 'fetchBlogPostsPage').mockResolvedValue({ page: 1, posts: mockPosts });
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

    // Check that posts are rendered
    const post1Elements = await screen.findAllByText('Post 1');
    expect(post1Elements.length).toBeGreaterThan(0);
    
    const post2Elements = await screen.findAllByText('Post 2');
    expect(post2Elements.length).toBeGreaterThan(0);
    
    // Check that categories are rendered 
    const category1Elements = await screen.findAllByText('Category 1');
    expect(category1Elements.length).toBeGreaterThan(0);
    
    const category2Elements = await screen.findAllByText('Category 2');
    expect(category2Elements.length).toBeGreaterThan(0);
    
    // Check that tags are rendered
    expect(await screen.findByText('Tag 1')).toBeInTheDocument();
    expect(await screen.findByText('Tag 2')).toBeInTheDocument();
  });

  it('filters posts by search query', async () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    const searchInput = await screen.findByPlaceholderText('Search articles...');
    
    // Use fireEvent.change instead of userEvent.type to avoid character-by-character triggering
    fireEvent.change(searchInput, { target: { value: 'Post 1' } });

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

    // Wait for the component to load and get all category elements
    const categoryElements = await screen.findAllByText('Category 1');
    
    // Find the clickable category link in the sidebar (should be inside an anchor tag)
    const categoryLink = categoryElements.find(element => 
      element.closest('a') !== null
    );
    
    expect(categoryLink).toBeDefined();
    fireEvent.click(categoryLink!);

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
    fireEvent.click(tagLink);

    await waitFor(() => {
      expect(blogData.fetchBlogPostsPage).toHaveBeenCalledWith(1, 6, { title: '', tags: ['tag-1'], category: '' });
    });
  });
});
