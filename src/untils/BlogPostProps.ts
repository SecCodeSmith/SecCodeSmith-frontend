export interface BlogPostProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publish_at: string;
  author: AuthorProps;
  comments: number;
  read_time: string;
  featured?: boolean;
  tags: BlogTagsProps[];
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

export interface AuthorProps {
  name: string;
  bio: string;
  avatar: string;
}