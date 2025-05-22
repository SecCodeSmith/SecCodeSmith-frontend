import { Link } from 'react-router-dom';
import styles from '@styles/BlogCard.module.scss';

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
    <div className={`card ${styles.card} ${post.featured ? styles.featuredCard : ''}`}>
      <div className="position-relative">
        <img src={post.image} className={`card-img-top ${post.featured ? styles.featuredImg : ''}`} alt={post.title} />
        <div className="category-badge">{post.category}</div>
        
        {post.featured && (
          <div className={`featured-badge ${styles.featuredBadge}`}>
            <i className="fas fa-star"></i>
            <span>Featured</span>
          </div>
        )}
      </div>
      <div className={`card-body ${styles.cardBody}`}>
        <h2 className={`card-title ${styles.cardTitle}`}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className={`d-flex meta-items mb-3`}>
          <div className={`meta-item ${styles.metaItem}`}>
            <i className="fas fa-calendar-alt meta-icon"></i>
            <span>{post.date}</span>
          </div>
          <div className={`meta-item ${styles.metaItem}`}>
            <i className={`fas fa-user meta-icon ${styles.metaIcon}`}></i>
            <span>{post.author}</span>
          </div>
          <div className={`meta-item ${styles.metaItem}`}>
            <i className={`fas fa-comments meta-icon ${styles.metaIcon}`}></i>
            <span>{post.commentCount} Comments</span>
          </div>
        </div>
        <p className={`card-text ${styles.cardText}`}>
          {post.excerpt}
        </p>
        <Link to={`/blog/${post.slug}`} className={`read-more ${styles.readMore}`}>Continue Reading</Link>
        <div className="mt-3">
          {post.tags.map((tag, index) => (
            <span key={index} className={`post-tag ${styles.postTag}`}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}