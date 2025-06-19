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

export interface BlogTagsProps {
  name: string;
  slug: string;
}

export interface BlogCategoryProps {
  title: string;
  slug: string;
  BlogCount: number;
}
