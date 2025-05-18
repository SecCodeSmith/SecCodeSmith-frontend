import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from '../data/blogPostsData';
import { NotFound } from './NotFound';


export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPostsData.find(post => post.slug === slug));
  const [relatedPosts, setRelatedPosts] = useState(blogPostsData.slice(0, 3));
  
  useEffect(() => {
    // Find the post by slug
    const currentPost = blogPostsData.find(post => post.slug === slug);
    
    if (currentPost) {
      // Set the post
      setPost(currentPost);
      
      // Find related posts (same category or shared tags)
      const related = blogPostsData
        .filter(p => p.id !== currentPost.id)
        .filter(p => 
          p.category === currentPost.category || 
          p.tags.some(tag => currentPost.tags.includes(tag))
        )
        .slice(0, 3);
        
      setRelatedPosts(related);
      
      // Scroll to top when new post is loaded
      window.scrollTo(0, 0);
    }
  }, [slug]);
  
  if (!post) {
    return <NotFound />;
  }
  
  return (
    <div className="post-container">
      <main className="post-main">
        <article>
          {/* Post Header */}
          <div className="post-header">
            <div className="post-featured-image" style={{ backgroundImage: `url(${post.image})` }}></div>
            <div className="post-category">{post.category}</div>
          </div>
          
          {/* Post Info */}
          <div className="post-info">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <div className="meta-item">
                <i className="fas fa-calendar-alt meta-icon"></i>
                <span>{post.date}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-user meta-icon"></i>
                <span>{post.author}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock meta-icon"></i>
                <span>{post.readTime}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-comments meta-icon"></i>
                <span>{post.commentCount} Comments</span>
              </div>
            </div>
          </div>
          
          {/* Post Content */}
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          
          {/* Post Tags */}
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="post-tag">{tag}</span>
            ))}
          </div>
          
          {/* Share Section */}
          <div className="share-section">
            <h3 className="share-title">Share this arcane knowledge</h3>
            <div className="share-buttons">
              <a href="#" className="share-button"><i className="fab fa-twitter"></i></a>
              <a href="#" className="share-button"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="share-button"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="share-button"><i className="fab fa-reddit-alien"></i></a>
              <a href="#" className="share-button"><i className="far fa-envelope"></i></a>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="author-section">
            <div className="author-avatar">
              <img src="/images/author.jpg" alt="SecCodeSmith" />
            </div>
            <div className="author-info">
              <h3 className="author-name">SecCodeSmith</h3>
              <p className="author-bio">Digital blacksmith forging embedded systems and IoT solutions in the fires of innovation. Specializes in low-level firmware, communication protocols, and hardware-software integration for resource-constrained devices.</p>
              <div className="author-social">
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-stack-overflow"></i></a>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="comments-section">
            <h3 className="comments-title">Discussions ({post.commentCount})</h3>
            
            {/* Sample Comments */}
            <div className="comment">
              <div className="comment-avatar">
                <img src="/images/user-1.jpg" alt="User" />
              </div>
              <div className="comment-content">
                <h4 className="comment-author">Michael Chen</h4>
                <div className="comment-date">May 5, 2025 at 15:42</div>
                <p className="comment-text">Excellent article! I've been struggling with I2C bus lockups in my weather station project. The recovery function you provided solved the issue. Have you considered adding a timeout mechanism to the SPI transfers for error detection?</p>
                <a href="#" className="comment-reply">Reply</a>
              </div>
            </div>
            
            <div className="comment">
              <div className="comment-avatar">
                <img src="/images/author.jpg" alt="User" />
              </div>
              <div className="comment-content">
                <h4 className="comment-author">SecCodeSmith</h4>
                <div className="comment-date">May 5, 2025 at 16:10</div>
                <p className="comment-text">@Michael - Good point about the timeout! For SPI transfers, you can implement a timeout using either the HAL Timeout parameter or a hardware timer. For maximum reliability, I prefer using the hardware timer approach as it continues to function even if the main code gets stuck. I'll cover this in a future article on error handling.</p>
                <a href="#" className="comment-reply">Reply</a>
              </div>
            </div>
            
            {/* Comment Form */}
            <div className="comment-form">
              <h3 className="form-title">Leave your mark</h3>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Your Email" />
                  </div>
                </div>
                <div className="form-group">
                  <textarea className="form-control" rows={5} placeholder="Your Comment"></textarea>
                </div>
                <button type="submit" className="submit-button">Post Comment</button>
              </form>
            </div>
          </div>
        </article>
      </main>
      
      <aside className="post-sidebar">
        {/* Table of Contents */}
        <div className="sidebar-widget">
          <h3 className="widget-title">Table of Contents</h3>
          <ul className="toc-list">
            <li className="toc-item">
              <a href="#" className="toc-link">Introduction</a>
            </li>
            <li className="toc-item">
              <a href="#" className="toc-link">The Three Elemental Protocols</a>
            </li>
            <li className="toc-item">
              <a href="#" className="toc-link">Optimizing I2C for Reliable Field Operations</a>
              <ul className="toc-list">
                <li className="toc-subitem">
                  <a href="#" className="toc-link">Hardware Incantations</a>
                </li>
                <li className="toc-subitem">
                  <a href="#" className="toc-link">Software Rituals</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        
        {/* Related Posts */}
        <div className="sidebar-widget">
          <h3 className="widget-title">Related Scrolls</h3>
          <ul className="related-posts-list">
            {relatedPosts.map(relatedPost => (
              <li className="related-post-item" key={relatedPost.id}>
                <Link to={`/blog/${relatedPost.slug}`} className="related-post-link">
                  <div className="related-post-thumb" style={{ backgroundImage: `url(${relatedPost.image})` }}></div>
                  <div className="related-post-info">
                    <h4 className="related-post-title">{relatedPost.title}</h4>
                    <span className="related-post-date">{relatedPost.date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};