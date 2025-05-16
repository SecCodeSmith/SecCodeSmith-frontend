import { Link } from 'react-router-dom';
import "./BlogCard.module.css"

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

interface BlogCardProps {
  post: BlogPostProps;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className={`card ${post.featured ? 'featured-card' : ''}`}>
      <div className="position-relative">
        <img src={post.image} className={`card-img-top ${post.featured ? 'featured-img' : ''}`} alt={post.title} />
        <div className="category-badge">{post.category}</div>
        
        {post.featured && (
          <div className="featured-badge">
            <i className="fas fa-star"></i>
            <span>Featured</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="d-flex meta-items mb-3">
          <div className="meta-item">
            <i className="fas fa-calendar-alt meta-icon"></i>
            <span>{post.date}</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-user meta-icon"></i>
            <span>{post.author}</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-comments meta-icon"></i>
            <span>{post.commentCount} Comments</span>
          </div>
        </div>
        <p className="card-text">
          {post.excerpt}
        </p>
        <Link to={`/blog/${post.slug}`} className="read-more">Continue Reading</Link>
        <div className="mt-3">
          {post.tags.map((tag, index) => (
            <span key={index} className="post-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}