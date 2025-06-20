import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPost } from '../data/blogPostsData';


import style from '@styles/BlogPost.module.scss';
import type { BlogPostProps } from '../untils/BlogPostProps';
import { Spinner } from '../components/Spinner';
import { NotFound } from './NotFound';

interface TableOfContentsItem {
  title: string;
  id: string;
  children?: TableOfContentsItem[];
}

const TableOfContents = ({ toc }: { toc: TableOfContentsItem[] }) => {
  return (
    <ul className={style.tocList}>
      {toc.map(item => (
        <li key={item.id} className={style.tocItem}>
          <a href={`#${item.id}`} className={style.tocLink}>{item.title}</a>
          {item.children && item.children.length > 0 && (
            <TableOfContents toc={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

export const BlogPost = () => {

  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostProps | null>();
  const [relatedPosts, setRelatedPosts] = useState<BlogPostProps[] | null>();
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [body, setBody] = useState<string>();
  const [found, setFound] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setFound(false);
        console.error('No slug provided');
        return;
      }

      const currentPost = await fetchBlogPost(slug);

      let id = 0;
      const toc: TableOfContentsItem[] = [];

      if (currentPost) {
        setPost(currentPost);



        const related = null;

        setRelatedPosts(related);

        if (currentPost.content) {
          let httmlContent = currentPost.content;

          // Convert Markdown to HTML
          let listOdCode: string[] = [];
          const codeBlockRegex = /<StringCodeBlockTagForReplace-id-(\d+)\s*\/>/g;
          let code_id  = 0;
          // Code blocks
          httmlContent = httmlContent.replace(/```(\w*)\n([\s\S]*?)```/gm, (_match, lang, code) => {
            const cls = lang ? ` class="language-${lang}"` : "";
            const escaped = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const codeBlock = `<pre><code${cls}>${escaped}</code></pre>`;
            listOdCode.push(codeBlock);
            return `<StringCodeBlockTagForReplace-id-${code_id++} />`;
          });

          // Header tags
          httmlContent = httmlContent.replace(/^(#{1,6})\s*(.*)$/gm, (_match, hashes, title) => {
            const level = hashes.length;
            const tag = `h${level}`;
            const tag_id: string = `toc-${id++}`;
            if (level > 1 && toc.length > 0) {
              let currient_level = toc[toc.length - 1];
              let currient_level_number = 1;
              while (currient_level && currient_level.children &&
                currient_level.children.length > 0 &&
                currient_level.children[currient_level.children.length - 1].id !== tag_id &&
                currient_level_number <= level) {
                currient_level = currient_level.children[currient_level.children.length - 1];
              }
              if (!currient_level.children) {
                currient_level.children = [];
              }
              currient_level.children.push({ title, id: tag_id });
            }
            else {
              toc.push({ title, id: tag_id });
            }

            return `<${tag} id="${tag_id}">${title}</${tag}>`;
          });

          // Numbered and bulleted lists
          httmlContent = httmlContent.replace(/^\s*([-*]|\d+\.)\s+(.*)$/gm, (_match, marker, content) => {
            const isNumbered = /^\d+\./.test(marker);
            const tag = isNumbered ? 'ol' : 'ul';
            const listItem = `<li>${content}</li>`;
            return `<${tag}>${listItem}</${tag}>`;
          });

          

          // Line breaks
          httmlContent = httmlContent.replace(/(.)(?:\r\n|\r|\n)(.*\w)/g, '$1<br>$2');

          // Paragraphs
          httmlContent = httmlContent.replace(/^(?!\s*(?:#{1,6}\s|>|\d+\.\s|[*+\-]\s|~~~|!\[|---))([^\r\n]+(?:\r?\n(?!\s*(?:#{1,6}\s|>|\d+\.\s|[*+\-]\s|~~~|!\[))[^\r\n]+)*)/gm, '<p>$1</p>');

          // Inline formatting
          httmlContent = httmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            .replace(codeBlockRegex, (_match, codeId) => {
              return listOdCode[parseInt(codeId, 10)] || '';
            });

          setBody(httmlContent);
          setToc(toc);
        }

        window.scrollTo(0, 0);
      }
    }
    fetchData();
  }, [slug]);

  if (!post) {
    return found ? (<Spinner/>) : (<NotFound/>)
  }

  return (
    <div className={style.postContainer}>
      <main className={style.postMain}>
        <article>
          {/* Post Header */}
          <div className={style.postHeader}>
            <div className={style.postFeaturedImage} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${post.image})` }}></div>
            <div className={style.postCategory}>{post.category}</div>
          </div>

          {/* Post Info */}
          <div className={style.postInfo}>
            <h1 className={style.postTitle}>{post.title}</h1>
            <div className={style.postMeta}>
              <div className={style.metaItem}>
                <i className={`fas fa-calendar-alt ${style.metaIcon}`}></i>
                <span>{post.publish_at}</span>
              </div>
              <div className={style.metaItem}>
                <i className={`fas fa-user ${style.metaIcon}`}></i>
                <span>{post.author}</span>
              </div>
              <div className={style.metaItem}>
                <i className={`fas fa-clock ${style.metaIcon}`}></i>
                <span>{post.read_time}</span>
              </div>
              <div className={style.metaItem}>
                <i className={`fas fa-comments ${style.metaIcon}`}></i>
                <span>{post.comments} Comments</span>
              </div>
            </div>
          </div>

          {body && <div className={style.postContent} dangerouslySetInnerHTML={{ __html: body }} />}

          <div className={style.postContent}>
            {/* Post Tags */}
            <div className={style.postTags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={style.postTag}>{tag.name}</span>
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
            {/*Temporarily disable comments section */}
            {0 && (
              <div className={style.commentsSection}>
                <h3 className={style.commentsTitle}>Discussions ({post.comments})</h3>

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
            )}
          </div>
        </article>
      </main>

      <aside className={style.postSidebar}>
        {/* Table of Contents */}
        <div className={style.sidebarWidget}>
          <h3 className={style.widgetTitle}>Table of Contents</h3>
          <TableOfContents toc={toc} />
        </div>

        {/* Related Posts */}
        <div className={style.sidebarWidget}>
          <h3 className={style.widgetTitle}>Related Scrolls</h3>
          <ul className={style.relatedPostsList}>
            {relatedPosts && relatedPosts.map(relatedPost => (
              <li className={style.relatedPostItem} key={relatedPost.id}>
                <Link to={`/blog/${relatedPost.slug}`} className={style.relatedPostLink}>
                  <div className={style.relatedPostThumb} style={{ backgroundImage: `url(${relatedPost.image})` }}></div>
                  <div className={style.relatedPostInfo}>
                    <h4 className={style.relatedPostTitle}>{relatedPost.title}</h4>
                    <span className={style.relatedPostDate}>{relatedPost.publish_at}</span>
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

export default BlogPost;