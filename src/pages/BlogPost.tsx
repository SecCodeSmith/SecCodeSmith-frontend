import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from '../data/blogPostsData';
import { NotFound } from './NotFound';


import style from '@styles/BlogPost.module.scss';

function dedent(str: string): string {
  const lines = str.split('\n');
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  const indents = lines
    .filter(line => line.trim().length > 0)
    .map(line => line.match(/^ */)![0].length);
  const minIndent = indents.length ? Math.min(...indents) : 0;

  return lines.map(line => line.slice(minIndent)).join('\n');
}

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPostsData.find(post => post.slug === slug));
  const [relatedPosts, setRelatedPosts] = useState(blogPostsData.slice(0, 3));

  useEffect(() => {
    const currentPost = blogPostsData.find(post => post.slug === slug);
    
    if (currentPost) {
      setPost(currentPost);


      const related = blogPostsData
        .filter(p => p.id !== currentPost.id)
        .filter(p =>
          p.category === currentPost.category ||
          p.tags.some(tag => currentPost.tags.includes(tag))
        )
        .slice(0, 3);

      setRelatedPosts(related);

      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className={style.postContainer}>
      <main className={style.postMain}>
        <article>
          {/* Post Header */}
          <div className={style.postHeader}>
            <div className={style.postFeaturedImage} style={{ backgroundImage: `url(${post.image})` }}></div>
            <div className={style.postCategory}>{post.category}</div>
          </div>

          {/* Post Info */}
          <div className={style.postInfo}>
            <h1 className={style.postTitle}>{post.title}</h1>
            <div className={style.postMeta}>
              <div className={style.metaItem}>
                <i className={`fas fa-calendar-alt ${style.metaIcon}`}></i>
                <span>{post.date}</span>
              </div>
              <div className={style.metaItem}>
                <i className={`fas fa-user ${style.metaIcon}`}></i>
                <span>{post.author}</span>
              </div>
              <div className={style.metaItem}>
                <i className={`fas fa-clock ${style.metaIcon}`}></i>
                <span>{post.readTime}</span>
              </div>
              <div className={style.metaItem}>
                <i className={`fas fa-comments ${style.metaIcon}`}></i>
                <span>{post.commentCount} Comments</span>
              </div>
            </div>
          </div>

          <div className={style.postContent} dangerouslySetInnerHTML={{ __html: post.content }}></div>
          <div className={style.postContent}>
            {/* Post Tags */}
            <div className={style.postTags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={style.postTag}>{tag}</span>
              ))}
            </div>

            {/* Share Section */}
            <div className={style.shareSection}>
              <h3 className={style.shareTitle}>Share this arcane knowledge</h3>
              <div className={style.shareButtons}>
                <a href="#" className={style.shareButton}><i className="fab fa-twitter"></i></a>
                <a href="#" className={style.shareButton}><i className="fab fa-facebook-f"></i></a>
                <a href="#" className={style.shareButton}><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className={style.shareButton}><i className="fab fa-reddit-alien"></i></a>
                <a href="#" className={style.shareButton}><i className="far fa-envelope"></i></a>
              </div>
            </div>

            {/* Author Info */}
            <div className={style.authorSection}>
              <div className={style.authorAvatar}>
                <img src="/images/author.jpg" alt="SecCodeSmith" />
              </div>
              <div className={style.authorInfo}>
                <h3 className={style.authorName}>SecCodeSmith</h3>
                <p className={style.authorBio}>Digital blacksmith forging embedded systems and IoT solutions in the fires of innovation. Specializes in low-level firmware, communication protocols, and hardware-software integration for resource-constrained devices.</p>
                <div className={style.authorSocial}>
                  <a href="#"><i className="fab fa-github"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#"><i className="fab fa-stack-overflow"></i></a>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className={style.commentsSection}>
              <h3 className={style.commentsTitle}>Discussions ({post.commentCount})</h3>

              {/* Sample Comments */}
              <div className={style.comment}>
                <div className={style.commentAvatar}>
                  <img src="/images/user-1.jpg" alt="User" />
                </div>
                <div className={style.commentContent}>
                  <h4 className={style.commentAuthor}>Michael Chen</h4>
                  <div className={style.commentDate}>May 5, 2025 at 15:42</div>
                  <p className={style.commentText}>Excellent article! I've been struggling with I2C bus lockups in my weather station project. The recovery function you provided solved the issue. Have you considered adding a timeout mechanism to the SPI transfers for error detection?</p>
                  <a href="#" className={style.commentReply}>Reply</a>
                </div>
              </div>

              {/* Comment Form */}
              <div className={`${style.commentForm} comment-form`}>
                <h3 className={style.formTitle}>Leave your mark</h3>
                <form>
                  <div className={`form-row ${style.formRow}`}>
                    <div className={`form-group ${style.formGroup}`}>
                      <input type="text" className={`${style.formControl}`} placeholder="Your Name" />
                    </div>
                    <div className={`form-group ${style.formGroup}`}>
                      <input type="email" className={`${style.formControl}`} placeholder="Your Email" />
                    </div>
                  </div>
                  <div className={`form-group ${style.formGroup}`}>
                    <textarea className={`${style.formControl}`} rows={5} placeholder="Your Comment"></textarea>
                  </div>
                  <button type="submit" className={`submit-button ${style.submitButton}`}>Post Comment</button>
                </form>
              </div>
            </div>
          </div>
        </article>
      </main>

      <aside className={style.postSidebar}>
        {/* Table of Contents */}
        <div className={style.sidebarWidget}>
          <h3 className={style.widgetTitle}>Table of Contents</h3>
          <ul className={style.tocList}>
            <li className={style.tocItem}>
              <a href="#" className={style.tocLink}>Introduction</a>
            </li>
            <li className={style.tocItem}>
              <a href="#" className={style.tocLink}>The Three Elemental Protocols</a>
            </li>
            <li className={style.tocItem}>
              <a href="#" className={style.tocLink}>Optimizing I2C for Reliable Field Operations</a>
              <ul className={style.tocList}>
                <li className={style.tocSubitem}>
                  <a href="#" className={style.tocLink}>Hardware Incantations</a>
                </li>
                <li className={style.tocSubitem}>
                  <a href="#" className={style.tocLink}>Software Rituals</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Related Posts */}
        <div className={style.sidebarWidget}>
          <h3 className={style.widgetTitle}>Related Scrolls</h3>
          <ul className={style.relatedPostsList}>
            {relatedPosts.map(relatedPost => (
              <li className={style.relatedPostItem} key={relatedPost.id}>
                <Link to={`/blog/${relatedPost.slug}`} className={style.relatedPostLink}>
                  <div className={style.relatedPostThumb} style={{ backgroundImage: `url(${relatedPost.image})` }}></div>
                  <div className={style.relatedPostInfo}>
                    <h4 className={style.relatedPostTitle}>{relatedPost.title}</h4>
                    <span className={style.relatedPostDate}>{relatedPost.date}</span>
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