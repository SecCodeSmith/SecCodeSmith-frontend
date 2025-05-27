import type {BlogPostProps} from '../untils/BlogPostProps'

const url = `${import.meta.env.BASE_URL}data/BlogPosts.json`;
const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to fetch blog posts: ${res.status}`);

export const blogPostsData: BlogPostProps[] = await res.json();