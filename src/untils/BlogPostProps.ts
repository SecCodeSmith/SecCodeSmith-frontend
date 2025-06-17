export interface BlogPostProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  comment_count: number;
  read_time: string;
  featured?: boolean;
  tags: string[];
  content: string;
}

