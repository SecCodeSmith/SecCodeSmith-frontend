export interface BlogPostProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  commentCount: number;
  readTime: string;
  featured?: boolean;
  tags: string[];
  content: string;
}