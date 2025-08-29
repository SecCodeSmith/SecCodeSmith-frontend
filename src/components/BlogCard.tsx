import { Link } from 'react-router-dom';
import styles from '@styles/BlogCard.module.scss';
import { lazy } from 'react';

const TagField = lazy(() => import('../components/TagField'));

import type {BlogPostProps} from '../untils/BlogPostProps';
import { API_BASE_URL, USE_API, STATIC_IMAGE_URL } from '../Config';


interface BlogCardProps {
  post: BlogPostProps;
  setSearchTag: React.Dispatch<React.SetStateAction<string[]>>;
  searchTag: string[];
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, setSearchTag, searchTag }) => {
  return (
    <div className={`card ${styles.card} ${post.featured ? styles.featuredCard : ''}`}>
      <div className="position-relative">
        <img src={`${USE_API ? API_BASE_URL : STATIC_IMAGE_URL}${post.image}`} className={`card-img-top ${post.featured ? styles.featuredImg : ''}`} alt={post.title} />
        <div className={styles.categoryBadge}>{post.category.title}</div>
        
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
            <span>{post.publish_at}</span>
          </div>
          <div className={`meta-item ${styles.metaItem}`}>
            <i className={`fas fa-user meta-icon ${styles.metaIcon}`}></i>
            <span>{post.author.name}</span>
          </div>
          <div className={`meta-item ${styles.metaItem}`}>
            <i className={`fas fa-comments meta-icon ${styles.metaIcon}`}></i>
            <span>{post.comments} Comments</span>
          </div>
        </div>
        <p className={`card-text ${styles.cardText}`}>
          {post.excerpt}
        </p>
        <Link to={`/blog/${post.slug}`} className={`read-more ${styles.readMore}`}>Continue Reading</Link>
        <div className="mt-3">
          {post.tags.map((tag, index) => (
            <TagField
              key={index}
              tag={tag}
              setSearchTag={setSearchTag}
              searchTag={searchTag}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;