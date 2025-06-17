// src/api/blogApi.ts

import type {
  BlogPostProps,     
} from '../untils/BlogPostProps';
import { API_BASE_URL } from '../Config';

export interface BlogPostsPage {
  page: number;
  posts: BlogPostProps[];
}

/**
 * Fetch a single post by its slug.
 */
export async function fetchBlogPost(
  slug: string
): Promise<BlogPostProps> {
  const url = `${API_BASE_URL}blog-api/post/${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch post "${slug}": ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Fetch how many pages of posts there are, given a page size.
 * Rounds up to the next integer.
 */
export async function fetchBlogPagesCount(
  perPage: number = 6
): Promise<number> {
  const url = `${API_BASE_URL}blog-api/count_pages/${perPage}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch page count: ${res.status} ${res.statusText}`);
  }
  const { count } = await res.json() as { count: number };
  // API returns totalPosts / perPage; round up to get total pages
  return Math.ceil(count);
}

/**
 * Fetch one page of posts.
 * @param page 1-based page number
 * @param perPage how many posts per page
 * @param filter optional filter object: { title?, tags?, category? }
 */
export async function fetchBlogPostsPage(
  page: number,
  perPage: number = 6,
  filter?: { title?: string; tags?: string; category?: string; }
): Promise<BlogPostsPage> {
  const params = new URLSearchParams();
  params.set('per_page', perPage.toString());
  if (filter) {
    params.set('filter', JSON.stringify(filter));
  }

  const url = `${API_BASE_URL}blog-api/post-page/${page}?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts page ${page}: ${res.status} ${res.statusText}`);
  }
  return await res.json() as BlogPostsPage;
}
