import { USE_API, API_BASE_URL, STATIC_DATA_URL } from "../Config";
import type {
  BlogPostProps, BlogCategoryProps, BlogTagsProps
} from '../utils/BlogPostProps';

export interface BlogPostsPage {
  page: number;
  posts: BlogPostProps[];
}

async function fetchAllBlogPosts(): Promise<BlogPostProps[]> {
  if (USE_API) {
    // This function is only for static data, but as a fallback, fetch all pages.
    // This is inefficient and should be avoided in production with the API.
    const allPosts = [];
    let page = 1;
    while (true) {
      const pageData = await fetchBlogPostsPage(page);
      if (pageData.posts.length === 0) break;
      allPosts.push(...pageData.posts);
      page++;
    }
    return allPosts;
  } else {
    const url = `${STATIC_DATA_URL}/BlogPosts.json`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch static blog posts: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<BlogPostProps[]>;
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPostProps> {
  if (USE_API) {
    const url = `${API_BASE_URL}/blog-api/post/${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch post "${slug}": ${res.status} ${res.statusText}`);
    }
    return res.json();
  } else {
    const posts = await fetchAllBlogPosts();
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      throw new Error(`Post with slug "${slug}" not found in static data.`);
    }
    return post;
  }
}

export async function fetchBlogPagesCount(
  perPage: number = 6,
  filter?: { title?: string; tags?: string[]; category?: string; }
): Promise<number> {
  if (USE_API) {
    const params = new URLSearchParams();
    params.set('per_page', perPage.toString());
    if (filter) {
      params.set('filter', JSON.stringify(filter));
    }
    const url = `${API_BASE_URL}/blog-api/count_pages?${params.toString()}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch page count: ${res.status} ${res.statusText}`);
    }
    const { count } = await res.json() as { count: number };
    return Math.ceil(count);
  } else {
    const posts = await fetchAllBlogPosts();
    // This doesn't need to be perfect, as filtering is done in the page fetch
    return Math.ceil(posts.length / perPage);
  }
}

export async function fetchBlogPostsPage(
  page: number,
  perPage: number = 6,
  filter?: { title?: string; tags?: string[]; category?: string; }
): Promise<BlogPostsPage> {
  if (USE_API) {
    const params = new URLSearchParams();
    params.set('per_page', perPage.toString());
    if (filter) {
      params.set('filter', JSON.stringify(filter));
    }
    const url = `${API_BASE_URL}/blog-api/post-page/${page}?${params.toString()}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch posts page ${page}: ${res.status} ${res.statusText}`);
    }
    return await res.json() as BlogPostsPage;
  } else {
    let posts = await fetchAllBlogPosts();
    if (filter) {
        if (filter.title) {
            posts = posts.filter(p => p.title.toLowerCase().includes(filter.title?.toLowerCase() ?? ''));
        }
        if (filter.category) {
            posts = posts.filter(p => p.category.slug.toLowerCase() === filter.category?.toLowerCase());
        }
        if (filter.tags && filter.tags.length > 0) {
            posts = posts.filter(p => p.tags.some(tag => filter.tags?.includes(tag.slug)));
        }
    }
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedPosts = posts.slice(start, end);
    return { page, posts: paginatedPosts };
  }
}

export async function fetchBlogTags(): Promise<BlogTagsProps[]> {
  if (USE_API) {
    const url = `${API_BASE_URL}/blog-api/tags`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
    }
    return await res.json() as BlogTagsProps[];
  } else {
    const posts = await fetchAllBlogPosts();
    const allTags = posts.flatMap(p => p.tags);
    const uniqueTags = Array.from(new Map(allTags.map(t => [t.slug, t])).values());
    return uniqueTags;
  }
}

export async function fetchBlogCategories(): Promise<BlogCategoryProps[]> {
  if (USE_API) {
    const url = `${API_BASE_URL}/blog-api/cats`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }
    return await res.json() as BlogCategoryProps[];
  } else {
    const posts = await fetchAllBlogPosts();
    const allCats = posts.map(p => p.category);
    const uniqueCats = Array.from(new Map(allCats.map(c => [c.slug, c])).values());
    return uniqueCats.map(c => ({ ...c, BlogCount: posts.filter(p => p.category.slug === c.slug).length }));
  }
}

export async function fetchRelatedPostsByCategory(categorySlug: string): Promise<BlogPostProps[]> {
    if (USE_API) {
        const url = `${API_BASE_URL}/blog-api/related-posts/${categorySlug}`;
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            mode: 'cors',
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch related posts for category "${categorySlug}": ${res.status} ${res.statusText}`);
        }
        return await res.json() as BlogPostProps[];
    } else {
        const posts = await fetchAllBlogPosts();
        const related = posts.filter(p => p.category.slug.toLowerCase() === categorySlug.toLowerCase());
        return related.slice(0, 3);
    }
}
